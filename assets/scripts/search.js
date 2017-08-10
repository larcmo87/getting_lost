var mapaddress;
var longLatArray = [];          //Array used to hold the firebase data ad search info
var adSearchArray = [];			//Array used to hold ad search results
var latitude = 0;				//latitude value of address
var longitude = 0;				//logitude value of address
var startSearch = false;
var searchLocation = "";		//Search location value
var childCounty = "";			//county of search ad
var searchLocationCounty = "";	//county of entered search location value
var activeMarkerWindow;
var markers = [];
var outOfForEach = false;
 // Initialize Firebase
var config = {
	    apiKey: "AIzaSyCrtYZiJnWVqqPmuOjwcOOw9h4kD1kqJOw",
	    authDomain: "accountinfo-a7f24.firebaseapp.com",
	    databaseURL: "https://accountinfo-a7f24.firebaseio.com",
	    projectId: "accountinfo-a7f24",
	    storageBucket: "accountinfo-a7f24.appspot.com",
	    messagingSenderId: "707215119891"
};

//connect to firebase
firebase.initializeApp(config);


//firebase database object
var database = firebase.database();

//mapquest geocode url
var mapQuestGeoCodeURL = "http://www.mapquestapi.com/geocoding/v1/address?key=i2tXrbVFQ3b8X2QGzjRhUVJgKWgaRxx6&location=";


var getSearchLocationLongLat = function(address){
		console.log("function address ", address);

	$.ajax({
	    url: mapQuestGeoCodeURL + address,
	    method: "GET"
 	}).done(function(response) {

	    //capture latitude and longitude 
	    latitude = response.results[0].locations[0].latLng.lat;
	    longitude = response.results[0].locations[0].latLng.lng;
    	    
	    /*Get the county of the search location. To used to compare agains the ad county
	    to display ads in ad search list.*/
	   	searchLocationCounty = response.results[0].locations[0].adminArea4.replace("County", "");
	   	
	   	//make call to display search data in map only if an initial search has been made
	    if(startSearch){	    	
		    //make call to initMap function to display locations
	      	 initMap();	         	
    	}     	
	});
}
var getLongLat = function(address, title,desc,userId){
			
	$.ajax({
	    url: mapQuestGeoCodeURL + address,
	    method: "GET"
 	}).done(function(response) {
	         console.log("get response = ",response);
	    //capture latitude and longitude
	    var markerLatitude = response.results[0].locations[0].latLng.lat;
	    var markerLongitude = response.results[0].locations[0].latLng.lng;
    		
    	//the longLatArray array.
       	var latAndLong = { 
	       lat: markerLatitude,
	       lng: markerLongitude,
	       title: title,
	       desc : desc,
	       userId : userId
	    }

	   	/*Get the County the Ad address is in. 
	   	Used to compare against Search City County */
	    childCounty = response.results[0].locations[0].adminArea4;
	   //longLatArray = [];
	    //push to array
	    longLatArray.push(latAndLong);
	    //outOfForEach = true;
	     console.log("searchLocationCounty ",searchLocationCounty);
	     console.log("childCounty ",childCounty);

	    //Compare the search City County(searchLocationCounty) against the ad address county (childCounty)
	    if(searchLocationCounty.trim() === childCounty.trim()){
	    	var adSearchResult = {
	    		title : title
	    	}
	    		 // longLatArray.push(latAndLong);
	    	console.log("In compare");
	    	//longLatArray.push(latAndLong);outOfForEach = true;
	    	//Add ad info to search list
	    	$("#ads").append("<li class='ad-link' data-userId='" + userId + 
	    	 "'><a href='viewAd.html'>" + title + "</a><h4>" + desc + "</h4></li>");
	    	 //initMap();
	    	
	    	 
	    }

	     updateMap(longLatArray);
	   		
	});
	
}



//ref Ads in firebase database
var rootRef = database.ref("Ads");

  var getAds = function(){
 		var retValue = false;
 		var title = "";
	  		var desc = "";
	  		var usrID = "";
	//get snapshot of Ads
	rootRef.once("value")
		.then(function(snapshot) {

	  		//loop through the snap shoot and get children
	  		snapshot.forEach(function(childSnapshot) {
	  
	  		//Get the tilte value
	  		title = childSnapshot.child("title").val().trim();
	  		desc = childSnapshot.child("desc").val().trim();
	  		usrID = childSnapshot.child("userId").val().trim();


	  		//get the latitude and longitude of the childs address     	
	   		getLongLat(childSnapshot.child("address").val().trim(),title,desc,usrID);

	
	   	  	//updateMap(longLatArray);
		});
	  	
	   
	});

		
 
 }



//log Off
$("#logOff").on("click",function(){
	//close firebase session
	firebase.auth().signOut();

	//go to login page
	window.location.href = "index.html";
});


