package classes;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import managers.DBManager;

/**
 * @author Afsha Sethna
 * 
 */
public class Game {

	private static Game instance;
	private int salary, streetLabels, showSS;
	private String gameSessionId, answer, address, city, region, letterGetter,
			letterGetter_letter, letterGetter_pos;
	private MapPegman map;
	private DBManager dbManager;

	public Game() {
		this.letterGetter = "";
		this.letterGetter_letter = "";
		this.letterGetter_pos = "";
		this.streetLabels = 0;
		this.showSS = 0;
		dbManager = DBManager.getInstance();
		map = new MapPegman();
		this.gameSessionId = "NONE";
		this.salary = 10000;
		// answer = "";
	}

	/**
	 * Since each player can only have one instance of a game running then we
	 * made this class into a singleton, where it checks if the user is already
	 * playing a game then they cannot initiate another.
	 * 
	 * @return an instance of the game class
	 */
	public static synchronized Game getInstance() {
		if (null == instance) {
			instance = new Game();
		}
		return instance;
	}

	/**
	 * @return the salary
	 */
	public int getSalary() {
		return salary;
	}

	/**
	 * @return the map
	 */
	public MapPegman getMap() {
		return map;
	}

	/**
	 * @return the gameSessionId
	 */
	public String getGameSessionId() {
		return gameSessionId;
	}

	/**
	 * @return the answer
	 */
	public String getAnswer() {
		return answer;
	}

	/**
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @return the city
	 */
	public String getCity() {
		return city;
	}

	/**
	 * @return the region
	 */
	public String getRegion() {
		return region;
	}

	/**
	 * Returns the letters that the user has already received.
	 * 
	 * @return the letterGetter_letter
	 */
	public String getLetterGetter_letter() {
		return letterGetter_letter;
	}

	/**
	 * Modifies the letters the user has asked for.
	 * 
	 * @param letterGetter_letter
	 *            is set
	 */
	public void setLetterGetter_letter(String letterGetter_letter) {
		this.letterGetter_letter = letterGetter_letter;
	}

	/**
	 * Returns the positions for the letters that the user has already received.
	 * 
	 * @return the letterGetter_pos
	 */
	public String getLetterGetter_pos() {
		return letterGetter_pos;
	}

	/**
	 * Modifies the positions of the letters the user has asked for.
	 * 
	 * @param letterGetter_pos
	 *            is set
	 */
	public void setLetterGetter_pos(String letterGetter_pos) {
		this.letterGetter_pos = letterGetter_pos;
	}

	/**
	 * Gets the street labels - is a boolean value, if the user has activated
	 * the streetLabel item then it is set true then they can see the street
	 * labels otherwise not.
	 * 
	 * @return streetLables
	 */
	public int isStreetLabels() {
		return streetLabels;
	}

	/**
	 * Sets the street labels - is a boolean value, if the user has activated
	 * the streetLabel item then it is set true then they can see the street
	 * labels otherwise not.
	 * 
	 * @param streetLabels
	 *            is set
	 */
	public void setStreetLabels(int streetLabels) {
		this.streetLabels = streetLabels;
	}

	/**
	 * Gets the show screen shot (ShowSS) - is a boolean value, if the user has
	 * activated the ShowSS item then it is set true then they can see the
	 * screen shots otherwise not.
	 * 
	 * @return isShowSS
	 */
	public int isShowSS() {
		return showSS;
	}

	/**
	 * Gets the show screen shot (ShowSS) - is a boolean value, if the user has
	 * activated the ShowSS item then it is set true then they can see the
	 * screen shots otherwise not.
	 * 
	 * @param showSS
	 *            is set
	 */
	public void setShowSS(int showSS) {
		this.showSS = showSS;
	}

	/**
	 * Modified versions of the answer and replaces the answer with ?
	 * when the user invokes the letterGetter item.
	 * @return the letterGetter
	 */
	public String getLetterGetter() {
		return letterGetter;
	}

	/**
	 * Sets the modified version of the answer and replaces the answer with ?
	 * when the user invokes the letterGetter item.
	 * @param letterGetter is set
	 */
	public void setLetterGetter(String letterGetter) {
		this.letterGetter = letterGetter;
	}

	/**
	 * The address - street name of where the pegman is located.
	 * @param address
	 *            the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * Sets the city - the city of where the pegman is located
	 * @param city
	 *            the city to set
	 */
	public void setCity(String city) {
		this.city = city;
	}

