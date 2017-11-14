	var currentUser, screenName, profileImage, profileImageTag, userId, xmlHttpRequest, userPoints;
	/***
	 * Initialize startGame.js functions when page is loaded and user is connected, else return them to index page
	 */
	twttr.anywhere(function(T) {
				if (T.isConnected()) {
					//get Twitter values of user such as screen name, id, profileImageURL and display them
					currentUser = T.currentUser;
					screenName = currentUser.data('screen_name');
					profileImage = "https://api.twitter.com/1/users/profile_image?screen_name=" + screenName + "&size=bigger";
					userId = currentUser.data('id');
					profileImageTag = "<img width= 150 height=150 src='"+profileImage+"'/>";
					document.getElementById("userdetails").innerHTML = "<h3>" + screenName + "</h3>" + profileImageTag;
					//Tweet box for user
					twttr.anywhere(function(T) {
						T("#tbox").tweetBox({
							height : 50,
							width : 250,
							defaultContent : "#SAGASU410",
							label : ""
						});

					});
					sendRegReq();
					//sign user out and return user to index page
					twttr.anywhere(function(T) {
								document.getElementById("signout").onclick = function() {
									answer = confirm("Are you sure you want to sign out?");
									if (answer) {
										signoutReq();
										twttr.anywhere.signOut();
										location.replace("index.jsp");
									}
								};
							});
				} else {
					signoutReq();
					location.replace("index.jsp");
				}
			});

	/***
	 * Sign user out, return them to the homepage, and tell server to change loggedIn status of user to offline.
	 */
	function signoutReq() {
		var reqURL = "./ServletAccount"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("signout");
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			//do something with the response
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
			}
		};
	}

	/***
	 * Get from server the points and level of the User
	 */
	function sendRegReq() {
		var reqURL = "./ServletAccount"; //the name (URI) of your servlet
		createXmlHttpRequest();
		xmlHttpRequest.open("POST", reqURL, true);
		var iRequest = new Request;
		iRequest.addAction("register");
		iRequest.addParam("screen_Name", screenName);
		iRequest.addParam("user_Id", userId);
		xmlHttpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		xmlHttpRequest.send(iRequest.toString());
		xmlHttpRequest.onreadystatechange = function() { //this is used to listen for changes in the request's status
			//do something with the response
			if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status == 200) {
				var points, levels;
				var account = xmlHttpRequest.responseXML.getElementsByTagName("Account").item(0);
				points = account.getAttribute("userPoints");
				levels = account.getAttribute("userLevel");
				document.getElementById("pointsId").innerHTML = points;
				document.getElementById("userLevelId").innerHTML = levels;
			}
		};
	}