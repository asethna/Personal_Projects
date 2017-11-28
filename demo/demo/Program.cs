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

    public void GenerateReport(String input, System.Windows.Forms.Label label, Dictionary<String, String> mapsWeb)
    {
      ExcelActions xla = new ExcelActions();
      SQLHandler sh = new SQLHandler();
      SqlConnection connection = null;
      try
      {
        String excelOut = Directory.GetCurrentDirectory() + "\\out.xlsx";
        //start to create the excel sheet.
        if (File.Exists(excelOut))
          File.Delete(excelOut);

        AddToDB(mapsWeb, label, sh, ref connection);

        String userOutput = sh.ConditionalSelectAllTable(connection, "products", "type='" + input + "'");

        if (String.IsNullOrEmpty(userOutput))
        {
          throw new Exception("");
        }

        xla.GetWorkbook(excelOut);
        xla.QuickSave(excelOut);
        _Worksheet ws = xla.SetWorksheetName(excelOut, "sample");
        xla.WriteToXL(ws, 1, 1, "Name");
        xla.WriteToXL(ws, 1, 2, "Review");
        xla.WriteToXL(ws, 1, 3, "Price");

        string[] userOutputArray = userOutput.Split('\n');
        for (int row = 0; row < userOutputArray.Length; row++)
        {
          string[] items = userOutputArray[row].Split('|');
          for (int col = 0; col < items.Length-1; col++)
          {
            xla.WriteToXL(ws, row+2, col+1, items[col]);
          }
        }

        sh.DeleteTable(connection, "products");
        sh.CloseSQLConnection(conn: ref connection);
        dynamic allDataRange = ws.UsedRange;
        allDataRange.WrapText = false;
        allDataRange.Columns.AutoFit();
        allDataRange.Sort(Key1: allDataRange.Columns[1], Order1: XlSortOrder.xlAscending, Header: XlYesNoGuess.xlYes);
        ws.ListObjects.AddEx(XlListObjectSourceType.xlSrcRange, Type.Missing, Type.Missing, XlYesNoGuess.xlYes, Type.Missing, Type.Missing);
        xla.SaveWorkbook(excelOut);
        xla.CloseXL();

        label.Visible = true;
        label.BackColor = System.Drawing.Color.Yellow;
        label.ForeColor = System.Drawing.Color.Green;
        label.Text = "Generated Excel in Documents Folder";
      }
      catch (Exception e)
      {
        xla.CloseXL();
        Console.WriteLine(e);
        Error(label, "Unable to create Excel");
      }
    }

    public void WebProcess(String input, ref System.Diagnostics.Process process)
    {
      System.Diagnostics.ProcessStartInfo startInfo = new System.Diagnostics.ProcessStartInfo();
      startInfo.FileName = Directory.GetCurrentDirectory() + "\\scrape.py ";
      startInfo.Arguments = "\"" + input + "\"";
      process.StartInfo = startInfo;
      process.Start();
    }

    public void Error(System.Windows.Forms.Label label, String text)
    {
      label.Visible = true;
      label.BackColor = System.Drawing.Color.Yellow;
      label.ForeColor = System.Drawing.Color.Red;
      label.Text = text;
    }

    public void AddToDB(Dictionary<String, String> mapsWeb, System.Windows.Forms.Label label, SQLHandler sh, ref SqlConnection connection)
    {
      System.Diagnostics.Process process = null;
      sh.OpenSQLConnection(conn: ref connection);
      sh.CreateTable(connection, "products", "name varchar(500), price int, review int, type varchar(500)");

      if (process == null)
      {
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
              Error(label, "Unable to generate SQL");
              break;
            }
            if (process.HasExited)
            {
              if (!File.Exists(outputFile))
                Error(label, "Unable to generate SQL");
              
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