$("#location-btn").on("click",function(){
	//initial search
	startSearch = true;
   if($("#location-input").val() != ""){
   	longLatArray = [];
	//Get the search value and remove any spaces before or after comma
	searchLocation = $("#location-input").val().replace(", ",",");
	searchLocation = searchLocation.replace(" ,",",");
	$("#ads").html("");
		$("#location-input").val("");

	//get the lat and long of the location 
	getSearchLocationLongLat(searchLocation);
 	searchLocation = "";
	//Get the Ads to populate the search list
 	getAds();

 	// if(longLatArray.length > 0){
 	// 	updateMap();
 	// 		}
 	}


 	
 		

});
$("#createAdd").on("click",function(){

	//go to create ad page
	window.location.href = "createAdvert.html";	

});


$(".ad-link").on("click",function(){

});
// google.maps.event.addListener(marker, "click", function(marker) {
// 			console.log('Marker ' + marker.markerCount + ' has been clicked');
//   // overlay = GOverlay or null
//   // latlng = GLatLng
//   // overlaylatlng = GLatLng or null
// 		});

function updateMap(longLatArray){
		var index=0;
		var infoWnd = new google.maps.InfoWindow();
		
	 //Map Object
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          //center on latitude longitude
          center: new google.maps.LatLng(latitude, longitude),
        });

       console.log("arry.length",longLatArray.length);
      		
        //loop through the longLatArray array do display markers for ads
    	for (var i = 0; i < longLatArray.length; i++){
    		var markerData = longLatArray[i];
    		var marker = null;
    		// console.log("markerData", markerData.desc);
        	
        	var marker = new google.maps.Marker({
          		position: new google.maps.LatLng(markerData.lat, markerData.lng),
          		map: map,       		
          		
        		});
        	(function(marker, markerData){
      			google.maps.event.addListener(marker, 'mouseover', function(e) {
      				
					infoWnd.setContent('<div class="scrollFix"><h6>' + markerData.title +  '</h6><br>'+ markerData.desc + '</div>');
					infoWnd.open(map, marker);
					 
				});

				google.maps.event.addListener(marker, 'mouseout', function() {
					
						infoWnd.close();
				
				});

				google.maps.event.addListener(marker, 'click', function() {
			window.open("viewAd.html", "", "toolbar=no,scrollbars=yes,resizable=no,top=500,left=500,width=400,height=400");

						// $("#display-ad h1").css({'visibility': 'visible',
						// 						'z-index': 100});			
				});


      		})(marker, markerData);       
      }

}

function initMap() {


		//getCurrentLocation();
		console.log("initMap lat ", latitude);
		console.log("initMap long ", longitude);
		var zoom;

		//When page loads set map to middle of US
		if(!startSearch){
			latitude = 39.809860;
			longitude = -98.555183;
			zoom = 4;  //Zoomed out
		}else{
			zoom = 10; //Zoomed in
		}

		// create an InfoWindow - for mouseover
		var infoWnd = new google.maps.InfoWindow();
		
        //Map Object
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: zoom,
          //center on latitude longitude
          center: new google.maps.LatLng(latitude, longitude),
        });
  //       console.log("longLatArray.length",longLatArray.length);
      
  //       //loop through the longLatArray array do display markers for ads
  //   	for (var i = 0; i < longLatArray.length; i++){
  //       var marker = new google.maps.Marker({
  //         position: new google.maps.LatLng(longLatArray[i].lat, longLatArray[i].lng),
  //         map: map,
  //         title: title
  //       });
  //       marker.markerCount = i; infoWnd.setContent('<div class="scrollFix">' + 'Welcome to ' +  longLatArray[i].lat + '</div>');

  //       console.log(marker.markerCount);
  //     }

  //     google.maps.event.addListener(map,'click',function(event) {
  //               console.log(event.latLng.lat());
  //                // document.getElementById('lngspan').innerHTML = event.latLng.lng()
  //            });
  //    function markerClicked(e) {
  //   		console.log('Marker ' + marker.markerCount + ' has been clicked');
    		
		// }

		// google.maps.event.addListener(marker, "click", function(marker) {
		// 	console.log('Marker ' + marker.markerCount + ' has been clicked');
  // // overlay = GOverlay or null
  // // latlng = GLatLng
  // // overlaylatlng = GLatLng or null
		// });
	  // marker.addListener('click',markerClicked);
   //    marker.addListener('mouseover', function() {
				
			// 	// Close active window if exists - [one might expect this to be default behaviour no?]				
			// 	if(activeMarkerWindow != null) activeMarkerWindow.close();

			// 	// Close info Window on mouseclick if already opened
			// 	// infoWnd2.close();
			
			// 	// Open new InfoWindow for mouseover event
			// 	infoWnd.open(map, marker);
				
			// 	// Store new open InfoWindow in global variable
			// 	activeMarkerWindow = infoWnd;				
			// }); 
   //    // on mouseout (moved mouse off marker) make infoWindow disappear
			// google.maps.event.addListener(marker, 'mouseout', function() {
			// 	infoWnd.close();	
			// });
  }

//When the page loads call the getAds() to write firebase data to array longLatArray
//This helps the search list data to load quicker when doing a search on a location
/*$("document").ready(function(){
		 getAds();
		 initMap();
});*/

