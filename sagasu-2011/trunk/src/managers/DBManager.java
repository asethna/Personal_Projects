package managers;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import classes.DBConnectionPool;
import classes.UserStatus;
import classes.Utility;

/***
 * Manages the DB connection pool, and provides frequently used database functions.
 */
public class DBManager {		
	
	private DBConnectionPool connectionPool;
	private int maxDBConnectionPoolSize = 0;	//0 means no limit
	
	private String dbDriver 	= "com.mysql.jdbc.Driver";
	private String dbURL 	    = "jdbc:mysql://127.0.0.1:3306/test";
	private String dbUser 		= "root";
	private String dbPassword	= "alimadat";
	
	// singleton class constructor
	private static DBManager dbManagerInstance = null;
	
	protected DBManager() {
		// register jdbc driver
		try{
			Driver driver = (Driver) Class.forName(dbDriver).newInstance();
			DriverManager.registerDriver(driver);
			//Class.forName("com.mysql.jdbc.Driver");

		}
		catch(Exception e){
			System.out.println("Failed to register JDBC driver: " + e.getMessage());
		}
		// create connection pool
		connectionPool = new DBConnectionPool(dbURL, dbUser, dbPassword, maxDBConnectionPoolSize);
	}
	
	public static DBManager getInstance() {
		if(dbManagerInstance == null) {
			dbManagerInstance = new DBManager();
		}
		return dbManagerInstance;
	}
	
	/***
	 * Gets an active connection from the connection pool.
	 * @return An active connection.
	 */
	public Connection getConnection(){
		return connectionPool.getConnection();
	}
	
	/***
	 * Frees and returns a connection to the connection pool.
	 */
	public void freeConnection(Connection connection){
		connectionPool.returnConnectionToPool(connection);
	}	
	
	
	
	/***
	 * Checks if userId is already registered in Database
	 * @param userId userId to check
	 * @return boolean value of whether userId exists in Database or not. True if yes, False otherwise
	 */
	public boolean checkEntryRegistered(String userId, String tableName){
		boolean isRegistered = false;
		
		Connection conn = this.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;
		int rsSize = 0;
		
		try {			
			String query = "SELECT userId FROM " + tableName +  " WHERE userId = '" +
			userId + "';";
					
            pst = conn.prepareStatement(query);          
            System.out.println(query);
            pst.execute();
            rs = pst.getResultSet();
            
            rsSize = this.getResultSetSize(rs);
                             
            System.out.println("ResultSet size: "+ rsSize);
            if (rsSize > 0)
            	isRegistered=true;
            
            System.out.println("userId is already registered: "+ isRegistered);
		}
		catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

	    this.freeConnection(conn);
	    
		return isRegistered;		
	}
	
	
	/***
	 * Get number of rows returned in ResultSet
	 * @param rs ResultSet from SQL call
	 * @return size of ResultSet (number of rows in Result Set)
	 */
	public int getResultSetSize(ResultSet rs){
		int count=0;
		try {
			while(rs.next()){
				count++;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return count;
	}
	
	
	public List<UserStatus> getAllUserStatus(){
        List<UserStatus> userStatuses = new ArrayList<UserStatus>();		
		Connection conn = this.getConnection();
		PreparedStatement pst = null;
		ResultSet rs = null;		
		try {			
			String query = "SELECT userId, loggedIn, inGame, userLevel FROM tableAccount;";
					
            pst = conn.prepareStatement(query);          
            System.out.println(query);
            pst.execute();
            rs = pst.getResultSet();

            while(rs.next()){
            	String id = rs.getString(1);
            	String screenName = "";
            	String picURL = "";
            	Boolean registered = true;
            	int loggedIn = rs.getInt(2);
            	int inGame = rs.getInt(3);
            	int userLevel = rs.getInt(4);
            	userStatuses.add(new UserStatus(id, screenName, picURL, registered, loggedIn, inGame, userLevel ));
            }          
		}
		catch (SQLException e) {
			System.out.println("SQL exception: " + e.getMessage());
		}

	    this.freeConnection(conn);
	    
		return userStatuses;	
	}
	
}