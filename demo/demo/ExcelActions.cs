using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Office.Interop.Excel;
using System.Text.RegularExpressions;
using System.Globalization;
using System.Diagnostics;

namespace demo
{
  /// <summary>
  /// This is an interface between Excel
  /// </summary>
  /// <creator>
  /// Afsha Sethna
  /// </creator>
  public class ExcelActions
  {
    //variables used by the class.
    _Application xlApp = null;
    _Workbook WB = null;


    /// <summary>
    /// Start the application running. Also has customization to show the application and popups
    /// </summary>
    /// <returns>Excel application Object</returns>
    public _Application OpenXL()
    {
      xlApp = new Microsoft.Office.Interop.Excel.Application();
      xlApp.Visible = true;
      xlApp.DisplayAlerts = false;
      return xlApp;
    }

    /// <summary>
    /// Open the workbook using the given path. If no workbook found, it will create one and save it to the locaiton given
    /// </summary>
    /// <param name="workbookPath">The location of workbook as a String</param>
    /// <returns>A Workbook Object</returns>
    public _Workbook GetWorkbook(String workbookPath)
    {
      try
      {
        if (xlApp == null)
        {
          xlApp = OpenXL();
        }
        if (WB == null)
        {
          if (System.IO.File.Exists(workbookPath))
          {
            _Workbook Workbook = xlApp.Workbooks.Open(workbookPath);
            WB = Workbook;
          }
          else
          {
            WB = xlApp.Workbooks.Add(XlWBATemplate.xlWBATWorksheet);
          }
        }
        return WB;
      }
      catch
      {
        throw new ApplicationException("Unable to find or create Workbook");
      }
    }

    /// <summary>
    /// Select the worksheet if found. Create a new worksheet with the given name only if not found. 
    /// </summary>
    /// <param name="workbookPath">The location of workbook as a String</param>
    /// <param name="name">name - Name of sheet, to be added or retrieved, of workbook as a String. Lenght limit is less than 30 characters.</param>
    /// <returns>The _Worksheet Object</returns>
    public _Worksheet SetWorksheetName(String workbookPath, String name)
    {
      if (String.IsNullOrWhiteSpace(name))
        throw new ArgumentNullException(name);

      if (name.Length > 30)
        throw new ArgumentOutOfRangeException(name);

      try
      {
        _Worksheet ws = GetWorksheet(workbookPath, name);
        if (ws == null)
        {
          ws = WB.Worksheets.Add();
          ws.Name = name;
        }
        else
        {
          ws.Delete();
          SetWorksheetName(workbookPath, name);
        }
        return ws;
      }
      catch
      {
        throw new ApplicationException("Unable to Retrieve or Add Sheet to the Workbook ");
      }
    }

    /// <summary>
    /// Write the input text to the worksheet given row and column (this is different then append as it will overwrite the current input)
    /// </summary>
    /// <param name="worksheet">A valid _Worksheet Object</param>
    /// <param name="row">row number of the workshet as integer</param>
    /// <param name="col">column number of the worksheet as integer</param>
    /// <param name="input">String value</param>
    public void WriteToXL(_Worksheet worksheet, int row, int col, String input)
    {
      try
      {
        worksheet.Cells[row, col].Value = input;
      }
      catch
      {
        throw new ApplicationException("Unable to add input to the cell/row provide");
      }
    }

    /// <summary>
    /// Close excel application
    /// </summary>
    public void CloseXL()
    {
      if (xlApp != null)
        xlApp.Quit();
    }

    /// <summary>
    /// Save and close the workbook at the given path
    /// </summary>
    /// <param name="workbookPath">The location of workbook as a String</param>
    public void SaveWorkbook(String workbookPath)
    {
      try
      {
        WB = GetWorkbook(workbookPath);
        WB.Save();
        WB.Close();
        WB = null;
      }
      catch
      {
        throw new ApplicationException("Unable to Save and Close the Workbook: " + workbookPath);
      }
    }

    /// <summary>
    /// Save the workbook at the given path
    /// </summary>
    /// <param name="workbookPath">The location of workbook as a String</param>
    public void QuickSave(String workbookPath)
    {
      try
      {
        WB = GetWorkbook(workbookPath);
        WB.Save();
      }
      catch
      {
        throw new ApplicationException("Unable to QuickSave the Workbook: " + workbookPath);
      }
    }

    /// <summary>
    /// Get list of worksheets in workbook
    /// </summary>
    /// <param name="workbookPath">The location of workbook as a String</param>
    /// <returns> A list of _Worksheet Object for the workbook given</returns>
    public List<_Worksheet> ListWorksheets(String workbookPath)
    {
      try
      {
        WB = GetWorkbook(workbookPath);
        List<_Worksheet> worksheets = new List<_Worksheet>();
        for (int index = 1; index <= WB.Sheets.Count; index++)
        {
          worksheets.Add(WB.Worksheets[index]);
        }
        return worksheets;
      }
      catch
      {
        throw new ApplicationException("Unable to retrieve the list of Worksheets in the Workbook: " + workbookPath);
      }
    }

    /// <summary>
    /// Get worksheet for the given name
    /// </summary>
    /// <param name="workbookPath">The location of workbook as a String</param>
    /// <param name="name">Name of sheet of workbook as a String</param>
    /// <returns>The _Worksheet Object</returns>
    public _Worksheet GetWorksheet(String workbookPath, String name)
    {
      if (String.IsNullOrWhiteSpace(name))
        throw new ArgumentNullException(name);

      foreach (_Worksheet ws in ListWorksheets(workbookPath))
      {
        if (ws.Name.Equals(name))
        {
          return ws;
        }
      }
      Console.WriteLine("Worksheet " + name + " not found Workbook " + workbookPath);
      return null;
    }
  }
}
