/*******************
 * Javascript file that connects to Twitter Authentication and displays the "Connect Button" for the index page.
 * Upon clicking the twitter button, the Twitter Authenitcation Sign In Popup will appear asking Twitter Users for their Twitter
 * Username and Password.
 * Users who sign in through Twitter Authentication are taken to the Sagasu user profile page and Followers Page.
 */

twttr.anywhere(function (T) {
    if (T.isConnected()) {
     	location.replace("followers.jsp");   	
    } 
    else {
      T("#twitter-connect-placeholder").connectButton({
    	  authComplete: function(user) {
    		  location.replace("followers.jsp");
      	},
      	signOut: function() {
      		location.replace("index.jsp");
      	}
    	});
    };
 });
