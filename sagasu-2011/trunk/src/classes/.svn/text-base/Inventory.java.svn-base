package classes;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import managers.DBManager;

/**
 * @author Beom Soo Kim, Edwin Chan and Afsha Sethna
 */
public class Inventory {
	String userId;
	int letterGetterQuantity, screenshotsQuantity, streetLabelsQuantity, randomSalaryQuantity;
	private DBManager dbManager;

	/**
	 * Inventory constructor
	 */
	public Inventory(){
		dbManager = DBManager.getInstance();
		this.userId = "";
		this.letterGetterQuantity = 0;
		this.screenshotsQuantity = 0;
		this.streetLabelsQuantity =0;
		this.randomSalaryQuantity = 0;
	}
	
	/**
	 * Inventory constructor with a specific user identification
	 * @param userId - user identification
	 */
	public Inventory(String userId){
		dbManager = DBManager.getInstance();
		this.userId = userId;
		this.letterGetterQuantity = 0;
		this.screenshotsQuantity = 0;
		this.streetLabelsQuantity =0;
		this.randomSalaryQuantity = 0;
	}

	/***
	 * Registers user inventory to DB
	 * @return boolean value of whether the inventory was created (true) or not (false).
	 */
	public boolean createInventoryToDB(){	
		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;

		//insert a new row into the tableInventory table.
		try{
		String query = 
				"INSERT INTO tableInventory(userId, itemLetterGetter, itemScreenshots, itemStreetLabels, itemRandomSalary)" +
				" VALUES ('" 
				+ this.userId + "','" + this.letterGetterQuantity + "','" + this.screenshotsQuantity + "','"   
				+ this.streetLabelsQuantity + "','" + this.randomSalaryQuantity + "');" ;
		
        pst = conn.prepareStatement(query);          
        System.out.println(query);
        
		pst.executeUpdate();

		} catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}
		
	    dbManager.freeConnection(conn);
	    