	/**
	 * Sets the region - the state/province the pegman is located
	 * @param region
	 *            the region to set
	 */
	public void setRegion(String region) {
		this.region = region;
	}

	/**
	 * set The current type of location the user is trying identify
	 * @param answer
	 *            the answer to set
	 */
	public void setAnswer(String answer) {
		this.answer = answer;
	}

	/**
	 * Sets the current gameSessionId of the user.
	 * @param gameSessionId
	 *            the gameSessionId to set
	 */
	public void setGameSessionId(String gameSessionId) {
		this.gameSessionId = gameSessionId;
	}

	/**
	 * Set the instance of the current Game - this is invoked when the user signs out or quits a game.
	 * @param instance
	 *            the instance to set
	 */
	public static void setInstance(Game instance) {
		Game.instance = instance;
	}

	/**
	 * Sets the salary (current score) the user can earn.
	 * @param salary
	 *            the salary to set
	 */
	public void setSalary(int salary) {
		this.salary = salary;
	}

	/**
	 * Association to the pegman class.
	 * @param map
	 *            the map to set
	 */
	public void setMap(MapPegman map) {
		this.map = map;
	}

	/**
	 * This method take into a location and parses it into 3 different
	 * categories (address(street), city, or region).
	 * 
	 * @param location
	 *            the location of the map.
	 */
	public void parseAnswer(String location) {
		int count = 0;
		int start = 0;
		System.out.println("COUNT IS " + count);
		System.out.println("START IS " + start);
		Utility ut = new Utility();
		System.out.println("Utilities created");
		System.out.println("*********LOCATION IS " + location);
		System.out.println("*********LOCATION LEN IS " + location.length());
		for (int currIndex = 0; currIndex < location.length(); currIndex++) {
			System.out.println("INDEX IS " + currIndex);
			System.out.println("BOOL IS " + location.charAt(currIndex));
			if (location.charAt(currIndex) == ',') {
				System.out.println("INDEX IS " + currIndex);
				if (count == 0) {
					System.out.println("COUNT IS " + count);
					start = currIndex + 2;
					System.out.println("address is set");
					setAddress(location.substring(0, currIndex).replaceAll(
							"[,\\d,\\-,\\s\\^N\\^S\\^E\\^W]+", ""));
				}
				if (count == 1) {
					System.out.println("COUNT IS " + count);
					setCity(location.substring(start, currIndex));
					System.out.println("city is set");
					setRegion(ut.lookUpRegion(location.substring(currIndex + 2,
							currIndex + 4)));
					System.out.println("region is set");
				}
				count++;
			}
			System.out.println(getCity() + ", " + getRegion());
		}

	}

	/**
	 * This method will be called when a user starts a game by either clicking
	 * "start game" or "invite friends"
	 * 
	 * @param x
	 *            the x coordinate of the map
	 * @param y
	 *            the y coordinate of the map
	 * @param z
	 *            the zoom on the map
	 * @param l
	 *            the location of the map
	 * @param gameType
	 *            if the game is a single player or multiplayer game.
	 * @param gId
	 *            is the id of a game
	 */
	public void startGame(String uId, double y, double x, int z, String l,
			String gId, int level) {

		System.out.println(l);

		map.setyCoor(y);
		map.setChangedY(y);

		map.setxCoor(x);
		map.setChangedX(x);

		map.setZoom(z);
		map.setChangedZoom(z);

		map.setLocation(l);

		System.out.println("LEVEL IS: " + level);

		parseAnswer(l);
		System.out.println(getRegion() + ", " + getCity());

		if (level > 0 && level <= 10) {
			System.out.println("setting landmark");
			setAnswer(l);
		} else if (level > 10 && level <= 20) {
			System.out.println("setting region");
			setAnswer(getRegion());
			System.out.println(getRegion() + ", " + getCity());
			setAnswer(region);
			System.out.println(getRegion() + ", " + getCity());
			setAnswer(this.region);
			System.out.println(getRegion() + ", " + getCity());
		} else if (level > 20) {
			System.out.println("setting city");
			setAnswer(getCity());
			System.out.println(getRegion() + ", " + getCity());
			setAnswer(city);
			System.out.println(getRegion() + ", " + getCity());
			setAnswer(this.city);
			System.out.println(getRegion() + ", " + getCity());
		}

		System.out.println("****************ANSWER:" + this.answer
				+ "******************");

		System.out.println("I am setting the game session keys");
		map.setGameSessionId(gId);
		this.gameSessionId = gId;
		System.out.println("Set them: " + getGameSessionId() + ", in map: "
				+ map.getGameSessionId() + ", in map with game: "
				+ getMap().getGameSessionId());

		///update to the database.
		createGameInfoToDB(uId);
		map.createMapInfoToDB(uId);
	}

