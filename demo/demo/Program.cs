﻿using System;
using System.IO;
using System.Threading;
using Microsoft.Office.Interop.Excel;
using System.Xml;

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

    public void GenerateReport(String input, System.Windows.Forms.Label label)
    {

      try
      {
        String excelOut = Directory.GetCurrentDirectory() + "\\out.xlsx";
        //start to create the excel sheet.
        if (File.Exists(excelOut))
          File.Delete(excelOut);

        System.Diagnostics.Process process = null;
        if (process == null)
        {
          process = new System.Diagnostics.Process();
          webProcess(input, ref process);
          string outputFile = Directory.GetCurrentDirectory() + "\\data.xml";
          int count = 1;
          while (true)
          {
            Thread.Sleep(5000);
            count++;
            if (count == 5)
            {
              error(label);
              break;
            }
            if (process.HasExited)
            {
              if (!File.Exists(outputFile))
                error(label);

              ExcelActions xla = new ExcelActions();
              xla.GetWorkbook(excelOut);
              xla.QuickSave(excelOut);
              _Worksheet ws = xla.SetWorksheetName(excelOut, "sample");
              xla.WriteToXL(ws, 1, 1, "Name");
              xla.WriteToXL(ws, 1, 2, "Review");
              xla.WriteToXL(ws, 1, 3, "Price");

              XmlDocument data = new XmlDocument();
              data.Load(outputFile);

              XmlNode node = data.DocumentElement.SelectSingleNode("/root");
              int row = 1;
              foreach (XmlNode type in node.ChildNodes)
              {
                row++;
                int col = 1;
                foreach (XmlNode item in type.ChildNodes)
                {
                  xla.WriteToXL(ws, row, col, item.InnerText);
                  col++;
                  xla.QuickSave(excelOut);
                }
                xla.QuickSave(excelOut);
              }
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
            break;
          }
        }
      }
      catch
      {
        error(label);
      }
    }

    public void webProcess(String input, ref System.Diagnostics.Process process)
    {
      System.Diagnostics.ProcessStartInfo startInfo = new System.Diagnostics.ProcessStartInfo();
      startInfo.FileName = Directory.GetCurrentDirectory() + "\\scrape.py ";
      startInfo.Arguments = "\"" + input + "\"";
      process.StartInfo = startInfo;
      process.Start();
    }

    public void error(System.Windows.Forms.Label label)
    {
      label.Visible = true;
      label.BackColor = System.Drawing.Color.Yellow;
      label.ForeColor = System.Drawing.Color.Red;
      label.Text = "Unable to Generate Excel";
    }
  }
}