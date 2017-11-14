package classes;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.Scanner;

/**
 * This program reads a text file line by line and print to the console. It uses
 * FileOutputStream to read the file.
 * 
 */
public class Trial {

	String address, city, region;

	public static void main(String[] args) {
		Trial t = new Trial();
		t.parseAnswer("N Bypass, Dalton, GA 30720, USA");
		t.parseAnswer("County Road 35, Troy, AL 36079, USA");
		t.parseAnswer("4877-4995 County Road 277, Greer, SC 29651, USA");
		t.parseAnswer("964 County Street 2979, Tuttle, OK 73089, USA");

	}

	public String lookUpRegion(String name) {
		FileInputStream fis;
		try {
			fis = new FileInputStream("src/classes/abbreviations.txt");
			Scanner scanner = new Scanner(fis, "UTF-8");
			try {
				while (scanner.hasNextLine()) {
					String str = scanner.nextLine();
					int r = str.indexOf('=');
					String k = str.substring(r + 1, str.length());
					if (k.equals(name)) {
						return str.substring(0, r);
					}
				}
			} finally {
				scanner.close();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		}
		return null;
	}

	public void parseAnswer(String location) {
		int count = 0;
		int start = 0;
		for (int currIndex = 0; currIndex < location.length(); currIndex++) {
			if (location.charAt(currIndex) == ',') {
				if (count == 0) {
					start = currIndex + 2;
					address = location.substring(0, currIndex).replaceAll(
							"[,\\d,\\-,\\s]+", "");
				}
				if (count == 1) {
					city = location.substring(start, currIndex);
					region = location.substring(currIndex + 2, currIndex + 4);
					region = lookUpRegion(region);
					System.out.println(address);
					System.out.println(city);
					System.out.println(region);
					System.out.println();
				}
				count++;
			}
		}
	}
}
