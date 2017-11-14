var userIdArray = new Array();
var userNameArray = new Array();


/***
 * Initialize startGame.js functions when page is loaded and user is connected, else return them to index page
 */
twttr.anywhere(function(T) {
	if (T.isConnected()) {
		currentUser = T.currentUser;
		userId = currentUser.data('id');
		getFollowers(userId);
	}
});

/***
 * Request from Twitter Authentication to retrieve data of all the followers of a user
 * @param userId userId of the user to use to retrieve followers' data
 */
function getFollowers(userId){
    $.ajax({
        url: 'http://api.twitter.com/1/statuses/followers.json',
        data: {id: userId},
        dataType: 'jsonp',
        success: function(data) {
        		var obj = eval (data);
        		var stringOfIds = obj[0].id;
        		var stringOfScreenNames = obj[0].screen_name;
        		var stringOfPicURLs = obj[0].profile_image_url;
        		for(var i=1; i<obj.length; i++){
        			stringOfIds += "," + obj[i].id;
        			stringOfScreenNames += "," +obj[i].screen_name;
        			stringOfPicURLs += "," +obj[i].profile_image_url;
        		}
        		//alert(stringOfIds);
        		//alert(stringOfScreenNames);
        		//alert(stringOfPicURLs);
        		checkUserIds(stringOfIds, stringOfScreenNames, stringOfPicURLs);
        }
    });  
}

/***
 * Get the statuses for each of the user's followers and display them. Statuses include online, offline, in-game, and unregistered
 * @param arrayString array containing followers' ids
 * @param arrayStringN array containing followers' screenNames
 * @param arrayStringP array containining followers' urls to their twitter profile pictures
 */
function checkUserIds(arrayString, arrayStringN, arrayStringP) {
   	var reqURL = "./ServletAccount";                //the name (URI) of your servlet
	createXmlHttpRequest();
    xmlHttpRequest.open("POST", reqURL, true);
    var iRequest = new Request;
	iRequest.addAction("checkIds");
	iRequest.addParam("stringOfIds", arrayString);
	iRequest.addParam("stringOfScreenNames", arrayStringN);
	iRequest.addParam("stringOfPicURLs", arrayStringP);
	xmlHttpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xmlHttpRequest.send(iRequest.toString());
    xmlHttpRequest.onreadystatechange = function(){  //this is used to listen for changes in the request's status
        //do something with the response
						if (xmlHttpRequest.readyState == 4 & xmlHttpRequest.status ==200) {
							var userStatusNodeList = xmlHttpRequest.responseXML.getElementsByTagName("UserStatus"); 
							$('#online')
									.append('<tr><td width=50></td><td width=50></td><td width=200 id="left"> User </td><td width=100> Status </td></tr>');
							$('#ingame')
							.append('<tr><td width=50></td><td width=50></td><td width=200> </td><td width=100>  </td></tr>');
							$('#offline')
							.append('<tr><td width=50></td><td width=50></td><td width=200>  </td><td width=100>  </td></tr>');
							$('#followers')
							.append('<tr><td width=50></td><td width=50></td><td width=200>  </td><td width=100> </td></tr>');
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
								// ONLINE AND NOT IN A GAME
								if (registered == "true" && isLoggedIn == "true" && inGame == "false") {									
									$('#online')
									.append(
											'<tr><td width=50></td>' + 
											'<td width=50>' + profileImage + '</td>' + 
											'<td id="followerEntry" width=200><h3>' + screenName + '</h3>Level:' + userLevel + ' (' + convertLevelToGameMode(userLevel) +')'+ '</td>' + 
											'<td width=100><p style="color: #0099FF;">Online</p></td>');
								} 
								// ONLINE AND IN GAME	
								else if (registered == "true" && isLoggedIn == "true" && inGame == "true") {	
									$('#ingame')
									.append(
											'<tr><td width=50></td>' + 
											'<td width=50>' + profileImage + '</td>' + 
											'<td id="followerEntry" width=200><h3>' + screenName + '</h3>Level:' + userLevel +' (' + convertLevelToGameMode(userLevel) +')'+ '</td>' + 
											'<td width=100><p style="color: #00FF00;">In-Game</p></td>');
								} 
								//OFFLINE
								else if(registered == "true" && isLoggedIn == "false"	&& inGame == "false") {
									$('#offline')
									.append(
											'<tr><td width=50></td>' + 
											'<td width=50>' + profileImage + '</td>' + 
											'<td id="followerEntry" width=200><h3>' + screenName + '</h3>Level:' + userLevel +' (' + convertLevelToGameMode(userLevel) +')'+ '</td>' + 
											'<td width=100><p style="color: #C0C0C0;">Offline</p></td>');		
								}
								//NOT REGISTERED
								else if(registered == "false"){
									$('#followers')
									.append(
											'<tr><td width=50></td>' + 
											'<td width=50>' + profileImage + '</td>' + 
											'<td id="left" width=200>' + screenName + '</td>');
									
								}
							}
						}
					};
	        		checkUserIds(stringOfIds, stringOfScreenNames, stringOfPicURLs);
				}