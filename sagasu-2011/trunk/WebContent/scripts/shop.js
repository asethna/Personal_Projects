	var currentUser, screenName, profileImage, profileImageTag, userId, xmlHttpRequest, userPoints;
	var LETTER_GETTER_PRICE = 2000;
	var SCREENSHOTS_PRICE = 3000;
	var STREET_LABELS_PRICE = 10000;
	var RANDOM_SALARY_PRICE = 2000; 
	/***
	 * Initialize startGame.js functions when page is loaded and user is connected, else return them to index page
	 */
	twttr.anywhere(function(T) {
				if (T.isConnected()) {
					currentUser = T.currentUser;
					screenName = currentUser.data('screen_name');
					userId = currentUser.data('id');
					
					displayPointsAndInventory();
					//displayUserPoints();
					//displayInventory();
					
				} else {
					signoutReq();
					location.replace("index.jsp");
				}
			});
	
	function signoutReq() {
		var reqURL = "./ServletAccount"; //the name (URI) of your servlet

		try { //create a request for netscape, mozilla, opera, etc.
			xmlHttpRequest = new XMLHttpRequest();
		} catch (e) {
			try { //create a request for internet explorer
				xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) { //do some error-handling
				alert("XMLHttpRequest error: " + e);
			}
		}

		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("signout");

	iRequest.addParam("screen_Name", screenName);
		iRequest.addParam("user_Id", userId);
		xmlHttpRequest.setRequestHeader('Content-Type',
				'application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());

		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			//do something with the response
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
	}

	/**
	 * Displays and updates user's current point and number of items.
	 */
	function displayPointsAndInventory(){
	   	var reqURL = "./ServletAccount";                //the name (URI) of your servlet
		var xmlHttpRequest;
	   	
	    try {                                     //create a request for netscape, mozilla, opera, etc.
	        xmlHttpRequest = new XMLHttpRequest();
	    }
	    catch (e) {
	        try {                                 //create a request for internet explorer
	        	xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	        }
	        catch (e) {                           //do some error-handling
	            alert("XMLHttpRequest error: " + e);
	        }
	    }
	    xmlHttpRequest.open("POST", reqURL, true);
	    var iRequest = new Request;
		iRequest.addAction("displayPointsAndInventory");
		iRequest.addParam("screen_Name", screenName);
		iRequest.addParam("user_Id", userId);
		xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString()); 
	    xmlHttpRequest.onreadystatechange = function(){  //this is used to listen for changes in the request's status
	        //do something with the response
							if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status ==200) {								
								var points;
								var account = xmlHttpRequest.responseXML.getElementsByTagName("Account").item(0);
								points = account.getAttribute("userPoints");						
								document.getElementById("pId").innerHTML = points;	
								document.getElementById("pointsId").innerHTML = points;
								
								var letterGetterItem, screenshotsItem, streetLabelsItem, randomSalaryItem;
								var inventory = xmlHttpRequest.responseXML.getElementsByTagName("Inventory").item(0);
								letterGetterItem = inventory.getAttribute("letterGetterQuantity");	
								screenshotsItem = inventory.getAttribute("screenshotsQuantity");	
								streetLabelsItem = inventory.getAttribute("streetLabelsQuantity");	
								randomSalaryItem = inventory.getAttribute("randomSalaryQuantity");	
				
								document.getElementById("letterGetter").innerHTML=letterGetterItem;
								document.getElementById("screenshots").innerHTML=screenshotsItem;
								document.getElementById("streetLabels").innerHTML=streetLabelsItem;
								document.getElementById("randomSalary").innerHTML=randomSalaryItem;

								document.getElementById("buyLetterGetterButton").disabled=false;
								document.getElementById("buyScreenshotsButton").disabled=false;
								document.getElementById("buyStreetLabelsButton").disabled=false;
								document.getElementById("buyRandomSalaryButton").disabled=false;

/*
								if(points>=LETTER_GETTER_PRICE){
									document.getElementById("buyLetterGetterButton").disabled=false;
								} else {
									document.getElementById("buyLetterGetterButton").disabled=true;
								}			
								
								if(points>=SCREENSHOTS_PRICE){
									document.getElementById("buyScreenshotsButton").disabled=false;
								} else {
									document.getElementById("buyScreenshotsButton").disabled=true;
								}
								
								if(points>=STREET_LABELS_PRICE){
									document.getElementById("buyStreetLabelsButton").disabled=false;
								} else {
									document.getElementById("buyStreetLabelsButton").disabled=true;
								}
								
								if(points>=RANDOM_SALARY_PRICE){
									document.getElementById("buyRandomSalaryButton").disabled=false;
								} else {
									document.getElementById("buyRandomSalaryButton").disabled=true;
								}
*/								
							}
	    };       
	}
	
	
	function buyLetterGetter(){
		document.getElementById("pId").innerHTML="Loading";	
		document.getElementById("pointsId").innerHTML = "Loading";
		document.getElementById("letterGetter").innerHTML="..";
		document.getElementById("screenshots").innerHTML="..";
		document.getElementById("streetLabels").innerHTML="..";
		document.getElementById("randomSalary").innerHTML="..";
	   	var reqURL = "./ServletAccount";                //the name (URI) of your servlet
		var xmlHttpRequest3;
	   	
	    try {                                     //create a request for netscape, mozilla, opera, etc.
	        	xmlHttpRequest3 = new XMLHttpRequest();
	    }
	    catch (e) {
	        try {                                 //create a request for internet explorer
	        	xmlHttpRequest3 = new ActiveXObject("Microsoft.XMLHTTP");
	        }
	        catch (e) {                           //do some error-handling
	            alert("XMLHttpRequest error: " + e);
	        }
	    }
	   
	    xmlHttpRequest3.open("POST", reqURL, true);
	    var iRequest = new Request;
	    iRequest.addAction("buyLetterGetter");
		xmlHttpRequest3.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest3.send(iRequest.toString());	    
	    xmlHttpRequest3.onreadystatechange = function(){  //this is used to listen for changes in the request's status
	        //do something with the response
							if (xmlHttpRequest3.readyState == 4 & xmlHttpRequest3.status ==200) {
								displayPointsAndInventory();					
							}
	    };       
		
	}
	
	function buyScreenshots(){
		document.getElementById("pId").innerHTML="Loading";	
		document.getElementById("pointsId").innerHTML = "Loading";
		document.getElementById("letterGetter").innerHTML="..";
		document.getElementById("screenshots").innerHTML="..";
		document.getElementById("streetLabels").innerHTML="..";
		document.getElementById("randomSalary").innerHTML="..";
	   	var reqURL = "./ServletAccount";                //the name (URI) of your servlet
		var xmlHttpRequest4;
	   	
	    try {                                     //create a request for netscape, mozilla, opera, etc.
	        	xmlHttpRequest4 = new XMLHttpRequest();
	    }
	    catch (e) {
	        try {                                 //create a request for internet explorer
	        	xmlHttpRequest4 = new ActiveXObject("Microsoft.XMLHTTP");
	        }
	        catch (e) {                           //do some error-handling
	            alert("XMLHttpRequest error: " + e);
	        }
	    }

	    xmlHttpRequest4.open("POST", reqURL, true);
	    var iRequest = new Request;
		iRequest.addAction("buyScreenshots");
		xmlHttpRequest4.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest4.send(iRequest.toString());	    
	    xmlHttpRequest4.onreadystatechange = function(){  //this is used to listen for changes in the request's status
	        //do something with the response
							if (xmlHttpRequest4.readyState == 4 & xmlHttpRequest4.status ==200) {
								displayPointsAndInventory();					
							}
	    };       
	}

	function buyStreetLabels(){
		document.getElementById("pId").innerHTML="Loading";	
		document.getElementById("pointsId").innerHTML = "Loading";
		document.getElementById("letterGetter").innerHTML="..";
		document.getElementById("screenshots").innerHTML="..";
		document.getElementById("streetLabels").innerHTML="..";
		document.getElementById("randomSalary").innerHTML="..";
	   	var reqURL = "./ServletAccount";                //the name (URI) of your servlet
		var xmlHttpRequest5;
	   	
	    try {                                     //create a request for netscape, mozilla, opera, etc.
	        	xmlHttpRequest5 = new XMLHttpRequest();
	    }
	    catch (e) {
	        try {                                 //create a request for internet explorer
	        	xmlHttpRequest5 = new ActiveXObject("Microsoft.XMLHTTP");
	        }
	        catch (e) {                           //do some error-handling
	            alert("XMLHttpRequest error: " + e);
	        }
	    }
	    
	    xmlHttpRequest5.open("POST", reqURL, true);
	    var iRequest = new Request;
	    iRequest.addAction("buyStreetLabels");

		xmlHttpRequest5.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest5.send(iRequest.toString());
	    
	    xmlHttpRequest5.onreadystatechange = function(){  //this is used to listen for changes in the request's status
	        //do something with the response
							if (xmlHttpRequest5.readyState == 4 & xmlHttpRequest5.status ==200) {
								displayPointsAndInventory();					
							}
	    };  
	}
	
	function buyRandomSalary(){
		document.getElementById("pId").innerHTML="Loading";	
		document.getElementById("pointsId").innerHTML = "Loading";
		document.getElementById("letterGetter").innerHTML="..";
		document.getElementById("screenshots").innerHTML="..";
		document.getElementById("streetLabels").innerHTML="..";
		document.getElementById("randomSalary").innerHTML="..";
	   	var reqURL = "./ServletAccount";                //the name (URI) of your servlet
		var xmlHttpRequest6;
	   	
	    try {                                     //create a request for netscape, mozilla, opera, etc.
	        	xmlHttpRequest6 = new XMLHttpRequest();
	    }
	    catch (e) {
	        try {                                 //create a request for internet explorer
	        	xmlHttpRequest6 = new ActiveXObject("Microsoft.XMLHTTP");
	        }
	        catch (e) {                           //do some error-handling
	            alert("XMLHttpRequest error: " + e);
	        }
	    }

	    xmlHttpRequest6.open("POST", reqURL, true);
	    var iRequest = new Request;
		iRequest.addAction("buyRandomSalary");
		xmlHttpRequest6.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xmlHttpRequest6.send(iRequest.toString());
	    
	    xmlHttpRequest6.onreadystatechange = function(){  //this is used to listen for changes in the request's status
	        //do something with the response
							if (xmlHttpRequest6.readyState == 4 & xmlHttpRequest6.status ==200) {
								displayPointsAndInventory();					
							}
	    };  
	}
	
	
	