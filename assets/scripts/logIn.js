// $(document).ready(function(){
// 	var displaySearchPage = true;


//     // Initialize Firebase
// 	  var config = {
// 	    apiKey: "AIzaSyCrtYZiJnWVqqPmuOjwcOOw9h4kD1kqJOw",
// 	    authDomain: "accountinfo-a7f24.firebaseapp.com",
// 	    databaseURL: "https://accountinfo-a7f24.firebaseio.com",
// 	    projectId: "accountinfo-a7f24",
// 	    storageBucket: "accountinfo-a7f24.appspot.com",
// 	    messagingSenderId: "707215119891"
// 	  };
//  		 firebase.initializeApp(config);

//  		//Get input data
//  		// var txtEmail = $("#textEmail").val();
//  		// const txtPassword = $("#textPassword").val();
//  		// const btnLogin = $("#btnLogin").val();
//  		// const btnSignUp = $("#btnSignUp").val();
//  		// const btnLogout = $("#btnLogout").val();
//  		// const auth = firebase.auth();
//  		// console.log("email", txtEmail);

//  		//Login Event
//  		$("#btnSignin").on("click",function(){
//  			//make sure error is cleared.
// 	 		$("#error_message").html("");
// 	 		console.log("sign in");
//  			const txtEmail = $("#inputEmail").val();
//  			const txtPassword = $("#inputPassword").val();
//  			console.log(txtEmail + " " + txtPassword);
//  			const auth = firebase.auth();
//  			const promise = auth.signInWithEmailAndPassword(txtEmail, txtPassword);
 			
//  			promise.catch(console.log(e.message));
//  		});

//  		firebase.auth().onAuthStateChanged(function(firebaseUser){
//  			if(firebaseUser){

//  				// console.log("changed");
//  				if(displaySearchPage){
//  					window.location.href = "search.html";
//  					displaySearchPage = false;
//  				}

//  			}


//  		});

//  		//sign up button on click event
//  		$("#btnSignUp").on("click",function(){
//  			//make sure error is cleared.
// 	 		$("#error_message").html("");

//  			//get email and passwork input values
//  			const txtEmail = $("#inputEmail").val();
//  			const txtPassword = $("#inputPassword").val();

//  			//get fire base authorization method
//  			const auth = firebase.auth();

//  			//create User Account 
//  			const promise = auth.createUserWithEmailAndPassword(txtEmail, txtPassword);
 			
//  			//catch errors
//  			promise.catch(function(e){
//  				//password must be at least 6 characters

//  				console.log(e.message);
//  				if(e.message === "Password should be at least 6 characters"){
//  					//display password must be 6 characters message
// 	 				$("#error_message").html(e.message);
// 	 				//clear password input and set focus
// 	 				$("#inputPassword").val("").focus();
//  				}
//  				else{ //email already registered

//  					//display email already exists message
// 	 				$("#error_message").html(e.message);
// 	 				//clear email input and set focus
// 	 				$("#inputEmail").val("").focus();
//  				}
//  			});
 			
//  			var user = firebase.auth().currentUser;

//  			if (user != null) {
// 				  console.log(user.displayName);
// 				  console.log(user.email);
// 				  console.log(user.photoURL);
// 				  console.log(user.emailVerified);
// 				  console.log(user.uid);  // The user's ID, unique to the Firebase project. Do NOT use
// 				                   // this value to authenticate with your backend server, if
// 				                   // you have one. Use User.getToken() instead.
// 				}
				
//  		});

//  		$("#btnSigninFB").on("click",function(){
//  				//Login with facebook authentication
// 	 		var provider = new firebase.auth.FacebookAuthProvider();


// 	 		firebase.auth().signInWithRedirect(provider);

// 	 		firebase.auth().getRedirectResult().then(function(result) {
// 			  if (result.credential) {
// 			    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
// 			    var token = result.credential.accessToken;
// 			    // ...
// 			  }
// 			  // The signed-in user info.
// 			  var user = result.user;
// 			}).catch(function(error) {
// 			  // Handle Errors here.
// 			  var errorCode = error.code;
// 			  var errorMessage = error.message;
// 			  // The email of the user's account used.
// 			  var email = error.email;
// 			  // The firebase.auth.AuthCredential type that was used.
// 			  var credential = error.credential;
// 			  // ...
// 			});

//  		});
// });


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

 // FirebaseUI config.
      var uiConfig = {
        signInSuccessUrl: 'search.html',
        signInOptions: [
          // Leave the lines as is for the providers you want to offer your users.
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
           firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
          // firebase.auth.GithubAuthProvider.PROVIDER_ID,
          firebase.auth.EmailAuthProvider.PROVIDER_ID,
          // firebase.auth.PhoneAuthProvider.PROVIDER_ID
        ],
        // Terms of service url.
        tosUrl: '<your-tos-url>'
      };

      // Initialize the FirebaseUI Widget using Firebase.
      var ui = new firebaseui.auth.AuthUI(firebase.auth());
      // The start method will wait until the DOM is loaded.
      ui.start('#firebaseui-auth-container', uiConfig);