package servlets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.Queue;

import classes.Account;
import classes.Game;
import classes.Inventory;
import classes.UserStatus;
import classes.Utility;
import managers.DBManager;

/**
 * Servlet implementation class ServletAccount --
 */
@WebServlet("/ServletAccount")
public class ServletAccount extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private DBManager dbManager;
	private Account account;
	private Inventory inventory;
	private String idCheck;
	private List<UserStatus> sagasuList;

	public ServletAccount() {
		
	}
	
	@Override
	public void init() {
		dbManager = DBManager.getInstance();
		account = new Account(); 
		inventory = new Inventory();
		sagasuList = new ArrayList();
	}
	
	public enum EnumAction {
		register,
		retrieveData,
		displayUserPoints,
		displayInventory,
		displayPointsAndInventory,
		buyLetterGetter,
		buyScreenshots,
		buyStreetLabels,
		buyRandomSalary,
		checkIds,
		signout,	
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**doPost activated.");
		processRequest(request, response);
	}


	private void processRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**processRequest activated");
		String action = request.getParameter("action");
		System.out.println("[ServletAccount]-> action: "+action);
		try {
			EnumAction.valueOf(action);
		} 
		catch (Exception e) {
			throw new ServletException("Invalid account servlet action.");
		}

		switch (EnumAction.valueOf(action)) {
		// account registration
			case register:
				registerHandler(request, response);
				break;
			//case displayUserPoints:
			//	displayUserPoints(request, response);
			//	break;
			//case displayInventory:
			//	displayInventory(request, response);
			//	break;
			case displayPointsAndInventory:
				displayPointsAndInventory(request, response);
				break;
			case buyLetterGetter:
				buyLetterGetter(request, response);
				break;
			case buyScreenshots:
				buyScreenshots(request, response);
				break;
			case buyStreetLabels:
				buyStreetLabels(request, response);
				break;
			case buyRandomSalary:
				buyRandomSalary(request, response);
				break;	
			case retrieveData:
				retrievalHandler(request, response);
				break;
			case checkIds:
				checkIds(request, response);
				break;
			case signout:
				userSignedOut(request, response);
				break;
		}


	}
	
	private void userSignedOut(HttpServletRequest request,
			HttpServletResponse response) {
		System.out.println("[ServletAccount]**[enum] userSignedOut activated");
		System.out.println("YES..........I SIGNED OUT!!");
		System.out.println(account.getUserName());
		System.out.println(account.getLoggedIn());
		account.setLoggedIn(0);
		System.out.println(account.getLoggedIn());
		account.updateAccountInfoToDB();
		String gId = account.getGameSessionId();
		if (!gId.equals("NONE")) {
			account.setGameSessionId("NONE");
			Game.getInstance().deleteFromDB(gId);
		}
	}

	private void retrievalHandler(HttpServletRequest request, HttpServletResponse response) throws IOException {
		account.getAccountInfoFromDB();
		StringBuffer XMLResponse = new StringBuffer();	
		XMLResponse.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n");
		XMLResponse.append("<response>\n");
		XMLResponse.append(account.toXMLContent()); 
		XMLResponse.append("</response>\n");
		response.setContentType("application/xml");
		response.getWriter().println(XMLResponse);
		System.out.println(XMLResponse);
	}

	private void registerHandler(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
			System.out.println("[ServletAccount]**[enum] registerHandler activated");
			
			//Get User Id and User Name and store them in the Account model
			String screen_Name = request.getParameter("screen_Name");
			String user_Id= request.getParameter("user_Id");	
			
			//Keep a copy of the User ID to deal with the "garbage collector problem"
			idCheck = user_Id;
			
			System.out.println("[ServletAccount]-> screen_Name: " +screen_Name);
			System.out.println("[ServletAccount]-> user_Id: "+user_Id);		
			account.setUserId(user_Id);
			account.setUserName(screen_Name);
			account.setGameSessionId("NONE");
			account.setLoggedIn(1);
			account.setInGame(0);
			account.setUserPoints(0);
			account.setSolvedMaps(0);
			account.setUserLevel(1);
			account.setInvited(0);
			inventory.setUserId(user_Id);	
			
			String userProfilePicURL;	
			int userPoints;
			int userLevel;
			boolean isSuccessful = false;
			String message = "";
			
			//if Account is registered, take info from DB and dump to acct object and display Points and Levels
			String tableName = "tableAccount";
			if(dbManager.checkEntryRegistered(user_Id, tableName)) {
				isSuccessful = account.getAccountInfoFromDB();
				inventory.updateInventoryFromDB();
				account.setLoggedIn(1);
				message = "Account retrieved";
			}
			else{
				boolean flag1, flag2;
				flag1 = account.createUserToDB();
				System.out.println("*** createUserToDB activated");
				flag2 = inventory.createInventoryToDB();
				System.out.println("*** createInventoryToDB activated");
				isSuccessful = flag1 && flag2;
				message = "Account created";
			}
			
			userPoints = account.getUserPoints();
			userLevel = account.getUserLevel();
			System.out.println("[ServletAccount]-> userPoints, userLevel: "+ userPoints+ ", " + userLevel);
			
			StringBuffer XMLResponse = new StringBuffer();	
			XMLResponse.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n");
			XMLResponse.append("<response>\n");
			XMLResponse.append("\t<result>" + isSuccessful + "</result>\n");
			XMLResponse.append("\t<message>" + message + "</message>\n");
			XMLResponse.append(account.toXMLContent() ); 		
			XMLResponse.append("</response>\n");
			response.setContentType("application/xml");
			response.getWriter().println(XMLResponse);
			
			account.updateAccountInfoToDB();
	}
	
	private void displayPointsAndInventory(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**[enum] displayPointsAndInventory activated");
		
		String/* screen_Name,*/ user_Id;	
		//user_Id = account.getUserId();
		user_Id = request.getParameter("user_Id");
		System.out.println("[ServletAccount]-> user_Id: "+user_Id);	
		account.setUserId(user_Id);
		inventory.setUserId(user_Id);
		
		int userPoints;
		

		account.getAccountInfoFromDB();

		//if(!account.isLegit(idCheck)) {
			account.getAccountInfoFromDB();
		//}
		
		userPoints = account.getUserPoints();
		System.out.println("[ServletAccount]-> userPoints: "+ userPoints);	
		
		int letterGetterQuantity, screenshotsQuantity, streetLabelsQuantity, randomSalaryQuantity;
		
		//if(!inventory.isLegit(idCheck)) {
			inventory.updateInventoryFromDB();
		//}
		
		letterGetterQuantity = inventory.getLetterGetterQuantity();
		System.out.println("[ServletAccount]-> letterGetterQuantity: "+ letterGetterQuantity);
		screenshotsQuantity = inventory.getScreenshotsQuantity();
		System.out.println("[ServletAccount]-> screenshotsQuantity: "+ screenshotsQuantity);
		streetLabelsQuantity = inventory.getStreetLabelsQuantity();
		System.out.println("[ServletAccount]-> streetLabelsQuantity: "+ streetLabelsQuantity);
		randomSalaryQuantity = inventory.getRandomSalaryQuantity();
		System.out.println("[ServletAccount]-> randomSalaryQuantity: "+ randomSalaryQuantity);

		
		StringBuffer XMLResponse = new StringBuffer();	
		XMLResponse.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n");
		XMLResponse.append("<response>\n");
		XMLResponse.append(account.toXMLContent() ); 
		XMLResponse.append(inventory.toXMLContent() ); 
		XMLResponse.append("</response>\n");
		response.setContentType("application/xml");
		response.getWriter().println(XMLResponse);
	}
	
	private void buyLetterGetter(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**[enum] buyLetterGetter activated");
		
		String/* screen_Name,*/ user_Id;	
		user_Id = account.getUserId();
		System.out.println("[ServletAccount]-> user_Id: "+user_Id);		
		
		int userPoints;	
		//account.updateAccountInfoFromDB();
		userPoints = account.getUserPoints();
		System.out.println("[ServletAccount]-> (before) userPoints: "+ userPoints);	
		int letterGetterQuantity;
		letterGetterQuantity = inventory.getLetterGetterQuantity();
		System.out.println("[ServletAccount]-> (before) letterGetterQuantity: "+ letterGetterQuantity);
		
		if(userPoints >= 2000 && letterGetterQuantity<10){
			userPoints = userPoints - 2000;
			account.setUserPoints(userPoints);
			letterGetterQuantity = letterGetterQuantity+1;
			inventory.setLetterGetterQuantity(letterGetterQuantity);
			System.out.println("[ServletAccount]-> (after) letterGetterQuantity: "+ letterGetterQuantity);
			System.out.println("[ServletAccount]-> (after) userPoints: "+ userPoints);	
			account.updateAccountInfoToDB();
			inventory.updateInventoryToDB();
		}
		else if(userPoints >= 2000 && letterGetterQuantity>=10) {
			System.out.println("Cannot Exceed Zoom In Item Quantity of 10");	
		} else {	
			System.out.println("Not enough Points");
		}
	}
	
	private void buyScreenshots(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**[enum] buyScreenshots activated");
		
		String/* screen_Name,*/ user_Id;	
		user_Id = account.getUserId();
		System.out.println("[ServletAccount]-> user_Id: "+user_Id);		
		
		int userPoints;	
		//account.updateAccountInfoFromDB();
		userPoints = account.getUserPoints();
		System.out.println("[ServletAccount]-> (before) userPoints: "+ userPoints);	
		int screenshotsQuantity;
		screenshotsQuantity = inventory.getScreenshotsQuantity();
		System.out.println("[ServletAccount]-> (before) screenshotsQuantity: "+ screenshotsQuantity);
		
		if(userPoints >= 3000 && screenshotsQuantity<10){
			userPoints = userPoints - 3000;
			account.setUserPoints(userPoints);
			screenshotsQuantity = screenshotsQuantity+1;
			inventory.setScreenshotsQuantity(screenshotsQuantity);
			System.out.println("[ServletAccount]-> (after) screenshotsQuantity: "+ screenshotsQuantity);
			System.out.println("[ServletAccount]-> (after) userPoints: "+ userPoints);	
			account.updateAccountInfoToDB();
			inventory.updateInventoryToDB();
		}
		else if(userPoints >= 3000 && screenshotsQuantity>=10) {
			System.out.println("Cannot Exceed Zoom Out Item Quantity of 10");	
		} else {	
			System.out.println("Not enough Points");
		}
	}
	
	private void buyStreetLabels(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**[enum] buyStreetLabels activated");
		
		String/* screen_Name,*/ user_Id;		
		user_Id = account.getUserId();
		System.out.println("[ServletAccount]-> user_Id: "+user_Id);		
		
		int userPoints;	
		//account.updateAccountInfoFromDB();
		userPoints = account.getUserPoints();
		System.out.println("[ServletAccount]-> (before) userPoints: "+ userPoints);	
		int streetLabelsQuantity;
		streetLabelsQuantity = inventory.getStreetLabelsQuantity();
		System.out.println("[ServletAccount]-> (before) streetLabelsQuantity: "+ streetLabelsQuantity);
		
		if(userPoints >= 10000 && streetLabelsQuantity<10){
			userPoints = userPoints - 10000;
			account.setUserPoints(userPoints);
			streetLabelsQuantity = streetLabelsQuantity+1;
			inventory.setStreetLabelsQuantity(streetLabelsQuantity);
			System.out.println("[ServletAccount]-> (after) streetLabelsQuantity: "+ streetLabelsQuantity);
			System.out.println("[ServletAccount]-> (after) userPoints: "+ userPoints);	
			account.updateAccountInfoToDB();
			inventory.updateInventoryToDB();
		}
		else if(userPoints >= 10000 && streetLabelsQuantity>=10) {
			System.out.println("Cannot Exceed Zoom In Item Quantity of 10");	
		} else {	
			System.out.println("Not enough Points");
		}
	}
	
	private void buyRandomSalary(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**[enum] buyRandomSalary activated");
		
		String/* screen_Name,*/ user_Id;	
		user_Id = account.getUserId();
		System.out.println("[ServletAccount]-> user_Id: "+user_Id);		
		
		int userPoints;	
		//account.updateAccountInfoFromDB();
		userPoints = account.getUserPoints();
		System.out.println("[ServletAccount]-> (before) userPoints: "+ userPoints);	
		int randomSalaryQuantity;
		randomSalaryQuantity = inventory.getRandomSalaryQuantity();
		System.out.println("[ServletAccount]-> (before) randomSalaryQuantity: "+ randomSalaryQuantity);
		
		if(userPoints >= 2000 && randomSalaryQuantity<10){
			userPoints = userPoints - 2000;
			account.setUserPoints(userPoints);
			randomSalaryQuantity = randomSalaryQuantity+1;
			inventory.setRandomSalaryQuantity(randomSalaryQuantity);
			System.out.println("[ServletAccount]-> (after) randomSalaryQuantity: "+ randomSalaryQuantity);
			System.out.println("[ServletAccount]-> (after) userPoints: "+ userPoints);	
			account.updateAccountInfoToDB();
			inventory.updateInventoryToDB();
		}
		else if(userPoints >= 2000 && randomSalaryQuantity>=10) {
			System.out.println("Cannot Exceed Zoom In Item Quantity of 10");	
		} else {	
			System.out.println("Not enough Points");
		}
	}	
	
	
	private void checkIds(HttpServletRequest request,HttpServletResponse response) throws ServletException, IOException {
		System.out.println("[ServletAccount]**[enum] checkIds activated");
		
		String stringOfIds, stringOfScreenNames, stringOfPicURLs;
		List<String> idsList = new ArrayList();
		List<UserStatus> registeredFollowersList = new ArrayList();		
		
		stringOfIds = request.getParameter("stringOfIds");
		stringOfScreenNames = request.getParameter("stringOfScreenNames");
		stringOfPicURLs = request.getParameter("stringOfPicURLs");
		System.out.println("Followers Details: ");
		System.out.println(stringOfIds);
		System.out.println(stringOfScreenNames);
		System.out.println(stringOfPicURLs);
		String [] idsArray = stringOfIds.split(",");
		String [] sNameArray = stringOfScreenNames.split(",");
		String [] picURLArray = stringOfPicURLs.split(",");
		idsList = Arrays.asList(idsArray);
		
		sagasuList = dbManager.getAllUserStatus();
		
		//convert sagasuList into another List that contains only ids
		List<String>sagasuIdsList = new ArrayList();
		for(int i=0; i<sagasuList.size(); i++){
			sagasuIdsList.add(sagasuList.get(i).getUserId());
		}
		
		//Find all indexes in sagasuIdsList that have positive match with idsList
		Queue indexQueue = new LinkedList();
		for(int i=0; i<idsList.size(); i++){
			for(int j=0; j<sagasuIdsList.size(); j++){
				if(idsArray[i].equals(sagasuIdsList.get(j))){
					System.out.println(j);
					indexQueue.add(j);					
				}
			}
		}
		
		for(int i=0; i<idsList.size(); i++){
			//idsList.contains(sagasuList.get(i).getUserId())
			System.out.println(idsList.get(i));
			if(sagasuIdsList.contains(idsList.get(i))){
				System.out.println("MATCHHHHHHHHHHH: " + idsList.get(i));
				int index = (Integer) indexQueue.poll();
				String id = sagasuList.get(index).getUserId();
				String screenName = sNameArray[i];
				String picURL = picURLArray[i];
				boolean registered = true;
				int inGame = sagasuList.get(index).isInGame();
				int loggedIn = sagasuList.get(index).isLoggedIn();
				int userLevel = sagasuList.get(index).getUserLevel();
				UserStatus follower = new UserStatus(id, screenName, picURL, registered, loggedIn, inGame, userLevel);
				registeredFollowersList.add(follower);
				
				System.out.println("ID in registeredFollowersList is:"+registeredFollowersList.get(i).getUserId());
			}
			else{
				String id = idsList.get(i);
				String screenName = sNameArray[i];
				String picURL = picURLArray[i];
				boolean registered = false;
				int inGame = 0;
				int loggedIn = 0;
				int userLevel = 0;
				registeredFollowersList.add(new UserStatus(id, screenName, picURL, registered,loggedIn,inGame, userLevel));		
			}
		}
		
		StringBuffer XMLResponse = new StringBuffer();	
		XMLResponse.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n");
		XMLResponse.append("<response>\n");
		Iterator<UserStatus> itr = registeredFollowersList.iterator();
	    while (itr.hasNext()) {//iterate through all list and append to xml
	    	XMLResponse.append(itr.next().toXMLContent() ); 
	    }
		XMLResponse.append("</response>\n");
		response.setContentType("application/xml");
		response.getWriter().println(XMLResponse);		
		System.out.println("!!!PRINTING!!!");
		System.out.println(XMLResponse);
	}
}