	/**
	 * When the user moves with the map this method is invoked.
	 * @param uId - the user Id
	 * @param y - the y coordinates of the map
	 * @param x - the x coordinates of the map
	 * @param z - the zoom of the map
	 * @param salary - the current score of the game.
	 */
	public void changeCoordinates(String uId, double y, double x, int z,
			int salary) {
		System.out
				.println("<-------------------------------------------IN GAME CLASS------------------------------------------->");
		map.setChangedY(y);
		map.setChangedX(x);
		map.setChangedZoom(z);
		this.salary = salary;
		//update the changes the tableGame and tableMapPegman
		updateGameInfoToDB(uId);
		map.updateMapInfoToDB(uId);
	}

	/**
	 * When the user invokes the use of any of the items this method gets invokes.
	 * @param uId - the user Id.
	 * @param itm1 - setting the letterGetter item
	 * @param itm2 - setting the letterGetter_letter item
	 * @param itm3 - setting the letterGetter_pos item
	 * @param itm4 - setting the streetLables item
	 * @param itm5 - setting the showSS item
	 */
	public void changeItemUsage(String uId, String itm1, String itm2,
			String itm3, int itm4, int itm5) {
		System.out.println("What did u get: " + itm1 + ", " + itm2 + ", "
				+ itm3 + ", " + itm4 + ", " + itm5);
		this.letterGetter = itm1;
		this.letterGetter_letter = itm2;
		this.letterGetter_pos = itm3;
		this.streetLabels = itm4;
		this.showSS = itm5;
		//update the tableGame table.
		updateGameInfoToDB(uId);
	}

	/**
	 * Delete the game by setting everything to the initial value.
	 * @param id - the user id.
	 */
	public void deleteGame(String id) {
		this.letterGetter = "";
		this.letterGetter_letter = "";
		this.letterGetter_pos = "";
		this.streetLabels = 0;
		this.showSS = 0;
		dbManager = DBManager.getInstance();
		map = new MapPegman();
		this.gameSessionId = "NONE";
		this.salary = 10000;
		answer = "";
		getMap().setxCoor(0);
		getMap().setChangedX(0);
		getMap().setyCoor(0);
		getMap().setChangedY(0);
		getMap().setZoom(0);
		getMap().setChangedZoom(0);
		getMap().setLocation("");
		getMap().setGameSessionId("NULL");
		Game.getInstance().deleteFromDB(id);
		Game.getInstance().getMap().deleteMapInfoFromDB(id);
	}

