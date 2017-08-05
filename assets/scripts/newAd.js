alert("howdy");

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

  // firebase variable
  var database = firebase.database();

  // button for adding ad content
  $('#create-ad-btn').on('click', function(event) {

  	// grab user input
  	var category = $('#category-input').val().trim();
  	var subCategory = $('#subCat-input').val().trim();
  	var title = $('#title-input').val().trim();
  	var price = $('#price-input').val().trim();
  	var listingType = $('#listing-input').val().trim();
  	var city = $('#city-input').val().trim();
  	var state = $('#state-input').val().trim();
  	var zip = $('#zip-input').val().trim();
  	var description = $('#description-input').val().trim();

  	// create local 'temporary' object for holding ad data
  	var newAd = {
  		category: category,
  		subCategory: subCategory,
  		title: title,
  		price: price,
  		listingType: listingType,
  		city: city,
  		state: state,
  		zip: zip,
  		description: description
  	};

  	var user = firebase.auth().currentUser;
            if (user != null) {
                  console.log(user.displayName);
                  console.log(user.email);
                  console.log(user.photoURL);
                  console.log(user.emailVerified);
                  console.log(user.uid);

    // The user's ID, unique to the Firebase project.
    var userID = user.uid;
                              
    }

    database.ref(userID).set(newAd);

    console.log(userID);

  	// uploads ad data to database

  	// database.ref().push(newAd);

  	// console.log it all out for maximum testing
  	console.log(newAd.category);
  	console.log(newAd.subCategory);
  	console.log(newAd.title);
  	console.log(newAd.price);
  	console.log(newAd.listingType);
  	console.log(newAd.city);
  	console.log(newAd.state);
  	console.log(newAd.zip);
  	console.log(newAd.description);

  	// clears all of the input boxes
  	$('#category-input').val("");
  	$('#subCat-input').val("");
  	$('#title-input').val("");
  	$('#price-input').val("");
  	$('#listing-input').val("");
  	$('#city-input').val("");
  	$('#state-input').val("");
  	$('#zip-input').val("");
  	$('#description-input').val("");

  });

// firebase event adding ad to database and providing entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	// store everything into a variable
	var category = childSnapshot.val().category;
	var subCategory = childSnapshot.val().subCategory;
	var title = childSnapshot.val().title;
	var price = childSnapshot.val().price;
	var listingType = childSnapshot.val().listingType;
	var city = childSnapshot.val().city;
	var state = childSnapshot.val().state;
	var zip = childSnapshot.val().zip;
	var description = childSnapshot.val().description;

	/* ad info
	console.log(category);
	console.log(subCategory);
	console.log(title);
	console.log(price);
	console.log(listingType);
	console.log(city);
	console.log(state);
	console.log(zip);
	console.log(description);
	end of ad info */

});







