	var point, streetviewClient, map, zoom, xRand, yRand, changedX, changedY, changedZoom, answer, location1, uImage, uId, uName, gId, salary, uLevel, inG;

	/***
	 * Initialize startGame.js functions when page is loaded and user is connected, else return them to index page
	 */
	function init() {
		twttr.anywhere(function(T) {
			if (T.isConnected()) {
				if (GBrowserIsCompatible()) {
					streetviewClient = new GStreetviewClient();
					getAccountReq();
				}
			} else {
				//signoutReq();
				//location.replace("index.jsp");
			}
		});
	}

	function createNewMap() {
		yRand = getRandomInt(25, 40);
		xRand = getRandomInt(-180, -40);
		zoom = 17;
		point = new GLatLng(yRand, xRand);
		streetviewClient.getNearestPanorama(point, streetviewclient_callback);
		changedX = xRand;
		changedY = yRand;
		changedZoom = zoom;
		if (uLevel < 2) {
			salary = 10000;
		} else {
			salary = 20000;
		}
	}

	//given a point, find if there is a streetview or panorama view available.
	function streetviewclient_callback(streetviewdata) {
		//set everything is panorama view is available.
		if (streetviewdata.code == 200) {
			var geocoder = new GClientGeocoder();
			geocoder.getLocations(point, function(response) {
				location1 = response.Placemark[0].address;
				sendReq();
			});
			//there was no panorama view available at the current point so you would generate anew point
		} 
		else {
			createNewMap();
		}
	}

	function sendReq() {
		var reqURL = "./ServletCreateGame"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("createGame");
		iRequest.addParam("yCoor", yRand);
		iRequest.addParam("xCoor", xRand);
		iRequest.addParam("zoom", zoom);
		iRequest.addParam("changedY", changedY);
		iRequest.addParam("changedX", changedX);
		iRequest.addParam("changedZoom", changedZoom);
		iRequest.addParam("location", location1);
		iRequest.addParam("userId", uId);
		iRequest.addParam("userName", uName);
		iRequest.addParam("gameSessionId", gId);
		iRequest.addParam("userLevel", uLevel);
		document.getElementById("startGame").innerHTML = ('<a href ="startGame.jsp">Start Game </a>');
		document.getElementById("invitation").innerHTML = ('<a href = "followersInvite.jsp">Invite Friends </a>');
		document.getElementById("userName").innerHTML = uName;
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			//do something with the response
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
	}
	
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
	
	function quitGame() {
		//you need to redirect back to the lobby page and also want to also reset all the values.
		//need a xmlhttp connection because it effects the db.
		var uA = confirm("Would you like to quit the game?");
		if (uA) {
			deleteGameReq();
			location.replace("followers.jsp");
		}
	}

	function getAccountReq() {
		var reqURL = "./ServletAccount"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("retrieveData");
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
				var account;//, userName, userPic, userId;
				account = xmlHttpRequest.responseXML.getElementsByTagName("Account").item(0);
				uId = account.getAttribute("userId");
				uName = account.getAttribute("userName");
				gId = account.getAttribute("gameSessionId");
				uLevel = account.getAttribute("userLevel");
				inG = account.getAttribute("inGame");
				join = account.getAttribute("invited");		
				if (gId == "NONE") {
					createNewMap();
				} 
				else {
					if (join == 1) {
						var response = confirm("Do you want to join the multiplayer game?");
						if (response) {
							createNewMap();
							location.replace("startGame.jsp");
						} 
						else {
							inG = 0;
							location.replace("lobby.jsp");
						}
					} 
					else {
						var response = confirm("Do you want to continue your previous game?");
						if (response) {
							location.replace("startGame.jsp");
						} 
						else {
							inG = 0;
							deleteGameReq();
							location.replace("lobby.jsp");
						}
					}
				}			
				if (uLevel > 0 && uLevel <= 10) {
					document.getElementById("ld").innerHTML = ('<td onclick="javascript:updateGameModeImage(1)"><a href="#">Landmark</a></td>');
				} if (uLevel > 10 && uLevel <= 20) {
					document.getElementById("sp").innerHTML = ('<td onclick="javascript:updateGameModeImage(2)"><a href="#">State/Province</a></td>');
				} if (uLevel > 20) {
					document.getElementById("ct").innerHTML = ('<td onclick="javascript:updateGameModeImage(3)"><a href="#">City</a></td>');
					
				}
			}
		};
	}

	//Generate a random number
	function getRandomInt(min, max) {
		return Math.random() * (max - min + 1) + min;
	}
	
	function updateGameModeImage(gameMode) {
		if (gameMode == 1) {		
			document.getElementById("gameModePicture").innerHTML = (gameModePicture.src="./images/landmarks.png");
		} 
		else if (gameMode == 2) {
			document.getElementById("gameModePicture").innerHTML = (gameModePicture.src="./images/state.png");
		} 
		else if (gameMode == 3) {
			document.getElementById("gameModePicture").innerHTML = (gameModePicture.src="./images/city.png");
		}
	}
	
	function showmenu(elmnt)
	{
		document.getElementById(elmnt).style.visibility="visible";
	}
	
	function hidemenu(elmnt)
	{
		document.getElementById(elmnt).style.visibility="hidden";
	}