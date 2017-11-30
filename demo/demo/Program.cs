using System;
using System.IO;
using System.Threading;
using Microsoft.Office.Interop.Excel;
using System.Xml;
using System.Data.SqlClient;
using System.Collections.Generic;
using System.Linq;

namespace demo
{
  class Program
  {
    /// <summary>
    /// The main entry point for the application.
    /// </summary>
    [STAThread]
    static void Main()
    {
      System.Windows.Forms.Application.EnableVisualStyles();
      System.Windows.Forms.Application.SetCompatibleTextRenderingDefault(false);
      System.Windows.Forms.Application.Run(new Form1());
    }

    /// <summary>
    /// Adds the items in the mapsWeb using the URL to the database.
    /// Generates the Excel report using the user input.
    /// </summary>
    /// <param name="input">User input on what to query</param>
    /// <param name="label">label in the UI to notify user if it was successful/failure</param>
    /// <param name="mapsWeb">Map of product names and their URLs</param>
    public void GenerateReport(String input, System.Windows.Forms.Label label, Dictionary<String, String> mapsWeb)
    {
      ExcelActions xla = new ExcelActions();
      SQLHandler sh = new SQLHandler();
      SqlConnection connection = null;
      try
      {
        if (String.IsNullOrEmpty(input))
        {
          Error(label, "User input is empty", xla, sh, connection);
          return;
        }

        String excelOut = $@"{Directory.GetCurrentDirectory()}\Sheet1.xlsx";
        //remove existing excel sheet.
        if (File.Exists(excelOut))
          File.Delete(excelOut);

        //Add the products to DB
        AddToDB(mapsWeb, label, sh, ref connection);

        //Select the columns where it matches the user input
        String userOutput = sh.ConditionalSelectAllTable(connection, "products", "type='" + input + "'");

        if (String.IsNullOrEmpty(userOutput))
        {
          Error(label, "Database is empty", xla, sh, connection);
          return;
        }

        //create and write the name, price and review to the excel sheet
        xla.GetWorkbook(excelOut);
        xla.QuickSave(excelOut);
        _Worksheet ws = xla.SetWorksheetName(excelOut, "sample");
        xla.WriteToXL(ws, 1, 1, "Name");
        xla.WriteToXL(ws, 1, 2, "Review");
        xla.WriteToXL(ws, 1, 3, "Price");

        //parse the sql db output to add the values to excel
        string[] userOutputArray = userOutput.Split('\n');
        for (int row = 0; row < userOutputArray.Length; row++)
        {
          string[] items = userOutputArray[row].Split('|');
          for (int col = 0; col < items.Length - 1; col++)
          {
            xla.WriteToXL(ws, row + 2, col + 1, items[col]);
          }
        }

        //auto arrange the rows
        dynamic allDataRange = ws.UsedRange;
        allDataRange.WrapText = false;
        allDataRange.Columns.AutoFit();
        allDataRange.Sort(Key1: allDataRange.Columns[1], Order1: XlSortOrder.xlAscending, Header: XlYesNoGuess.xlYes);
        ws.ListObjects.AddEx(XlListObjectSourceType.xlSrcRange, Type.Missing, Type.Missing, XlYesNoGuess.xlYes, Type.Missing, Type.Missing);
        xla.SaveWorkbook(excelOut);

        //show to user that sheet is created
        label.Visible = true;
        label.BackColor = System.Drawing.Color.Yellow;
        label.ForeColor = System.Drawing.Color.Green;
        label.Text = "Generated Excel in Documents Folder";

        //close the excel sheet
        xla.CloseXL();
        //delete the sql table
        sh.DeleteTable(connection, "products");
        //close sql connection
        sh.CloseSQLConnection(conn: ref connection);
      }
      catch
      {
        //update the label to notiify to user there is an error
        Error(label, "Unable to create Excel", xla, sh, connection);
        return;
      }
    }

    /// <summary>
    /// Create a process to call python script and using URL to generate XML
    /// </summary>
    /// <param name="input">String URL of the webpage to scrape</param>
    /// <param name="process">Process passed down to generate DB (console call)</param>
    public void WebProcess(String input, ref System.Diagnostics.Process process)
    {
      System.Diagnostics.ProcessStartInfo startInfo = new System.Diagnostics.ProcessStartInfo();
      startInfo.FileName = Directory.GetCurrentDirectory() + "\\scrape.py ";
      startInfo.Arguments = "\"" + input + "\"";
      process.StartInfo = startInfo;
      process.Start();
    }

    /// <summary>
    /// Communicates to the UI and closes opened Excel Sheet and DB connection if error occurs.
    /// </summary>
    /// <param name="label">label in the UI to notify user if it was successful/failure</param>
    /// <param name="text">String text to display to UI</param>
    /// <param name="xla">ExcelActions Object inorder to close</param>
    /// <param name="sh">SQLHandler Object inorder to close</param>
    /// <param name="connection">to delete the table and disconnect</param>
    public void Error(System.Windows.Forms.Label label, String text, ExcelActions xla, SQLHandler sh, SqlConnection connection)
    {
      label.Visible = true;
      label.BackColor = System.Drawing.Color.Yellow;
      label.ForeColor = System.Drawing.Color.Red;
      label.Text = text;
      if (xla != null)
        xla.CloseXL();
      if (sh != null && connection != null)
      {
        sh.DeleteTable(connection, "products");
        sh.CloseSQLConnection(conn: ref connection);
      }
    }

    /// <summary>
    /// Calls the scrape function and adds it to the DB
    /// </summary>
    /// <param name="label">label in the UI to notify user if it was successful/failure</param>
    /// <param name="mapsWeb">Map of product names and their URLs</param>
    /// <param name="sh">SQLHandler Object inorder to close</param>
    /// <param name="connection">to delete the table and disconnect</param>
    public void AddToDB(Dictionary<String, String> mapsWeb, System.Windows.Forms.Label label, SQLHandler sh, ref SqlConnection connection)
    {
      //start a process to call python script
      System.Diagnostics.Process process = null;
      sh.OpenSQLConnection(conn: ref connection);
      sh.CreateTable(connection, "products", "name varchar(500), price int, review int, type varchar(500)");

      if (process == null)
      {
        //add items to db
        process = new System.Diagnostics.Process();
        foreach (String mw in mapsWeb.Keys.ToList())
        {
          WebProcess(mapsWeb[mw], ref process);
          string outputFile = Directory.GetCurrentDirectory() + "\\data.xml";
          int count = 1;
          while (true)
          {
            Thread.Sleep(5000);
            count++;
            if (count == 5)
            {
              Error(label, "Unable to generate SQL", null, sh, connection);
              break;
            }
            if (process.HasExited)
            {
              if (!File.Exists(outputFile))
              {
                Error(label, "Unable to generate SQL", null, sh, connection);
                return;
              }

              //parse the xml and add to sql db
              XmlDocument data = new XmlDocument();
              data.Load(outputFile);

              XmlNode node = data.DocumentElement.SelectSingleNode("/root");
              foreach (XmlNode type in node.ChildNodes)
              {
                String value = "";
                foreach (XmlNode item in type.ChildNodes)
                {
                  String xmlText = item.InnerText.Replace("$", "");
                  if (Int32.TryParse(xmlText, out int output))
                    value += xmlText + ",";
                  else
                    value += "'" + xmlText.Replace("'", "") + "',";
                }
                if (!String.IsNullOrEmpty(value))
                  sh.TableInsert(connection, "products", "name,price,review,type", value + "'" + mw + "'");
              }
            }
            break;
          }
        }
      }
    }
  }
}
