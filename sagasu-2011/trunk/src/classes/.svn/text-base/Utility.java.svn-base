package classes;

import java.util.Random;

/**
 * @author Edwin Chan and Afsha Sethna.
 * Utility library for other java classes
 */
public class Utility {

	private static final int NUMLINES = 90;

	/***
	 * Assigns integer values to boolean values. True is set as 1, False is set
	 * as 0.
	 * 
	 * @param booValue
	 *            boolean value to convert
	 * @return integer value determined by booValue
	 
	public static int convertBooleanToInteger(boolean booValue) {
		int intValueOfBoolean = 1;
		if (booValue == false)
			intValueOfBoolean = 0;
		return intValueOfBoolean;
	}

	/***
	 * Assigns boolean values to integer values. 1 is set to True, 0 is set to
	 * False.
	 * 
	 * @param value
	 *            integer value to convert
	 * @return a boolean value determined by the integer value
	 
	public static boolean convertIntegerToBoolean(int value) {
		boolean booValue = true;
		if (value == 0)
			booValue = false;
		return booValue;
	}
	*/

	/***
	 * Assigns String values to integer values. 1 is set to String "True", 0 is
	 * set to String "False".
	 * 
	 * @param value
	 *            integer value to convert
	 * @return a string with values determined by the integer value
	 
	public static String convertIntegerToBooleanString(int value) {
		String booValueString = "true";
		if (value == 0)
			booValueString = "false";
		return booValueString;
	}

	/***
	 * Assigns String values to integer values. 1 is set to String "True", 0 is
	 * set to String "False".
	 * 
	 * @param value
	 *            integer value to convert
	 * @return a string with values determined by the integer value
	 */
	public static String convertGameModeToString(int value) {
		String gameModeInString = "Landmark";
		if (value <= 0 || value > 4) {
			gameModeInString = "Invalid";
		}

		switch (value) {
		case 1:
			gameModeInString = "Landmark";
			break;
		case 2:
			gameModeInString = "Country";
			break;
		case 3:
			gameModeInString = "State/Province";
			break;
		case 4:
			gameModeInString = "City";
			break;
		}
		return gameModeInString;
	}

	/**
	 * Escapes the following characters into valid XML: &, < , >, ', "
	 * 
	 * @param text
	 *            Input text.
	 * @return Processed text.
	 */
	public static String processXMLEscapeChars(String text) {
		if (text != null) {
			text = text.replaceAll("&", "&amp;");
			text = text.replaceAll("<", "&lt;");
			text = text.replaceAll(">", "&gt;");
			text = text.replaceAll("\"", "&quot;");
			text = text.replaceAll("'", "&apos;");
		}
		return text;
	}

	/**
	 * Given an abbreviation of a state or province it finds the full form of that state.
	 * Example: Input GA would return Georgia and Input BC would return British Columbia.
	 * @param name - the abbreviated form of the state or province.
	 * @return string - the full form of the state or province.
	 */
	public String lookUpRegion(String name) {
		Abbreviations abr = new Abbreviations();
		String[] abbrs = abr.getAbbrs();
		for (int index = 0; index < abbrs.length; index++) {
			String str = abbrs[index];
			int r = str.indexOf('=');
			String k = str.substring(r + 1, str.length());
			if (k.equals(name)) {
				str = str.substring(0, r);
				return str;
			}
		}
		return null;
	}

	/**
	 * Generate the random row number to choose one landmark
	 */
	public int generateRandomRowNumber() {
		Random random = new Random();
		return random.nextInt(NUMLINES) + 1;
	}

	/**
	 * Setup a random landmark from the landmarks.txt
	 * @return an array - which includes, landmark #, name, y coordinates, x coordinates.
	 */
	public String[] getaLandmark() {
		Landmarks lndmrks = new Landmarks();
		String[] lmrks = lndmrks.getLmrks();
		String[] landmark = new String[4];

		int rand = generateRandomRowNumber();

		String selectedRow = lmrks[rand];
		// Parse the chosen row by using '/'
		int numMark = selectedRow.indexOf('/');
		int nameMark = selectedRow.indexOf('/', numMark + 1);
		int xMark = selectedRow.indexOf('/', nameMark + 1);
		int yMark = selectedRow.indexOf('/', xMark + 1);

		landmark[0] = selectedRow.substring(0, numMark);
		landmark[1] = selectedRow.substring(numMark + 1, nameMark);
		landmark[2] = selectedRow.substring(nameMark + 1, xMark);
		landmark[3] = selectedRow.substring(xMark + 1, yMark);
		return landmark;

	}
}
