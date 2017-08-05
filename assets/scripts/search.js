$("p").click(function(){
        console.log("this works");
    });
 // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyCrtYZiJnWVqqPmuOjwcOOw9h4kD1kqJOw",
	    authDomain: "accountinfo-a7f24.firebaseapp.com",
	    databaseURL: "https://accountinfo-a7f24.firebaseio.com",
	    projectId: "accountinfo-a7f24",
	    storageBucket: "accountinfo-a7f24.appspot.com",
	    messagingSenderId: "707215119891"
	  };
 		 firebase.initializeApp(config);


$("#logOff").on("click",function(){
	firebase.auth().signOut();
	window.location.href = "index.html";
});