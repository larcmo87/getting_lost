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
var mapQuestGeoCodeURL = "https://www.mapquestapi.com/geocoding/v1/address?key=i2tXrbVFQ3b8X2QGzjRhUVJgKWgaRxx6&location=";


var getSearchLocationLongLat = function(address){
		console.log("function address ", address);

	$.ajax({
	    url: mapQuestGeoCodeURL + address,
	    method: "GET"
 	}).done(function(response) {

	    //capture latitude and longitude 
	    latitude = response.results[0].locations[0].latLng.lat;
	    longitude = response.results[0].locations[0].latLng.lng;
    	    
	    /*Get the county of the search location. Used to compare against the ad county
	    to display ads in ad search list.*/
	   	searchLocationCounty = response.results[0].locations[0].adminArea4.replace("County", "");
	   	
	   	//make call to display search data in map only if an initial search has been made
	    if(startSearch){

		    //make call to initMap function to display locations
	      	 initMap();	         	
    	}     	
	});
}

//Get latitude and longitude function
var getLongLat = function(address, title,desc,userId,address,startDate,startTime,endTime,name,phone,email){
			
	$.ajax({
	    url: mapQuestGeoCodeURL + address,
	    method: "GET"
 	}).done(function(response) {
	    console.log("get response = ",response);

	    //capture latitude and longitude
	    var markerLatitude = response.results[0].locations[0].latLng.lat;
	    var markerLongitude = response.results[0].locations[0].latLng.lng;
    		
    	//the longLatArray array object data.
       	var latAndLong = { 
	       lat: markerLatitude,
	       lng: markerLongitude,
	       title: title,
	       desc : desc,
	       userId : userId,
	       address : address,
	       startDate : startDate,
	       startTime : startTime,
	       endTime : endTime,
	       name : name,
	       phone : phone,
	       email : email
	    }

	   	/*Get the County the Ad address is in. 
	   	Used to compare against Search City County */
	    childCounty = response.results[0].locations[0].adminArea4;
	  
	    //push to array
	    longLatArray.push(latAndLong);	  

	   /*Compare the search City County(searchLocationCounty) against the ad address county (childCounty)*/
	    if(searchLocationCounty.trim() === childCounty.trim()){
	    	var adSearchResult = {
	    		title : title
	    	}	    		 

	    	/*longLatArray.push(latAndLong);outOfForEach = true;
	    	Add ad info to search list*/
	    	$("#ads").append("<li class='ad-link' data-userId='" + userId + 
	    	 "'><a href='viewAd.html'>" + title + "</a><h4>" + desc + "</h4></li>");
	    }

	     updateMap(longLatArray);
	   		
	});	
}

//ref Ads in firebase database
var rootRef = database.ref("Ads");

  var getAds = function(){
  		//function variables
 		var retValue = false;
 		var title = "";
	  	var desc = "";
	  	var address = "";
	  	var startDate = "";
	  	var startTime = "";
	  	var endTime = "";
	  	var name = "";
	  	var phone = "";
	  	var email = "";

	//get snapshot of Ads
	rootRef.once("value")
		.then(function(snapshot) {

	  		//loop through the snap shoot and get children
	  		snapshot.forEach(function(childSnapshot) {
	  
	  		//Get firebase data
	  		title = childSnapshot.child("title").val().trim();
	  		desc = childSnapshot.child("desc").val().trim();
	  		usrID = childSnapshot.child("userId").val().trim();
	  		address = childSnapshot.child("address").val().trim();
	  		startDate = childSnapshot.child("startDate").val().trim();
	  		startTime = childSnapshot.child("startTime").val().trim();
	  		endTime = childSnapshot.child("endTime").val().trim();
	  		name = childSnapshot.child("name").val().trim();
	  		phone = childSnapshot.child("phone").val().trim();
	  		email = childSnapshot.child("email").val().trim();

	  		//get the latitude and longitude of the childs address     	
	   		getLongLat(childSnapshot.child("address").val().trim(),title,desc,usrID,address,startDate,startTime,endTime,name,phone,email);
		});	  	
	   
	});		 
 }

//log Off function
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

 	}
});


$("#createAdd").on("click",function(){

	//go to create ad page
	window.location.href = "createAdvert.html";	

});

//Close ad 
$("#ad-close").on("click",function(){

	//Set display attribute to none
	$("#ad-container").css("display","none");
});

//Update map with new ad location data
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

    		//Function variables
    		var markerData = longLatArray[i];
    		var marker = null;
        	
        	//New marker object
        	var marker = new google.maps.Marker({

        		//Set the marker position on map
          		position: new google.maps.LatLng(markerData.lat, markerData.lng),
          		map: map,       		
          		
        	});


        	//Add mouseover, mouseout and click events to marker
        	(function(marker, markerData){
        		var addr = "Address";
        		var adDate = "Sale Date";
        		
        		//On mouse over open infowindow
      			google.maps.event.addListener(marker, 'mouseover', function(e) {
      				
      				//Content to be displayed in infowindow
					infoWnd.setContent('<div class="scrollFix"><h4 id="marker-title">' + markerData.title +  '</h4><br><ins style="color:blue">Address</ins><br>'+ markerData.address + '<br><ins style="color:blue">Sale Date</ins><br>' + markerData.startDate + '</div>');
					
					//Open infowindow with marker content
					infoWnd.open(map, marker);
					 
				});

      			//On mouse out event close infowindow
				google.maps.event.addListener(marker, 'mouseout', function() {						
					infoWnd.close();				
				});

				google.maps.event.addListener(marker, 'click', function() {

					//Clear 
					$("#ad-location-contact-info").html("");

					//Open the ad container. Set display attribute to block
					$("#ad-container").css("display","block");
					$("#ad-location-contact-info").append("<h4 class='ad-headers'><u>Location</u></h4>");
					$("#ad-location-contact-info").append(markerData.address);
					$("#ad-location-contact-info").append("<h4 class='ad-headers'><u>Sale Date</u></h4>");
					$("#ad-location-contact-info").append(markerData.startDate);
					$("#ad-location-contact-info").append("<h4 class='ad-headers'><u>Sale Times</u></h4>");
					$("#ad-location-contact-info").append(moment(markerData.startTime, "HH:mm").format("hh:mm A") + " - " + moment(markerData.endTime, "HH:mm").format("hh:mm A"));		

					/*If name input value is not blank append*/
					if(markerData.name !== ""){
						$("#ad-location-contact-info").append("<h4 class='ad-headers'><u>Seller Name</u></h4>");
						$("#ad-location-contact-info").append(markerData.name);
					}

					/*If phone input value is not blank append*/
					if(markerData.phone !== ""){
						$("#ad-location-contact-info").append("<h4 class='ad-headers'><u>Seller phone</u></h4>");
						$("#ad-location-contact-info").append("<a href='tel:+1" + markerData.phone +"'>"  + markerData.phone + "</a>");
					}

					/*If email input value is not blank append*/
					if(markerData.email !== ""){
						$("#ad-location-contact-info").append("<h4 class='ad-headers'><u>Seller email</u></h4>");
						$("#ad-location-contact-info").append("<a href='mailto:" + markerData.email + "'>" + markerData.email + "</a>");
					}

					//Clear
					$(".ad-description").html("");
					$(".ad-description").append("<h2 class='ad-headers'>" + markerData.title + "</h2");
					console.log("markerData.desc ",markerData.desc);
					$(".ad-description").append("<pre class='ad-display-info'>" + markerData.desc + "</pre>");

				});
      		})(marker, markerData);       
      }
}


//For initial load of map
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
  }