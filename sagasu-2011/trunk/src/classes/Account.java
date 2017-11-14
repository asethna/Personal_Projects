/**
 * 
 */
package classes;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import managers.DBManager;

/**
 * @author Afsha Sethna, Edwin Chan and Beom Soo Kim.
 * 
 */
public class Account {

	private String userName, userId, gameSessionId;
	private int loggedIn, inGame, invited;
	private int userPoints, solvedMaps, userLevel, gameMode;
	private DBManager dbManager;
	private Inventory inventory;

	/**
	 * Constructor for Account class
	 */
	public Account() {
		dbManager = DBManager.getInstance();
	}

	/**
	 * Constructor for Account class where we can specify a user.
	 * 
	 * @param userId
	 *            - the id of the user.
	 * @param userName
	 *            - the name of the user.
	 */
	public Account(String userId, String userName) {
		dbManager = DBManager.getInstance();
		this.userId = userId;
		this.userName = userName;
	}

	/**
	 * Set the game session id and if the user has been invited or not. And
	 * updates those changes into the database.
	 * 
	 * @param gId
	 *            - game session id.
	 * @param invite
	 *            - if the user has been invited (for multi-player).
	 */
	public void setGameSKey_Invited(String gId, int invite) {
		setGameSessionId(gId);
		setInvited(invite);
		updateGameSessionInfo();
	}

	/***
	 * Registers user to an Sagasu Account by storing user id and screen name to
	 * Database Other values of Accounts such as Friends Id can be null. User
	 * will also be noted as logged in, not in game when registering. User
	 * Points and Levels will be set to 0.
	 * 
	 * @return boolean value of whether the account was created (true) or not
	 *         (false).
	 */
	public boolean createUserToDB() {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		// insert a new row into the tableAccount table.
		try {
			String query = "INSERT INTO tableAccount(userId, userName, gameSessionId, loggedIn, inGame, userPoints, solvedMaps, userLevel, gameMode, invited)"
					+ " VALUES ('"
					+ this.userId
					+ "','"
					+ this.userName
					+ "','"
					+ this.gameSessionId
					+ "','"
					+ this.loggedIn
					+ "','"
					+ this.inGame
					+ "','"
					+ this.userPoints
					+ "','"
					+ this.solvedMaps
					+ "','"
					+ this.userLevel
					+ "','"
					+ this.gameMode + "','" + this.invited + "');";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			pst.executeUpdate();

		} catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

		dbManager.freeConnection(conn);
		return false;
	}

	/**
	 * Update the game session id and the invited value for a user in the
	 * database.
	 * 
	 * @return false if the game session information was not able to update.
	 */
	public boolean updateGameSessionInfo() {
		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		//Update the gameSessionId and the invited from a user in the tableAccount table.
		try {
			String query = "UPDATE tableAccount SET gameSessionId = '"
					+ gameSessionId + "', " + "invited = '" + invited
					+ "' WHERE userId = '" + userId + "';";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			pst.executeUpdate();


		} catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

		dbManager.freeConnection(conn);
		return false;

	}

	/**
	 * Update account information for the user into the database.
	 * 
	 * @return false if the game session information was not able to update.
	 */
	public boolean updateAccountInfoToDB() {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		// Update the whole row of a user in the tableAccount table.
		try {
			String query = "UPDATE tableAccount SET userName ='" + userName
					+ "', " + " gameSessionId = '" + gameSessionId + "', "
					+ "loggedIn = '" + loggedIn + "'," + "inGame = '" + inGame
					+ "'," + "userPoints = '" + userPoints + "',"
					+ "solvedMaps = '" + solvedMaps + "'," + "userLevel = '"
					+ userLevel + "'," + "gameMode = '" + gameMode
					+ "', invited = '" + invited + "' WHERE userId = '"
					+ userId + "';";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			pst.executeUpdate();


		} catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

		dbManager.freeConnection(conn);
		return false;
	}

	/**
	 * Get the Account information from the database of a user.
	 * 
	 * @return false if the game session information was not able to update.
	 */
	public boolean getAccountInfoFromDB() {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;

		//Get all the rows of the table and set them to the model values.
		try {
			String query = "SELECT * FROM tableAccount WHERE userId = '"
					+ userId + "';";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			rs = pst.executeQuery();
			rs.next();
			this.userId = rs.getString(1);
			System.out.println(this.userId);
			this.userName = rs.getString(2);
			System.out.println(this.userName);
			this.gameSessionId = rs.getString(3);
			System.out.println(this.gameSessionId);
			this.loggedIn = rs.getInt(4);
			System.out.println(this.loggedIn);
			this.inGame = rs.getInt(5);
			System.out.println(this.inGame);
			this.userPoints = rs.getInt(6);
			System.out.println(this.userPoints);
			this.solvedMaps = rs.getInt(7);
			System.out.println(this.solvedMaps);
			this.userLevel = rs.getInt(8);
			System.out.println(this.userLevel);
			this.gameMode = rs.getInt(9);
			System.out.println(this.gameMode);
			this.invited = rs.getInt(10);
			System.out.println(this.invited);
		}

		catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

		dbManager.freeConnection(conn);
		return false;
	}