		return false;
	}
	
	
	/***
	 * Update Inventory to DB
	 * @return boolean value of whether the inventory was updated to DB (true) or not (false).
	 */
	public boolean updateInventoryToDB(){
		
		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;
		
		try{
		String query = "UPDATE tableInventory " +
				"SET itemLetterGetter ='" + this.letterGetterQuantity + "', " + "itemScreenshots = '" + this.screenshotsQuantity + "', " 
				+ "itemStreetLabels = '" + this.streetLabelsQuantity + "', " + "itemRandomSalary = '" + this.randomSalaryQuantity + "' "  
				+ " WHERE userId = '" + this.userId + "';"; 
		
        pst = conn.prepareStatement(query);          
        System.out.println(query);
        
		pst.executeUpdate();	
		
		} catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

	    dbManager.freeConnection(conn);
	    
		return false;
	}
	
	
	/***
	 * Get Inventory From DB
	 * @return boolean value of whether the inventory was created from DB (true) or not (false).
	 */
	public boolean updateInventoryFromDB(){
		
		Connection conn = dbManager.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;
		
		try{
		String query = "SELECT * FROM tableInventory WHERE userId = '" + this.userId + "';";
		
        pst = conn.prepareStatement(query);          
        System.out.println(query);
        
		rs = pst.executeQuery();
		rs.next();
		this.userId = rs.getString(1);
		System.out.println(this.userId);
		this.letterGetterQuantity = rs.getInt(2);
		System.out.println(this.letterGetterQuantity);
		this.screenshotsQuantity = rs.getInt(3);
		System.out.println(this.screenshotsQuantity);
		this.streetLabelsQuantity = rs.getInt(4);
		System.out.println(this.streetLabelsQuantity);
		this.randomSalaryQuantity = rs.getInt(5);
		System.out.println(this.randomSalaryQuantity);

		}
		catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}
		
	    dbManager.freeConnection(conn);
	    
		return false;
	}
	
	/***
	 * Embed all Inventory fields into a string in XML format
	 * @return a string in XML format
	 */
	public String toXMLContent(){
		
		userId = Utility.processXMLEscapeChars(userId);
		
		String result =  "\t<Inventory" +
		" userId=\"" 				+ userId + "\"" +
		" letterGetterQuantity=\"" 		+ letterGetterQuantity + "\"" +
		" screenshotsQuantity=\"" 		+ screenshotsQuantity + "\"" +
		" streetLabelsQuantity=\"" 	+ streetLabelsQuantity + "\"" +
		" randomSalaryQuantity=\"" 		+ randomSalaryQuantity + "\" >\n";
		
		result = result.concat("\t</Inventory>\n");		
		System.out.println("Account Object XML:\n" + result);		
		return result;
	}	
	
	/**
	 * Get the user identification
	 * @return String userId.
	 */
	public String getUserId() {
		return userId;
	}

	/**
	 * Set the user identificaiton
	 * @param userId set
	 */
	public void setUserId(String userId) {
		this.userId = userId;
	}

	/**
	 * The quantity of the letterGetter item.
	 * @return letterGetterQuantity
	 */
	public int getLetterGetterQuantity() {
		return letterGetterQuantity;
	}

	/**
	 * The quantity of the letterGetter item.
	 * @param letterGetterQuantity set
	 */
	public void setLetterGetterQuantity(int letterGetterQuantity) {
		this.letterGetterQuantity = letterGetterQuantity;
	}

	/**
	 * The quantity of the screenshots item.
	 * @return screenshotsQuantity
	 */
	public int getScreenshotsQuantity() {
		return screenshotsQuantity;
	}


	/**
	 * The quantity of the screenshot item
	 * @param screenshotsQuantity set
	 */
	public void setScreenshotsQuantity(int screenshotsQuantity) {
		this.screenshotsQuantity = screenshotsQuantity;
	}

	/**
	 * The quantity of the streetLabel item
	 * @return streetLabelsQuantity
	 */
	public int getStreetLabelsQuantity() {
		return streetLabelsQuantity;
	}

	/**
	 * The quantity of the streetLabel item.
	 * @param streetLabelsQuantity set
	 */
	public void setStreetLabelsQuantity(int streetLabelsQuantity) {
		this.streetLabelsQuantity = streetLabelsQuantity;
	}

	/**
	 * The quantity of the randomSalary item.
	 * @return randomSalaryQuantity
	 */
	public int getRandomSalaryQuantity() {
		return randomSalaryQuantity;
	}

	/**
	 * The quantity of the randomSalary item.
	 * @param randomSalaryQuantity set
	 */
	public void setRandomSalaryQuantity(int randomSalaryQuantity) {
		this.randomSalaryQuantity = randomSalaryQuantity;
	}
	
	/**
	 * When any of the items are used the quantity is changed and the changes are updated to the database.
	 * @param lg - the value of the letterGetter item - setting letterGetterQuantity.
	 * @param ss - the value of the screenshot item - setting screenshotQuantity.
	 * @param sl - the value of the street labels item - setting streetlabelQuantity.
	 * @param rs - the value of the randomaSalary item - setting randomSalaryQuantity.
	 */
	public void setUsageQuantity(int lg, int ss, int sl, int rs) {
		setLetterGetterQuantity(lg);
		setScreenshotsQuantity(ss);
		setStreetLabelsQuantity(sl);
		setRandomSalaryQuantity(rs);
		updateInventoryToDB();
	}


	/**
	 * If the userID stored in the Servlet is equal to the inventory in the model,
	 * then this Inventory is Legitimate. 
	 * @param id The id from the ServletAccount
	 * @return true if Inventory object is Legitimate, false otherwise
	 */
	public boolean isLegit(String id) {
		if(id.equals(this.userId)) {
			return true;
		} else {
			return false;
		}
	}	
	
}
