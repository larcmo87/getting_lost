var email = "";
var useAccountEmail = false;

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

$("#home").on("click",function(){
	//Goto search page
	window.location.href = "search.html";
});


//Log out 
$("#logOff").on("click",function(){

	//Sign out session
	firebase.auth().signOut();

	//return to login page
	window.location.href = "index.html";
});

//force the mask of the phone input
$("#phone-input").mask("999-999-9999");


//Email Radio button click event
$("input[type='radio'").on("click",function(){

	//Get the value of the selected radio button
	var radioVal = $("input:checked").val();
		
	//If value is account-email then don't display 
	//lable and text box set 
	if(radioVal === "account-email"){
		useAccountEmail = true;
		//Clear eamil input
		$("#email-input").val("");
		$("#email-label").css("display","none");
		$("#email-input").css("display","none");
			
	}else if(radioVal === "new-email"){
		//Make sure background color is white
		$("#email-input").css("background-color","white");
		useAccountEmail = false;
		//Clear eamil input
		$("#email-input").val("");
		$("#email-label").css("display","block");
		$("#email-input").css("display","block");
	}else{
		useAccountEmail = false;

		//Clear eamil input
		$("#email-input").val("");
		$("#email-label").css("display","none");
		$("#email-input").css("display","none");
	}

		
});

 
$("#submit-btn").on("click",function(){
	//event.preventDefault();
	var pushData = false;
 	var title = "";
 	var desc = "";
    var startDate = "";
    var startTime = "";
    // var endDate = ""; **Maybe used in future
    var endTime = "";
 	var street = "";
 	var city = "";
 	var state = "";
 	var zip = "";
    var name = "";
    var phone = "";
    

 	//Get input field values
 	title = $("#title-input").val();
 	desc = $("#description-input").val();
    startDate = $("#start-date").val();
    startTime = $("#start-time").val();
    // endDate = $("#end-date").val();  **Maybe used in future
    endTime = $("#end-time").val();
 	street = $("#street-input").val();
 	city = $("#city-input").val();
 	state = $("#state-input").val();
 	zip = $("#zip-input").val();
    name = $("#name-input").val();
    phone = $("#phone-input").val();
    email = $("#email-input").val();


    console.log(startDate);
    console.log(startTime);
    
    console.log(endTime);
     console.log("email",email);
     //Current authorized firebase user
	var user = firebase.auth().currentUser;

	console.log(user);
	// email = user.email;

   
 			// console.log("category ",category);
 			// console.log("cemail-inputategory ",subCategory);
	if (user != null) {
		console.log(user.displayName);
	    console.log(user.email);
	    console.log(user.photoURL);
	    console.log(user.emailVerified);

	    //If useAccountEmail true then use firebase user email
	    if(useAccountEmail){
	    	email = user.email;
	    }
	    // email = user.email;
	    var userId = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
	                           // this value to authenticate with your backend server, if
	                           // you have one. Use User.getToken() instead.

	    //newAd Object that will be used to add info the firebase database                       
	    var newAd = {
	        userId : userId,
 			title : title,
 			desc : desc,
            startDate : moment(startDate).format("MM/DD/YYYY").toString(),
            startTime : startTime,
            // endDate : moment(endDate).format("MM/DD/YYYY").toString(), **Maybe used in future
            endTime : endTime,
            name : name,
            phone : phone,
            email : email,
 			//Concatenate addres info so store in firebase database
 			//Makes it easeir to use with MapQuest Geocodinng API
 			address : street + ", " + city + ", " + state + " " + zip
 		}

 		//loop through each form element
 		$('input, textarea').each(function(){
		    console.info(this.id);
		    console.info(this.required);
		    
		    //Make sure the background color is white
		    $(this).css("background-color","white");
		   
		    //is input a required field and display not equal none
		    if(this.required && $(this).css('display') !== 'none'){
		    	var inputId = this.id;
		    	var inputVal = $("#"+inputId).val();
		    	console.log("this val", inputVal);

		    	//make sure the zip length is = 5
		    	if(this.id === "zip-input"){
		    		if(inputVal.length < 5 || inputVal.length > 5){
		    			$(this).css("background-color","yellow");
		    			pushData = false;

		    		//Exit each loop
		    		return false;
		    		}
		    	}

		    	if(this.id == "email-input"){
		    		//Email regex to filter on 
		    		var filter = /^[\w-.+]+@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/;

					if (filter.test(inputVal)) {
						//Do Nothing
					}else{
						$(this).css("background-color","yellow");
						pushData = false;
						return false;
					}				
				}
		    	//if input value is blank then don't push data to firebase
		    	if(inputVal === ""){

		    		//Set the focus to the element and set its background color to yellow
		    		$(this).focus(function(){
		    			$(this).css("background-color","yellow");
		    		})
		    		pushData = false;

		    		//Exit each loop
		    		return false;

		    	}else{
		    		pushData = true;
		    	}
		    }
    
		});
 	}

 	//Push to firebase only if all the required fields have been entered
 	if(pushData){

		 //Add new Ad to Firebase                
		 database.ref("Ads").push(newAd);
		 //Goto search page
	 	window.location.href = "search.html";
	 }	
});



$("#cancel").on("click",function(){
	//Goto search page
	window.location.href = "search.html";
});