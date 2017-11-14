//Gobal vars.
var point, streetviewClient, map, zoom, xRand, yRand, changedX, changedY, changedZoom, answer, location1, uImage, uId, uName, gId, salary, uLevel, uPoints, lgAnswer, inG, sMaps, letterGetterQuantity, screenshotsQuantity, streetLabelsQuantity, randomSalaryQuantity;
pos = '';
letter = '';
stLabels = 0;
mapType = "satellite";
showSS = 0;
//NEED:	var category.

	/***
	 * Initialize startGame.js functions when page is loaded and user is connected, else return them to index page
	 */
	function init() {
		twttr.anywhere(function(T) {
			if (T.isConnected()) {
				getAccountReq();
			} 
			else {
				//signoutReq();
				//location.replace("index.jsp");
			}
		});
	}

	/***
	 * Sign user out, return them to the homepage, and tell server to change loggedIn status of user to offline.
	 */
	function signoutReq() {
		var reqURL = "./ServletAccount"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("signout");
		iRequest.addParam("screen_Name", screenName);
		iRequest.addParam("user_Id", userId);
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			//do something with the response
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
	}
	
	/***
	 * Generates and displays the google map and pegman 
	 * @param y starting y coordinate of pegman
	 * @param x starting x coordinate of pegman
	 * @param z starting z coordinate of pegman
	 * @param cY current y coordinate of the pegman 
	 * @param cX current x coordinate of the pegman
	 * @param cZ current z coordinate of the pegman
	 */
	function useExistingMap(y, x, z, cY, cX, cZ) {
		yRand = y;
		xRand = x;
		zoom = z;
		changedX = cX;
		changedY = cY;
		changedZoom = cZ;
		document.getElementById("map_canvas").innerHTML = ('<IMG SRC="http://maps.googleapis.com/maps/api/staticmap?size=700x500&maptype='
				+ mapType
				+ '&zoom='
				+ changedZoom
				+ '\&markers=size:mid%7Ccolor:red%7C'
				+ parseFloat(changedY)
				+ ',' + parseFloat(changedX) + '&sensor=false" WIDTH=700 HEIGHT=500>');
		getAnswer();
	}
	
	/***
	 * Updates server about any player made changes in the game
	 */
	function changeReq() {
		var reqURL = "./ServletCreateGame"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("changeGameCoor");
		iRequest.addParam("changedY", changedY);
		iRequest.addParam("changedX", changedX);
		iRequest.addParam("changedZoom", changedZoom);
		iRequest.addParam("salary", salary);
		iRequest.addParam("userId", uId);
		iRequest.addParam("userName", uName);
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
	}

	/***
	 * Updates server whenever an Inventory item is used
	 */
	function changeItemsReq() {
		var reqURL = "./ServletCreateGame"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("changeGameItems");
		iRequest.addParam("userId", uId);
		iRequest.addParam("letterGetter", lgAnswer);
		iRequest.addParam("letterGetter_letter", letter);
		iRequest.addParam("letterGetter_pos", pos);
		iRequest.addParam("streetLabels", stLabels);
		iRequest.addParam("showSS", showSS);
		iRequest.addParam("lgQuantity", letterGetterQuantity);
		iRequest.addParam("slQuantity", streetLabelsQuantity);
		iRequest.addParam("rsQuantity", randomSalaryQuantity);
		iRequest.addParam("ssQuantity", screenshotsQuantity);
		xmlHttpRequest.setRequestHeader('Content-Type',	'application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
	}

	/***
	 * Updates the server with the player's earned points and level
	 */
	function setWinnings() {
		var reqURL = "./ServletCreateGame"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("setUserWinnings");
		iRequest.addParam("salary", salary);
		iRequest.addParam("userId", uId);
		iRequest.addParam("userName", uName);
		iRequest.addParam("userPoints", uPoints);
		iRequest.addParam("userLevel", uLevel);
		iRequest.addParam("solvedMaps", sMaps);
		iRequest.addParam("inGame", 0);
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
		deleteGameReq();
	}

	/***
	 * Tells server to remove current GameSessionId of user
	 */
	function deleteGameReq() {
		var reqURL1 = "./ServletCreateGame";
		createXmlHttpRequest();
		xmlHttpRequest1.open("POST", reqURL1, true);
		var request = new Request;
		request.addAction("deleteGame");
		request.addParam("userId", uId);
		request.addParam("userName", uName);
		request.addParam("gameId", gId);
		xmlHttpRequest1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest1.send(request.toString());
		xmlHttpRequest1.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest1.readyState == 4 & xmlHttpRequest1.status == 200) {
			}
		};
	}

	/***
	 * Gets from server the data of a current game, which includes coordinates of the answer, coordinates of the pegman,
	 * salary, and Inventory Items
	 */
	function getGameReq() {
		var reqURL1 = "./ServletCreateGame";
		try {
			xmlHttpRequest1 = new XMLHttpRequest();
		} catch (e) {
			try { //create a request for internet explorer
				xmlHttpRequest1 = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) { //do some error-handling
				alert("XMLHttpRequest error: " + e);
			}
		}
		xmlHttpRequest1.open("POST", reqURL1, true);
		var request = new Request;
		request.addAction("getCurrentGame");
		request.addParam("userId", uId);
		request.addParam("userName", uName);
		xmlHttpRequest1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest1.send(request.toString());
		xmlHttpRequest1.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest1.readyState == 4 & xmlHttpRequest1.status == 200) {
				var game, pegman;
				game = xmlHttpRequest1.responseXML.getElementsByTagName("Game").item(0);
				pegman = xmlHttpRequest1.responseXML.getElementsByTagName("Pegman").item(0);
				yRand = pegman.getAttribute("yCoor");
				xRand = pegman.getAttribute("xCoor");
				zoom = pegman.getAttribute("zoom");
				changedY = pegman.getAttribute("changedY");
				changedX = pegman.getAttribute("changedX");
				changedZoom = pegman.getAttribute("changedZoom");
				salary = game.getAttribute("salary");
				answer = game.getAttribute("answer");
				lgAnswer = game.getAttribute("letterGetter");
				letter = game.getAttribute("letterGetter_letter");
				pos = game.getAttribute("letterGetter_pos");
				stLabels = game.getAttribute("streetLabels");
				if (stLabels == 1) {
					mapType = "hybrid";
				} 
				else {
					mapType = "satellite";
				}
				showSS = game.getAttribute("showSS");
				useExistingMap(yRand, xRand, zoom, changedY, changedX, changedZoom);
				document.getElementById("game_salary").innerHTML = salary;
			}
		};
	}

	/***
	 * Gets from server the answer and displays it
	 */
	function getAnswer() {
		var reqURL1 = "./ServletCreateGame";
		createXmlHttpRequest();
		xmlHttpRequest1.open("POST", reqURL1, true);
		var request = new Request;
		request.addAction("getCurrentGame");
		request.addParam("userId", uId);
		request.addParam("userName", uName);
		xmlHttpRequest1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest1.send(request.toString());
		xmlHttpRequest1.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest1.readyState == 4 & xmlHttpRequest1.status == 200) {
				var game;
				game = xmlHttpRequest1.responseXML.getElementsByTagName("Game").item(0);
				answer = game.getAttribute("answer");
				if (lgAnswer == "") {
					lgAnswer = answer;
				} 
				else {
					document.getElementById("hint").innerHTML = ('The letter '+ letter + ' at position ' + pos);
				}
			}
		};
	}

	/***
	 * Gets from server the user's id, gameSessionId, and user data needed to play the game
	 */
	function getAccountReq() {
		var reqURL = "./ServletAccount"; //the name (URI) of your servlet
		try { //create a request for netscape, mozilla, opera, etc.
			xmlHttpRequest = new XMLHttpRequest();
		} 
		catch (e) {
			try { //create a request for internet explorer
				xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) { //do some error-handling
				alert("XMLHttpRequest error: " + e);
			}
		}
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("retrieveData");
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
				var account;
				account = xmlHttpRequest.responseXML.getElementsByTagName("Account").item(0);
				uId = account.getAttribute("userId");
				uName = account.getAttribute("userName");
				gId = account.getAttribute("gameSessionId");
				uLevel = account.getAttribute("userLevel");
				uPoints = account.getAttribute("userPoints");
				sMaps = account.getAttribute("solvedMaps");
				if (gId == "NONE") {
					getAccountReq();
				} else {
					getGameReq();
					getInventory();
				}
			}
		};
	}

	/***
	 * Gets from server the Inventory Items (Quantity of Each Item) of the player and displays the Quantity of each item
	 */
	function getInventory() {
		alert("Can You Guess Where You Are?");
		var reqURL1 = "./ServletCreateGame";
		try {
			xmlHttpRequest1 = new XMLHttpRequest();
		} 
		catch (e) {
			try { //create a request for internet explorer
				xmlHttpRequest1 = new ActiveXObject("Microsoft.XMLHTTP");
			} 
			catch (e) { //do some error-handling
				alert("XMLHttpRequest error: " + e);
			}
		}
		xmlHttpRequest1.open("POST", reqURL1, true);
		var request = new Request;
		request.addAction("displayInventory");
		request.addParam("userId", uId);
		request.addParam("userName", uName);
		xmlHttpRequest1.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest1.send(request.toString());
		xmlHttpRequest1.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest1.readyState == 4 & xmlHttpRequest1.status == 200) {
				var inventory = xmlHttpRequest1.responseXML.getElementsByTagName("Inventory").item(0);
				letterGetterQuantity = inventory.getAttribute("letterGetterQuantity");
				screenshotsQuantity = inventory.getAttribute("screenshotsQuantity");
				streetLabelsQuantity = inventory.getAttribute("streetLabelsQuantity");
				randomSalaryQuantity = inventory.getAttribute("randomSalaryQuantity");
				document.getElementById("lg").innerHTML = ('Quantity = ' + letterGetterQuantity);
				document.getElementById("ss").innerHTML = ('Quantity = ' + screenshotsQuantity);
				document.getElementById("sl").innerHTML = ('Quantity = ' + streetLabelsQuantity);
				document.getElementById("rs").innerHTML = ('Quantity = ' + randomSalaryQuantity);
			}
		};
	}

	//Generate a random number
	function getRandomInt(min, max) {
		return Math.random() * (max - min + 1) + min;
	}

	//Disable map Google Map functions
	function controlDisable() {
		map.disableDragging();
		map.disableDoubleClickZoom();
		map.disableContinuousZoom();
		map.disableGoogleBar();
		map.disableScrollWheelZoom();
		map.disablePinchToZoom();
	}

	//Controlling zooming on the Gmap.
	function controlZoom(zoomIn) {
		if (zoomIn == true) {
			if (computeSalary(true)) {
				changedZoom = changedZoom + 1;
				computeSalary(true);
			} 
			else {
				alert("You do not have enough earnable points");
			}

		} 
		else if (zoomIn == false) {
			if (computeSalary(false)) {
				changedZoom = changedZoom - 1;
				computeSalary(false);
			} 
			else {
				alert("You do not have enough earnable points");
			}
		} 
		else {
			changedZoom = zoom;
		}
		changeReq();
		document.getElementById("map_canvas").innerHTML = ('<IMG SRC="http://maps.googleapis.com/maps/api/staticmap?size=700x500&maptype='
				+ mapType
				+ '&zoom='
				+ changedZoom
				+ '\&markers=size:mid%7Ccolor:red%7C'
				+ parseFloat(changedY)
				+ ',' + parseFloat(changedX) + '&sensor=false" WIDTH=700 HEIGHT=500>');
	}

	//Check there is significant movement when the user's zoom value is at different scales.
	function zoomMultiplier() {
		if (changedZoom < 5) {
			return 1000;
		} 
		else if (changedZoom >= 5 && changedZoom < 10) {
			return 100;
		} 
		else if (changedZoom >= 10 && changedZoom < 15) {
			return 10;
		} 
		else {
			return 1;
		}
	}

	//Controlling moving around on the Gmap
	function advance(direction, value) {
		//movement depends on how far the user is zoomed into or away from the map.
		value = value * zoomMultiplier();
		if (computeSalary(true)) {
			if (direction == true) {
				changedY = parseFloat(changedY + value);
			} 
			else if (direction == false) {
				changedX = parseFloat(changedX + value);
			} 
			else {
				changedX = xRand;
				changedY = yRand;
			}
		} 
		else {
			alert("You do not have enough earnable points");
		}
		computeSalary(true);
		changeReq();
		document.getElementById("map_canvas").innerHTML = ('<IMG SRC="http://maps.googleapis.com/maps/api/staticmap?size=700x500&maptype='
				+ mapType
				+ '&zoom='
				+ changedZoom
				+ '\&markers=size:mid%7Ccolor:red%7C'
				+ parseFloat(changedY)
				+ ',' + parseFloat(changedX) + '&sensor=false" WIDTH=700 HEIGHT=500>');
	}

	//Compute current salary (earnable points) after each game function is used. Incorrect answers are included.
	function computeSalary(isSame) {
		if (isSame == true && salary >= 500) {
			salary = salary - 500;
			document.getElementById("game_salary").innerHTML = salary;
			return true;
		} 
		else if (salary >= 750) {
			salary = salary - 750;
			document.getElementById("game_salary").innerHTML = salary;
			return true;
		} 
		else if (salary <500){
			salary = 0;
			document.getElementById("game_salary").innerHTML = salary;
		}
		else {
			return false;
		}
	}

	//Check answer after a player has typed in their guess
	function checkAnswer() {
		var uAnswer = document.getElementById("user_answer").value;
		if (uAnswer.toLowerCase() == answer.toLowerCase()) {
			setWinnings();
			alert("Congratulations. You got it correct!");
			location.replace("followers.jsp");
		} 
		else {
			computeSalary(true);
			alert("Incorrect Answer");
			changeReq();
			deleteGameReq();
		}
	}

	//Use Letter Getter Item 
	function getLetter() {
		if (letterGetterQuantity > 0) {
			var curPos = parseInt(getRandomInt(0, lgAnswer.length - 1));
			var curLetter = lgAnswer.charAt(curPos);
			if (curLetter == '?') {
				getLetter();
			} 
			else {
				letterGetterQuantity = letterGetterQuantity - 1;
				lgAnswer = lgAnswer.substr(0, curPos) + '?'
						+ lgAnswer.substr((curPos + 1), lgAnswer.length);
				pos = parseInt(curPos + 1) + ', ' + pos;
				letter = curLetter + ', ' + letter;
				document.getElementById("hint").innerHTML = ('The letter '+ letter + ' at position ' + pos);
				document.getElementById("lg").innerHTML = ('Quantity = ' + letterGetterQuantity);
				changeItemsReq();
			}
		} 
		else {
			alert("No more of this item left");
		}
	}

	//Use ScreenShots Item
	function showScreenShots() {
		if (screenshotsQuantity > 0) {
			showSS = 1;
			screenshotsQuantity = screenshotsQuantity - 1;
			document.getElementById("ss").innerHTML = ('Quantity = ' + screenshotsQuantity);
			var w = window.open();
			w.document.open();
			w.document.write("<h1>Show Screenshots</h1>");
			w.document.write("<p id='createShots0'></p>");
			w.document.write("<p id='createShots90'></p>");
			w.document.write("<p id='createShots180'></p>");
			w.document.write("<p id='createShots270'></p>");
			var headingNum = 0;
			while (headingNum <= 340) {
				w.document.getElementById("createShots" + headingNum).innerHTML = ('<P><IMG SRC="http://maps.googleapis.com/maps/api/streetview?size=700x500&location='
						+ yRand + ',' + xRand + '&heading=' + headingNum + '&pitch=0&fov=180&sensor=false" WIDTH=700 HEIGHT=500></P>');
				headingNum += 90;
			}
			changeItemsReq();
			w.document.close();
		} 
		else {
			alert("No more of this item left");
		}
	}

	//Use randomize Salary Item
	function randomizeSalary() {
		if (randomSalaryQuantity > 0) {
			randomSalaryQuantity = randomSalaryQuantity - 1;
			document.getElementById("rs").innerHTML = ('Quantity = ' + randomSalaryQuantity);
			salary = Math.round(getRandomInt(0, (salary * 1.5)));
			document.getElementById("game_salary").innerHTML = salary;
			changeItemsReq();
		} else {
			alert("No more of this item left");
		}
	}

	//Quit game and return to Home page
	function quitGame() {
		//you need to redirect back to the lobby page and also want to also reset all the values.
		//need a xmlhttp connection because it effects the db.
		var uA = confirm("Would you like to quit the game?");
		if (uA) {
			deleteGameReq();
			location.replace("followers.jsp");
		}
	}