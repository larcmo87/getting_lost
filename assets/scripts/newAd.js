
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

//Log out 
$("#logOff").on("click",function(){

	//Sign out session
	firebase.auth().signOut();

	//return to login page
	window.location.href = "index.html";
});

$("#add-train-btn").on("click",function(){
 	var title = "";
 	var desc = "";
 	var street = "";
 	var city = "";
 	var state = "";
 	var zip = "";

 	//Get input field values
 	title = $("#title-input").val();
 	desc = $("#description-input").val();
 	street = $("#street-input").val();
 	city = $("#city-input").val();
 	state = $("#state-input").val();
 	zip = $("#zip-input").val();
 			
	var user = firebase.auth().currentUser;
 			// console.log("category ",category);
 			// console.log("category ",subCategory);
	if (user != null) {
		console.log(user.displayName);
	    console.log(user.email);
	    console.log(user.photoURL);
	    console.log(user.emailVerified);
	    var userId = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
	                           // this value to authenticate with your backend server, if
	                           // you have one. Use User.getToken() instead.

	    //newAd Object that will be used to add info the firebase database                       
	    var newAd = {
	        userId : userId,
 			title : title,
 			desc : desc
 			//Concatenate addres info so store in firebase database
 			//Makes it easeir to use with MapQuest Geocodinng API
 			address : street + ", " + city + ", " + state + " " + zip
 		}

	    //Add new Ad to Firebase                
	    database.ref("Ads").push(newAd);
	          
	}

	//Goto search page
	window.location.href = "search.html";
});
