$(document).ready(function(){

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

 		//Get input data
 		// var txtEmail = $("#textEmail").val();
 		// const txtPassword = $("#textPassword").val();
 		// const btnLogin = $("#btnLogin").val();
 		// const btnSignUp = $("#btnSignUp").val();
 		// const btnLogout = $("#btnLogout").val();
 		// const auth = firebase.auth();
 		// console.log("email", txtEmail);

 		//Login Event
 		$("#btnSignin").on("click",function(){
 			//make sure error is cleared.
	 		$("#error_message").html("");
	 		console.log("sign in");
 			const txtEmail = $("#inputEmail").val();
 			const txtPassword = $("#inputPassword").val();
 			console.log(txtEmail + " " + txtPassword);
 			const auth = firebase.auth();
 			const promise = auth.signInWithEmailAndPassword(txtEmail, txtPassword);

 			console.log("In log in");
 			
 			promise.catch(console.log(e.message));

 			var user = firebase.auth().currentUser;

 			if (user != null) {
				  console.log(user.displayName);
				  console.log(user.email);
				  console.log(user.photoURL);
				  console.log(user.emailVerified);
				  console.log(user.uid);  // The user's ID, unique to the Firebase project. Do NOT use
				                   // this value to authenticate with your backend server, if
				                   // you have one. Use User.getToken() instead.
				}
 		});

 		firebase.auth().onAuthStateChanged(function(firebaseUser){
 			if(firebaseUser){

<<<<<<< HEAD
 				// console.log("changed");
 				
 					window.location.href = "createAdvert.html";
=======
 				console.log(firebaseUser);
 				
 					//window.location.href = "search.html";
>>>>>>> 3891ae2a969c846f36a804a60d1366ce360150a9
  			

 			}


 		});

 		//sign up button on click event
 		$("#btnSignUp").on("click",function(){
 			//make sure error is cleared.
	 		$("#error_message").html("");

 			//get email and passwork input values
 			const txtEmail = $("#inputEmail").val();
 			const txtPassword = $("#inputPassword").val();

 			//get fire base authorization method
 			const auth = firebase.auth();

 			//create User Account 
 			const promise = auth.createUserWithEmailAndPassword(txtEmail, txtPassword);
 			
 			//catch errors
 			promise.catch(function(e){
 				//password must be at least 6 characters

 				console.log(e.message);
 				if(e.message === "Password should be at least 6 characters"){
 					//display password must be 6 characters message
	 				$("#error_message").html(e.message);
	 				//clear password input and set focus
	 				$("#inputPassword").val("").focus();
 				}
 				else{ //email already registered

 					//display email already exists message
	 				$("#error_message").html(e.message);
	 				//clear email input and set focus
	 				$("#inputEmail").val("").focus();
 				}
 			});
 			
 			var user = firebase.auth().currentUser;

 			if (user != null) {
				  console.log(user.displayName);
				  console.log(user.email);
				  console.log(user.photoURL);
				  console.log(user.emailVerified);
				  console.log(user.uid);  // The user's ID, unique to the Firebase project. Do NOT use
				                   // this value to authenticate with your backend server, if
				                   // you have one. Use User.getToken() instead.
				}
				
 		});

<<<<<<< HEAD
 		$("#btnSigninFB").on("click",function(){
 				//Login with facebook authentication
	 		var provider = new firebase.auth.FacebookAuthProvider();


	 		firebase.auth().signInWithRedirect(provider);

	 		firebase.auth().getRedirectResult().then(function(result) {
			  if (result.credential) {
			    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
			    var token = result.credential.accessToken;
			    // ...
			  }
			  // The signed-in user info.
			  var user = result.user;
			}).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  // The email of the user's account used.
			  var email = error.email;
			  // The firebase.auth.AuthCredential type that was used.
			  var credential = error.credential;
			  // ...
			});

 		});

 		$("add-train-btn").on("click",function(){
 			var category = $("#category-input").val();
 			var subCategory = $("#subCat-input").val();

 			var newAd = {
 				category : category,
 				subCategory :subCategory
 			}

 			var user = firebase.auth().currentUser;

	      if (user != null) {
	          console.log(user.displayName);
	          console.log(user.email);
	          console.log(user.photoURL);
	          console.log(user.emailVerified);
	         var userId = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
	                           // this value to authenticate with your backend server, if
	                           // you have one. Use User.getToken() instead.

	          console.log(userId);             
	           firebase.ref(userId).set(newAd);
	        }

 		});

 		$("#logOff").on("click",function(){
			firebase.auth().signOut();
			window.location.href = "index.html";
		});

 		
=======
>>>>>>> 3891ae2a969c846f36a804a60d1366ce360150a9
});