package servlets;

import java.io.IOException;
import java.text.DecimalFormat;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import classes.Account;
import classes.Game;
import classes.Inventory;
import classes.MapPegman;
import classes.Utility;

import managers.DBManager;

/**
 * Servlet implementation class ServletCreateGame
 * 
 * @author Afsha Sethna
 */
@WebServlet("/ServletCreateGame")
public class ServletCreateGame extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private DBManager dbManager;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public ServletCreateGame() {
		super();
		dbManager = DBManager.getInstance();
	}

	private enum EnumAction {
		createGame, changeGameCoor, getCurrentGame, setUserWinnings, changeGameItems, deleteGame, setUserLevel, multiplayer, displayInventory
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		processRequest(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("**the doPost method");
		processRequest(request, response);
	}

	private String createAlphanumericValue() {
		String alphaNumerics = "qwertyuiopasdfghjklzxcvbnm1234567890";
		String t = "";
		for (int i = 0; i < 8; i++) {
			t += alphaNumerics.charAt((int) (Math.random() * alphaNumerics
					.length()));
		}
		return t;
	}

	private double roundDecimals(double d) {
		DecimalFormat dForm = new DecimalFormat("#.###");
		return Double.valueOf(dForm.format(d));
	}

	private void processRequest(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out.println("**processRequest activated");
		String action = request.getParameter("action");
		System.out.println("-> action: " + action);

		try {
			EnumAction.valueOf(action);
		} catch (Exception e) {
			throw new ServletException("Invalid account servlet action.");
		}

		switch (EnumAction.valueOf(action)) {
		// creating a game.
		case createGame:
			gamedataHandler(request, response);
			break;
		case changeGameCoor:
			gamechangedataHandler(request, response);
			break;
		case getCurrentGame:
			gamedataRetrievalHandler(request, response);
			break;
		case setUserWinnings:
			setUserWinnings(request, response);
			break;
		case changeGameItems:
			setItems(request, response);
			break;
		case deleteGame:
			deleteGameMapTable(request, response);
			break;
		case multiplayer:
			invitePlayers(request, response);
			break;
		case displayInventory:
			displayInventory(request, response);
			break;
		}
	}

	private void displayInventory(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		System.out
				.println("[ServletAccount]**[enum] displayInventory Activated");

		String uId = request.getParameter("userId");
		Inventory inventory = new Inventory(uId);
		
		inventory.updateInventoryFromDB();

		int letterGetterQuantity, screenshotsQuantity, streetLabelsQuantity, randomSalaryQuantity;
		letterGetterQuantity = inventory.getLetterGetterQuantity();
		System.out.println("[ServletAccount]-> letterGetterQuantity: "
				+ letterGetterQuantity);
		screenshotsQuantity = inventory.getScreenshotsQuantity();
		System.out.println("[ServletAccount]-> screenshotsQuantity: "
				+ screenshotsQuantity);
		streetLabelsQuantity = inventory.getStreetLabelsQuantity();
		System.out.println("[ServletAccount]-> streetLabelsQuantity: "
				+ streetLabelsQuantity);
		randomSalaryQuantity = inventory.getRandomSalaryQuantity();
		System.out.println("[ServletAccount]-> randomSalaryQuantity: "
				+ randomSalaryQuantity);

		StringBuffer XMLResponse = new StringBuffer();
		XMLResponse.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n");
		XMLResponse.append("<response>\n");
		XMLResponse.append(inventory.toXMLContent());
		XMLResponse.append("</response>\n");
		response.setContentType("application/xml");
		response.getWriter().println(XMLResponse);
	}

	private void invitePlayers(HttpServletRequest request,
			HttpServletResponse response) {
		System.out
				.println("Running invitePlayers method in ServletCreateGame class");
		String userName = request.getParameter("userName");
		String uId = request.getParameter("userId");
		String gId = request.getParameter("gameSessionId");
		System.out.println("$$$$$$$$$$$$$$$$$$$$" + userName + " " + uId + " "
				+ gId + " " + 1);
		Account acc = new Account(uId, userName);
		acc.setGameSKey_Invited(gId, 1);
	}

	private void deleteGameMapTable(HttpServletRequest request,
			HttpServletResponse response) {
		System.out
				.println("Running deleteGameMapTable method in ServletCreateGame class");
		String uName = request.getParameter("userName");
		String uId = request.getParameter("userId");
		String gameId = request.getParameter("gameId");
		Account acc = new Account(uId, uName);
		acc.setGameSKey_Invited("NONE", 0);
		Game.getInstance().deleteGame(gameId);
		Game.setInstance(null);
	}

	private void setItems(HttpServletRequest request,
			HttpServletResponse response) {
		System.out
				.println("Running setItems method in ServletCreateGame class");
		String userId = request.getParameter("userId");
		String userName = request.getParameter("userName");
		String letterGetter = request.getParameter("letterGetter");
		String letterGetter_letter = request
				.getParameter("letterGetter_letter");
		String letterGetter_pos = request.getParameter("letterGetter_pos");
		int streetLabels = Integer.parseInt(request
				.getParameter("streetLabels"));
		int showSS = Integer.parseInt(request.getParameter("showSS"));
		int lgQuantity = Integer.parseInt(request.getParameter("lgQuantity"));
		int slQuantity = Integer.parseInt(request.getParameter("slQuantity"));
		int rsQuantity = Integer.parseInt(request.getParameter("rsQuantity"));
		int ssQuantity = Integer.parseInt(request.getParameter("ssQuantity"));
		
		Inventory inventory = new Inventory(userId);

		Game.getInstance().changeItemUsage(userId, letterGetter,
				letterGetter_letter, letterGetter_pos, streetLabels, showSS);
		inventory.setUsageQuantity(lgQuantity, ssQuantity, slQuantity, rsQuantity);
		System.out.println(letterGetter + ", " + letterGetter_letter + ", "
				+ letterGetter_pos + ", " + streetLabels + ", " + showSS);

	}

	private void setUserWinnings(HttpServletRequest request,
			HttpServletResponse response) {
		System.out
				.println("Running setPoints method in ServletCreateGame class");
		int userPoints = Integer.parseInt(request.getParameter("userPoints"));
		String userId = request.getParameter("userId");
		String userName = request.getParameter("userName");
		int salary = Integer.parseInt(request.getParameter("salary"));
		int userLevel = Integer.parseInt(request.getParameter("userLevel"));
		int inGame = Integer.parseInt(request.getParameter("inGame"));
		int solvedMaps = Integer.parseInt(request.getParameter("solvedMaps"));

		userPoints = userPoints + salary;
		userLevel = userLevel + 1;
		solvedMaps = solvedMaps + 1;

		System.out
				.println(userPoints + ", " + userId + ", " + userName + ", "
						+ salary + ", " + userLevel + ", " + inGame + ", "
						+ solvedMaps);

		Account acc = new Account(userId, userName);
		acc.setWinnings(userPoints, userLevel, 0, solvedMaps);
		acc.setGameSKey_Invited("NONE", 0);
	}

	private void gamedataHandler(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		Utility ut = new Utility();
		System.out
				.println("Running gamedatahandler method in ServletCreateGame class");
		String userId = request.getParameter("userId");
		String userName = request.getParameter("userName");
		String gameId = request.getParameter("gameSessionId");
		int level = Integer.parseInt(request.getParameter("userLevel"));

		Account acc = new Account(userId, userName);
		System.out.println("**USER ID IS: " + userId + "**");
		System.out.println("**USER NAME IS: " + userName + "**");
		System.out.println("**GAME ID IS: " + acc.getGameSessionId() + "**");
		System.out.println("**USER LEVEL IS: " + level + "**");

		double yCoor = roundDecimals(Double.parseDouble(request
				.getParameter("yCoor")));
		double xCoor = roundDecimals(Double.parseDouble(request
				.getParameter("xCoor")));
		// double changedY =
		// roundDecimals(Double.parseDouble(request.getParameter("changedY")));
		// double changedX =
		// roundDecimals(Double.parseDouble(request.getParameter("changedX")));
		String location = request.getParameter("location");
		int zoom = Integer.parseInt(request.getParameter("zoom"));
		// int changedZoom =
		// Integer.parseInt(request.getParameter("changedZoom"));

		if (gameId.equals("NONE")) {
			String gId = createAlphanumericValue();
			acc.setGameSKey_Invited(gId, 0);
			if (level > 0 && level <= 10) {
				String[] landmark = ut.getaLandmark();
				yCoor = Double.parseDouble(landmark[2]);
				xCoor = Double.parseDouble(landmark[3]);
				location = landmark[1];
				Game.getInstance().startGame(userId, yCoor, xCoor, zoom,
						location, gId, level);
			} else {
				Game.getInstance().startGame(userId, yCoor, xCoor, zoom,
						location, gId, level);
			}

			System.out.println(acc.toXMLContent().toString());
			System.out.println("Game session: " + gId);
			System.out.println("In Game: " + acc.getInGame());
			System.out.println("Game Session Key is set: "
					+ Game.getInstance().getGameSessionId());
		} else {
			Game.getInstance().currentGameInfo(userId, acc.getGameSessionId());
		}
	}

	private void gamechangedataHandler(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		System.out
				.println("Running gamechangedatahandler method in ServletCreateGame class");
		double changedY = roundDecimals(Double.parseDouble(request
				.getParameter("changedY")));
		double changedX = roundDecimals(Double.parseDouble(request
				.getParameter("changedX")));
		int changedZoom = Integer.parseInt(request.getParameter("changedZoom"));
		String userId = request.getParameter("userId");
		String userName = request.getParameter("userName");
		int salary = Integer.parseInt(request.getParameter("salary"));

		Account acc = new Account(userId, userName);
		System.out.println("**USER ID IS: " + userId + "**");
		System.out.println("**USER NAME IS: " + userName + "**");
		System.out.println("**GAME ID IS: " + acc.getGameSessionId() + "**");

		String gId = acc.getGameSessionId();

		Game.getInstance().changeCoordinates(userId, changedY, changedX,
				changedZoom, salary);
		System.out.println(changedY + ", " + changedX + ", " + changedZoom);

		/*
		 * StringBuffer XMLResponse = new StringBuffer();
		 * XMLResponse.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n"
		 * ); XMLResponse.append("<response>\n");
		 * XMLResponse.append(Game.getInstance(gId).getMap().toXMLContent());
		 * XMLResponse.append(Game.getInstance(gId).toXMLContent());
		 * XMLResponse.append("</response>\n");
		 * response.setContentType("application/xml");
		 * response.getWriter().println(XMLResponse);
		 */
	}

	private void gamedataRetrievalHandler(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		System.out
				.println("Running gamechangedatahandler method in ServletCreateGame class");
		String uId = request.getParameter("userId");
		String userName = request.getParameter("userName");

		Account acc = new Account(uId, userName);
		System.out.println("**USER ID IS: " + uId + "**");
		System.out.println("**USER NAME IS: " + userName + "**");
		System.out.println("**GAME ID IS: " + acc.getGameSessionId() + "**");

		String gId = acc.getGameSessionId();

		Game.getInstance().currentGameInfo(uId, gId);

		StringBuffer XMLResponse = new StringBuffer();
		XMLResponse.append("<?xml version=\"1.0\" encoding=\"ISO-8859-1\"?>\n");
		XMLResponse.append("<response>\n");
		XMLResponse.append(Game.getInstance().toXMLContent());
		XMLResponse.append(Game.getInstance().getMap().toXMLContent());
		XMLResponse.append("</response>\n");
		response.setContentType("application/xml");
		response.getWriter().println(XMLResponse);
		System.out.println("<------------------Print it------------------->");
		System.out.println(XMLResponse);
	}

}
