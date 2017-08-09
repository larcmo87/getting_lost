
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
           //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
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


      var user = firebase.auth().currentUser;

      if (user != null) {
          console.log(user.displayName);
          console.log(user.email);
          console.log(user.photoURL);
          console.log(user.emailVerified);
         var userId = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.


           firebase.ref(userId).set();
        }

       