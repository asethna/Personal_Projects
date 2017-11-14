	var userIdArray = new Array();
	var userNameArray = new Array();
	var invited = "";
	var uId, uName, gId;

	function getFollowers(userId) {
		$.ajax({
					url : 'http://api.twitter.com/1/statuses/followers.json',
					data : {
						id : userId
					},
					dataType : 'jsonp',
					success : function(data) {
						var obj = eval(data);
						var stringOfIds = obj[0].id;
						var stringOfScreenNames = obj[0].screen_name;
						var stringOfPicURLs = obj[0].profile_image_url;
						for ( var i = 1; i < obj.length; i++) {
							stringOfIds += "," + obj[i].id;
							stringOfScreenNames += "," + obj[i].screen_name;
							stringOfPicURLs += "," + obj[i].profile_image_url;
						}		
						checkUserIds(stringOfIds, stringOfScreenNames, stringOfPicURLs);
					}
				});
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
				var account;
				account = xmlHttpRequest.responseXML.getElementsByTagName("Account").item(0);
				uId = account.getAttribute("userId");
				uName = account.getAttribute("userName");
				gId = account.getAttribute("gameSessionId");
				if (gId == "NONE") {
					getAccountReq();
				} 
			}
		};
	}
	
	//Sends a invite request to the follower and give them a game ID of the current game running 
	function sendReq(uName, uId, gId) {
		var reqURL = "./ServletCreateGame"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("multiplayer");
		iRequest.addParam("userId", uId);
		iRequest.addParam("userName", uName);
		iRequest.addParam("gameSessionId", gId);
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			//do something with the response
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
	}
	
	function checkUserIds(arrayString, arrayStringN, arrayStringP) {
		var reqURL = "./ServletAccount"; //the name (URI) of your servlet
		var xmlHttpRequest;
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("checkIds");
		var stringBuffer = arrayString
		iRequest.addParam("stringOfIds", stringBuffer);
		iRequest.addParam("stringOfScreenNames", arrayStringN);
		iRequest.addParam("stringOfPicURLs", arrayStringP);
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			//do something with the response
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
				var userStatusNodeList = xmlHttpRequest.responseXML.getElementsByTagName("UserStatus");
				$('#online').append('<tr><td width=50><button type="button" onClick="sendTweet()" id="ingameText">Invite</button></td><td width=50></td><td width=200 id="left"> User </td><td width=100> Status </td></tr>');
				$('#ingame').append('<tr><td width=50></td><td width=50></td><td width=200> </td><td width=100>  </td></tr>');
				$('#offline').append('<tr><td width=50></td><td width=50></td><td width=200>  </td><td width=100>  </td></tr>');
				$('#followers').append('<tr><td width=50></td><td width=50></td><td width=200>  </td><td width=100> </td></tr>');
				for ( var k = 0; k < userStatusNodeList.length; k++) {
					var followers = userStatusNodeList.item(k);
					var id = followers.getAttribute("userId");
					var screenName = followers.getAttribute("screenName");
					var picURLTag = followers.getAttribute("picURL");
					var profileImage = "<img width= 50 height=50 src='"+picURLTag+"'/>";
					var registered = followers.getAttribute("registered");
					var isLoggedIn = followers.getAttribute("loggedIn");
					var inGame = followers.getAttribute("inGame");
					var userLevel = followers.getAttribute("userLevel");
					var elementId = "#rowId" + k;
					var elementIdString = elementId.toString();
					if (registered == "true" && isLoggedIn == "true" && inGame == "false") {		
						// ONLINE AND NOT IN A GAME			
						$('#online')
						.append(
								'<tr><td> <INPUT TYPE="checkbox" NAME="toInvite" onclick="javascript:inviteUsers()" value="' + screenName+"_userId"+id+ '" /></td>' + 
								'<td>' + profileImage + '</td>' + 
								'<td id="followerEntry"><h3>' + screenName + '</h3>Level:' + userLevel + ' (' + convertLevelToGameMode(userLevel) +')'+ '</td>' + 
								'<td><p style="color: #0099FF;">Online</p></td>');
					} 
					else if (registered == "true" && isLoggedIn == "true" && inGame == "true") {
						// ONLINE AND IN GAME
						$('#ingame')
						.append(
								'<tr><td></td>' + 
								'<td>' + profileImage + '</td>' + 
								'<td id="followerEntry"><h3>' + screenName + '</h3>Level:' + userLevel + ' (' + convertLevelToGameMode(userLevel) +')'+ '</td>' + 
								'<td><p style="color: #00FF00;">In-Game</p></td>');
					} 
					else if(registered == "true" && isLoggedIn == "false"	&& inGame == "false") {
						//OFFLINE
						$('#offline')
						.append(
								'<tr><td></td>' + 
								'<td>' + profileImage + '</td>' + 
								'<td id="followerEntry"><h3>' + screenName + '</h3>Level:' + userLevel + ' (' + convertLevelToGameMode(userLevel) +')'+ '</td>' + 
								'<td><p style="color: #C0C0C0;">Offline</p></td>');		
					} 
					else if(registered == "false"){
						$('#followers')
						.append(
								'<tr><td></td>' + 
								'<td>' + profileImage + '</td>' + 
								'<td id="left">' + screenName + '</td>');				
					}
				
				}
			}
		};
	}

	function parseInviteValues(aInvite) {
		var len = aInvite.length;
		var start = aInvite.indexOf('_userId');
		var last = start+7;
		var userName = aInvite.substring(0, start);
		var userId = aInvite.substring(last, len);
		sendReq(userName, userId, gId);
		return userName;
	}

	function inviteUsers() {
		invited = "";
		for (i = 0; i < document.invite.toInvite.length; i++) {
			if (document.invite.toInvite[i].checked == true) {
				var  temp = parseInviteValues(document.invite.toInvite[i].value);
				//have to check if it just runs once...
				if (i == 0) {
					invited = temp;
				} else {
					invited = invited + " @"
							+ temp;
				}
			}
		}
	}

	function sendTweet() {
		window.open('https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Ftwitter.com%2Fabout%2Fresources%2Ftweetbutton&source=tweetbutton&text=Join+the+game%3A&url=https%3A%2F%2F198.162.45.147:8080/OnlineGameSagasu/lobby.jsp%2F&via='
								+ invited,
						'new-window',
						'directories, status, scrollbars, resizable, dependent, width=500, height=200, left=0, top=0');
	}