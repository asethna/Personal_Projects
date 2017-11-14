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
 * @author Afsha Sethna
 * 
 */
public class MapPegman {

	// Only the xCoor, yCoor and zoom would be saved to the database.
	private double xCoor, yCoor, changedX, changedY;
	private int zoom, changedZoom;
	private String location, gameSessionId;
	private DBManager dbManager;

	/**
	 * Constructor for the mapPegman class.
	 */
	public MapPegman() {
		dbManager = DBManager.getInstance();
		this.xCoor = 0;
		this.changedX = 0;
		this.yCoor = 0;
		this.changedY = 0;
		this.zoom = 0;
		this.changedZoom = 0;
		this.location = "";
		this.gameSessionId = "NULL";
	}

	/**
	 * @return the xCoor
	 */
	public double getxCoor() {
		return xCoor;
	}

	/**
	 * @return the yCoor
	 */
	public double getyCoor() {
		return yCoor;
	}

	/**
	 * @return the changedX
	 */
	public double getChangedX() {
		return changedX;
	}

	/**
	 * @return the changedY
	 */
	public double getChangedY() {
		return changedY;
	}

	/**
	 * @return the zoom
	 */
	public int getZoom() {
		return zoom;
	}

	/**
	 * @return the changedZoom
	 */
	public int getChangedZoom() {
		return changedZoom;
	}

	/**
	 * @return the location
	 */
	public String getLocation() {
		return location;
	}

	/**
	 * @return the gameSessionId
	 */
	public String getGameSessionId() {
		return gameSessionId;
	}

	/**
	 * @param gameSessionId the gameSessionId to set
	 */
	public void setGameSessionId(String gameSessionId) {
		this.gameSessionId = gameSessionId;
	}

	/**
	 * @param xCoor
	 *            the xCoor to set
	 */
	public void setxCoor(double xCoor) {
		this.xCoor = xCoor;
	}

	/**
	 * @param yCoor
	 *            the yCoor to set
	 */
	public void setyCoor(double yCoor) {
		this.yCoor = yCoor;
	}

	/**
	 * @param changedX
	 *            the changedX to set
	 */
	public void setChangedX(double changedX) {
		this.changedX = changedX;
	}

	/**
	 * @param changedY
	 *            the changedY to set
	 */
	public void setChangedY(double changedY) {
		this.changedY = changedY;
	}

	/**
	 * @param zoom
	 *            the zoom to set
	 */
	public void setZoom(int zoom) {
		this.zoom = zoom;
	}

	/**
	 * @param changedZoom
	 *            the changedZoom to set
	 */
	public void setChangedZoom(int changedZoom) {
		this.changedZoom = changedZoom;
	}

	/**
	 * Create the Map information to the MapPegmanTable in the database
	 * 
	 * @return false if there is an error in the code
	 */
	public boolean createMapInfoToDB(String uId) {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;
		//ResultSet rs = null;

		try {
			String query = "INSERT INTO tableMapPegman(userId, gameSessionId, location, yCoor, xCoor, zoom, changedY, changedX, changedZoom)"
					+ " VALUES ('"
					+ uId
					+ "','"
					+ this.gameSessionId
					+ "','"
					+ this.location
					+ "','"
					+ this.yCoor
					+ "','"
					+ this.xCoor
					+ "','"
					+ this.zoom
					+ "','"
					+ this.changedY
					+ "','" + this.changedX + "','" + this.changedZoom + "');";

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
	 * Update the Map information to the MapPegmanTable in the database
	 * 
	 * @return false if there is an error in the code
	 */
	public boolean updateMapInfoToDB(String uId) {
		System.out.println("<-------------------------------------------IN MapPegman CLASS------------------------------------------->");
		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		try {
			String query = "UPDATE tableMapPegman SET userId ='" + uId + "'," + "gameSessionId ='" + this.gameSessionId + "', " + "location ='" + this.location + "', " + " yCoor = '" + this.yCoor + "', " 
					+ "xCoor = '" + this.xCoor + "'," + "zoom = '" + this.zoom + "',"  
					+ "changedY = '" + this.changedY + "'," + "changedX = '" + this.changedX + "'," + "changedZoom = '" + this.changedZoom + "' WHERE location = '" + this.location + "';"; 


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
	 * Get the information from the MapPegmanTable from the database
	 */
	public void getMapInfoFromDB() {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;

		try {
			String query = "SELECT * FROM tableMapPegman WHERE gameSessionId = '"
					+ gameSessionId + "';";

			pst = conn.prepareStatement(query);
			System.out.println(query);

			rs = pst.executeQuery();
			rs.next();
			this.gameSessionId = rs.getString(2);
			System.out.println(this.gameSessionId);
			this.location = rs.getString(3);
			System.out.println(this.location);
			this.yCoor = rs.getDouble(4);
			System.out.println(this.yCoor);
			this.xCoor = rs.getDouble(5);
			System.out.println(this.xCoor);
			this.zoom = rs.getInt(6);
			System.out.println(this.zoom);
			this.changedY = rs.getDouble(7);
			System.out.println(this.changedY);
			this.changedX = rs.getDouble(8);
			System.out.println(this.changedX);
			this.changedZoom = rs.getInt(9);
			System.out.println(this.changedZoom);
		}

		catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

		dbManager.freeConnection(conn);
		
	}

	/**
	 * Get the information from the MapPegmanTable from the database
	 */
	public void deleteMapInfoFromDB(String id) {

		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		try {
			String query = "DELETE FROM tableMapPegman WHERE gameSessionId = '"
					+ id + "';";

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
	 * Embed all MapPegman fields into a string in XML format
	 * 
	 * @return a string in XML format
	 */
	public String toXMLContent() {

		String result = "\t<Pegman" + " gameSessionId=\"" + gameSessionId + "\"" + " location=\"" + location + "\""
				+ " yCoor=\"" + yCoor + "\"" + " xCoor=\"" + xCoor + "\""
				+ " zoom=\"" + zoom + "\"" + " changedY=\"" + changedY + "\""
				+ " changedX=\"" + changedX + "\"" + " changedZoom=\""
				+ changedZoom + "\" >\n";

		result = result.concat("\t</Pegman>\n");
		System.out.println("Pegman Object XML:\n" + result);
		return result;
	}

	/**
	 * @param location
	 *            the location to set
	 */
	public void setLocation(String location) {
		this.location = location;
	}

}