	/***
	 * Embed all Account fields into a string in XML format
	 * 
	 * @return a string in XML format
	 */
	public String toXMLContent() {

		// getAccountInfoFromDB();

		String loggedInFormatted, inGameFormatted;
		loggedInFormatted = this.loggedIn+"";
		inGameFormatted = inGame+"";

		userId = Utility.processXMLEscapeChars(userId);
		userName = Utility.processXMLEscapeChars(userName);
		gameSessionId = Utility.processXMLEscapeChars(gameSessionId);
		loggedInFormatted = Utility.processXMLEscapeChars(loggedInFormatted);
		inGameFormatted = Utility.processXMLEscapeChars(inGameFormatted);

		String result = "\t<Account" + " userId=\"" + userId + "\""
				+ " userName=\"" + userName + "\"" + " gameSessionId=\""
				+ gameSessionId + "\"" + " loggedIn=\"" + loggedInFormatted
				+ "\"" + " inGame=\"" + inGameFormatted + "\""
				+ " userPoints=\"" + userPoints + "\"" + " solvedMaps=\""
				+ solvedMaps + "\"" + " userLevel=\"" + userLevel + "\""
				+ " gameMode=\"" + gameMode + "\"" + " invited=\"" + invited
				+ "\" >\n";

		result = result.concat("\t</Account>\n");
		System.out.println("Account Object XML:\n" + result);
		return result;
	}

	/**
	 * @return the username
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param username
	 *            the username to set
	 */
	public void setUserName(String username) {
		this.userName = username;
	}

	/**
	 * @return the userId
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * @param userId
	 *            the userId to set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * @return the sessionKey
	 */
	public String getGameSessionId() {
		return gameSessionId;
	}

	/**
	 * @param sessionKey
	 *            the sessionKey to set
	 */
	public void setGameSessionId(String gameSessionId) {
		this.gameSessionId = gameSessionId;
	}

	/**
	 * @return the invited
	 */
	public int getInvited() {
		return invited;
	}

	/**
	 * @return the gameMode
	 */
	public int getGameMode() {
		return gameMode;
	}

	/**
	 * @param gameMode
	 *            the gameMode to set
	 */
	public void setGameMode(int gameMode) {
		this.gameMode = gameMode;
	}

	/**
	 * @return the inventory
	 */
	public Inventory getInventory() {
		return inventory;
	}

	/**
	 * @param inventory
	 *            the inventory is set
	 */
	public void setInventory(Inventory inventory) {
		this.inventory = inventory;
	}

	/**
	 * @return the loggedIn
	 */
	public int getLoggedIn() {
		return loggedIn;
	}

	/**
	 * @return the inGame
	 */
	public int getInGame() {
		return inGame;
	}

	/**
	 * @param invited
	 *            the invited is set
	 */
	public void setInvited(int invited) {
		this.invited = invited;
	}

	/**
	 * @param loggedIn
	 *            the loggedIn to set
	 */
	public void setLoggedIn(int loggedIn) {
		this.loggedIn = loggedIn;
	}

	/**
	 * @param inGame
	 *            the inGame to set
	 */
	public void setInGame(int inGame) {
		this.inGame = inGame;
	}

	/**
	 * @return the userPoints
	 */
	public int getUserPoints() {
		return userPoints;
	}

	/**
	 * @param userPoints
	 *            the userPoints to set
	 */
	public void setUserPoints(int userPoints) {
		this.userPoints = userPoints;
	}

	/**
	 * @return the solvedMaps
	 */
	public int getSolvedMaps() {
		return solvedMaps;
	}

	/**
	 * @param solvedMaps
	 *            the solvedMaps to set
	 */
	public void setSolvedMaps(int solvedMaps) {
		this.solvedMaps = solvedMaps;
	}

	/**
	 * @return the userLevel
	 */
	public int getUserLevel() {
		return userLevel;
	}

	/**
	 * @param userLevel
	 *            the userLevel to set
	 */
	public void setUserLevel(int userLevel) {
		this.userLevel = userLevel;
	}

	/**
	 * This method will take action when the user wins a game.
	 * @param points the user points after game.
	 * @param userLevel the users level after game.
	 * @param inGame the users inGame (which will be false) after the game.
	 * @param solvedMaps the users number of solved maps after the game.
	 */
	public void setWinnings(int points, int userLevel, int inGame,
			int solvedMaps) {
		setUserPoints(points);
		setUserLevel(userLevel);
		setInGame(inGame);
		setSolvedMaps(solvedMaps);
		updateAccountInfoToDB();
	}

	/**
	 * If the userID stored in the Servlet is equal to the account in the model,
	 * then this Account is Legitimate.
	 * 
	 * @param id
	 *            The id from the ServletAccount
	 * @return true if Account object is Legitimate, false otherwise
	 */
	public boolean isLegit(String id) {
		if (id.equals(this.userId)) {
			return true;
		} else {
			return false;
		}
	}
}
