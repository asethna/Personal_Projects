package classes;

/**
 * @author Edwin Chan
 */
public class UserStatus {
	String userId, screenName, picURL;
	int userLevel, inGame, loggedIn;
	boolean registered;
	
	/**
	 * Constructor for the UserStatus class
	 */
	public UserStatus(){
		this.userId = "";
		this.screenName = "";
		this.picURL = "";
		this.registered = false;
		this.inGame= 0;
		this.loggedIn = 0;
		this.userLevel = 1;
	}
	
	/**
	 * Constructor for the UserStatus class with specific values set.
	 * @param userId - user Identification
	 * @param userName - user name
	 * @param picURL - user image URL
	 * @param registered - user registered value (true if registered and false if not)
	 * @param loggedIn - user's loggedIn value (true if user logged in and false if not)
	 * @param inGame - user's inGame value (true if the user is in a game and false if not)
	 * @param userLevel - is the current level of the user.
	 */
	public UserStatus(String userId, String userName, String picURL, boolean registered, int loggedIn, int inGame, int userLevel){
		this.userId = userId;
		this.screenName = userName;
		this.picURL = picURL;
		this.registered = registered;
		this.inGame = inGame;
		this.loggedIn = loggedIn;
		this.userLevel = userLevel;
	}

	/***
	 * Embed all Account fields into a string in XML format
	 * @return a string in XML format
	 */
	public String toXMLContent(){		
		userId = Utility.processXMLEscapeChars(userId);
	
		String result =  "\t<UserStatus" +
		" userId=\"" 				+ userId + "\"" +
		" screenName=\"" 			+ screenName + "\"" +
		" picURL=\"" 				+ picURL + "\"" +
		" registered=\"" 			+ registered + "\"" +
		" loggedIn=\"" 				+ loggedIn + "\"" +
		" inGame=\"" 				+ inGame + "\"" +
		" userLevel=\"" 			+ userLevel + "\" >\n";		
		
		result = result.concat("\t</UserStatus>\n");		
		System.out.println("UserStatus Object XML:\n" + result);		
		return result;
	}

	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @return the screenName
	 */
	public String getScreenName() {
		return screenName;
	}

	/**
	 * @return the picURL
	 */
	public String getPicURL() {
		return picURL;
	}

	/**
	 * @return the userLevel
	 */
	public int getUserLevel() {
		return userLevel;
	}

	/**
	 * @return the registered
	 */
	public boolean isRegistered() {
		return registered;
	}

	/**
	 * @return the inGame
	 */
	public int isInGame() {
		return inGame;
	}

	/**
	 * @return the loggedIn
	 */
	public int isLoggedIn() {
		return loggedIn;
	}

	/**
	 * @param userId the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * @param screenName the screenName to set
	 */
	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}

	/**
	 * @param picURL the picURL to set
	 */
	public void setPicURL(String picURL) {
		this.picURL = picURL;
	}

	/**
	 * @param userLevel the userLevel to set
	 */
	public void setUserLevel(int userLevel) {
		this.userLevel = userLevel;
	}

	/**
	 * @param registered the registered to set
	 */
	public void setRegistered(boolean registered) {
		this.registered = registered;
	}

	/**
	 * @param inGame the inGame to set
	 */
	public void setInGame(int inGame) {
		this.inGame = inGame;
	}

	/**
	 * @param loggedIn the loggedIn to set
	 */
	public void setLoggedIn(int loggedIn) {
		this.loggedIn = loggedIn;
	}
		
}