	/**
	 * Create the Map information to the GameTable in the database
	 * 
	 * @return false if there is an error in the code
	 */
	public boolean createGameInfoToDB(String uId) {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		//insert a new row into the game.
		try {
			String query = "INSERT INTO tableGame(userId, gameSessionId, salary, answer, letterGetter, letterGetter_letter, letterGetter_pos, streetLabels, showSS)"
					+ " VALUES ('"
					+ uId
					+ "','"
					+ this.gameSessionId
					+ "','"
					+ this.salary
					+ "','"
					+ this.answer
					+ "','"
					+ this.letterGetter
					+ "','"
					+ this.letterGetter_letter
					+ "','"
					+ this.letterGetter_pos
					+ "','"
					+ this.streetLabels
					+ "','" + this.showSS + "');";

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
	 * Selects the previous game that the user was playing. It does this by joining the tables together
	 * and where the id matches is where the correct row is found.
	 * @param id
	 *            the identification number of the user
	 * @param gId 
	 * 			  the game session id of the game.
	 */
	public void currentGameInfo(String id, String gId) {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;

		try {
			String query = "SELECT yCoor, xCoor, zoom, changedY, changedX, changedZoom, location, salary, userLevel, answer, letterGetter, letterGetter_letter, letterGetter_pos, streetLabels, showSS"
					+ "		FROM tableAccount NATURAL JOIN tableGame NATURAL JOIN tableMapPegman"
					+ "		WHERE userId = '" + id + "';";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			rs = pst.executeQuery();
			rs.next();
			double y = rs.getDouble(1);
			double x = rs.getDouble(2);
			int z = rs.getInt(3);
			double cY = rs.getDouble(4);
			double cX = rs.getDouble(5);
			int cZ = rs.getInt(6);
			String l = rs.getString(7);
			this.salary = rs.getInt(8);
			int gameLevel = rs.getInt(9);
			this.answer = rs.getString(10);
			this.letterGetter = rs.getString(11);
			this.letterGetter_letter = rs.getString(12);
			this.letterGetter_pos = rs.getString(13);
			this.streetLabels = rs.getInt(14);
			this.showSS = rs.getInt(15);

			System.out.println("THE CURRENT GAME INFORMATION");
			System.out.println(l + y + x + z + cY + cX + cZ + salary
					+ gameLevel);

			Game.getInstance().setSalary(salary);
			Game.getInstance().setAnswer(answer);
			Game.getInstance().setLetterGetter(letterGetter);
			Game.getInstance().setLetterGetter_letter(letterGetter_letter);
			Game.getInstance().setLetterGetter_pos(letterGetter_pos);
			Game.getInstance().setStreetLabels(streetLabels);
			Game.getInstance().setShowSS(showSS);
			Game.getInstance().getMap().setxCoor(x);
			Game.getInstance().getMap().setyCoor(y);
			Game.getInstance().getMap().setZoom(z);
			Game.getInstance().getMap().setChangedY(cY);
			Game.getInstance().getMap().setChangedX(cX);
			Game.getInstance().getMap().setChangedZoom(cZ);
			Game.getInstance().getMap().setLocation(l);
		} catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}
		dbManager.freeConnection(conn);
		

	}

	/**
	 * Update the Map information to the GameTable in the database
	 * @return false if there is an error in the code
	 */
	public boolean updateGameInfoToDB(String uId) {
		System.out
				.println("<-------------------------------------------IN GAME CLASS------------------------------------------->");
		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		try {
			String query = "UPDATE tableGame SET userId ='" + uId + "',"
					+ "gameSessionId ='" + this.gameSessionId + "',"
					+ "salary = '" + this.salary + "'," + "answer = '"
					+ this.answer + "'," + "letterGetter = '"
					+ this.letterGetter + "'," + "letterGetter_letter = '"
					+ this.letterGetter_letter + "'," + "letterGetter_pos = '"
					+ this.letterGetter_pos + "'," + "streetLabels = '"
					+ this.streetLabels + "'," + "showSS = '" + this.showSS
					+ "' WHERE gameSessionId = '" + this.gameSessionId + "';";

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
	 * Get the information from the GameTable from the database
	 */
	public void getGameInfoFromDB() {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;

		try {
			String query = "SELECT * FROM tableGame WHERE gameSessionId = '"
					+ this.gameSessionId + "';";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			rs = pst.executeQuery();
			rs.next();
			this.gameSessionId = rs.getString(2);
			System.out.println(this.gameSessionId);
			this.salary = rs.getInt(3);
			System.out.println(this.salary);
			this.answer = rs.getString(4);
			System.out.println(this.answer);
		}

		catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

		dbManager.freeConnection(conn);
		
	}

	/**
	 * Delete the row of the table where the id matches.
	 * @param id - user identification number.
	 */
	public void deleteFromDB(String id) {
		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		try {
			String query = "DELETE FROM tableGame WHERE gameSessionId = '" + id
					+ "';";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			pst.executeUpdate();
		}

		catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

		dbManager.freeConnection(conn);
		
	}

	/***
	 * Embed all Game fields into a string in XML format
	 * @return a string in XML format
	 */
	public String toXMLContent() {

		String result = "\t<Game" + " gameSessionId=\"" + gameSessionId + "\""
				+ " salary=\"" + salary + "\"" + " answer=\"" + answer + "\""
				+ " letterGetter=\"" + letterGetter + "\""
				+ " letterGetter_letter=\"" + letterGetter_letter + "\""
				+ " letterGetter_pos=\"" + letterGetter_pos + "\""
				+ " streetLabels=\"" + streetLabels + "\"" + " showSS=\""
				+ showSS + "\" >\n";

		result = result.concat("\t</Game>\n");
		System.out.println("Game Object XML:\n" + result);
		return result;
	}
}
