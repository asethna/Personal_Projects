using System;
using System.Data.SqlClient;

namespace demo
{
  class SQLHandler
  {
    /// <summary>
    /// Opens the SQL connection
    /// </summary>
    /// <param name="conn">An SqlConnection object</param>
    public void OpenSQLConnection(ref SqlConnection conn)
    {
      if (conn == null)
      {
        conn = new SqlConnection("Server=localhost;Database=master;Trusted_Connection=True;");
      }
      conn.Open();
    }

    /// <summary>
    /// Close the SQL connection
    /// </summary>
    /// <param name="conn">An SqlConnection object</param>
    public void CloseSQLConnection(ref SqlConnection conn)
    {
      if (conn != null)
      {
        if (conn.State.ToString().Equals("Open"))
        {
          conn.Close();
        }
      }
    }

    /// <summary>
    /// Creates a table in the given connection
    /// </summary>
    /// <param name="conn">An SqlConnection object</param>
    /// <param name="tableName">Name o fthe table to add</param>
    /// <param name="columns">Name of the columns to add</param>
    public void CreateTable(SqlConnection conn, String tableName, String columns)
    {
      SqlCommand cmd = new SqlCommand();
      SqlTransaction transaction = conn.BeginTransaction();
      try
      {
        cmd.Connection = conn;
        cmd.CommandText = "CREATE TABLE " + tableName + " (ID int IDENTITY(1,1) PRIMARY KEY," + columns + ")";
        cmd.Transaction = transaction;
        cmd.ExecuteNonQuery();
        transaction.Commit();
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        transaction.Rollback();

      }
    }

    /// <summary>
    ///  Insert item into table
    /// </summary>
    /// <param name="conn">An SqlConnection object</param>
    /// <param name="tableName">Name o fthe table to add</param>
    /// <param name="columns">Name of the columns to add</param>
    /// <param name="values">Data of the values to add</param>
    public void TableInsert(SqlConnection conn, String tableName, String columns, String values)
    {
      SqlCommand cmd = new SqlCommand();
      SqlTransaction transaction = conn.BeginTransaction();
      try
      {
        cmd.Connection = conn;
        cmd.CommandText = "INSERT INTO " + tableName + " (" + columns + ") values (" + values + ")";
        cmd.Transaction = transaction;
        cmd.ExecuteNonQuery();
        transaction.Commit();
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        transaction.Rollback();
      }
    }

    /// <summary>
    /// Select all columns from the given tableName.
    /// </summary>
    /// <param name="conn">An SqlConnection object</param>
    /// <param name="tableName">Name o fthe table to add</param>
    /// <returns></returns>
    public String SelectTableAll(SqlConnection conn, String tableName)
    {
      SqlCommand cmd = new SqlCommand("SELECT * FROM " + tableName, conn);
      String val = "";
      SqlDataReader read = cmd.ExecuteReader();
      while (read.Read())
      {
        val += read["name"].ToString() + "|" + read["price"].ToString() + "|" + read["review"].ToString() + "|" + read["type"].ToString() + "\n";
      }
      read.Close();
      return val;
    }

    /// <summary>
    /// Select all columns from the given tableName where condition matches.
    /// </summary>
    /// <param name="conn">An SqlConnection object</param>
    /// <param name="tableName">Name o fthe table to add</param>
    /// <param name="condition">String of the condition to match</param>
    /// <returns></returns>
    public String ConditionalSelectAllTable(SqlConnection conn, String tableName, String condition)
    {
      SqlCommand cmd = new SqlCommand("SELECT * FROM " + tableName + " WHERE " + condition, conn);
      String val = "";
      SqlDataReader read = cmd.ExecuteReader();
      while (read.Read())
      {
        val += read["name"].ToString() + "|" + read["price"].ToString() + "|" + read["review"].ToString() + "|" + read["type"].ToString() + "\n";
      }
      read.Close();
      return val;
    }

    /// <summary>
    /// Delete the given tableName
    /// </summary>
    /// <param name="conn">An SqlConnection object</param>
    /// <param name="tableName">Name o fthe table to add</param>
    public void DeleteTable(SqlConnection conn, String tableName)
    {
      SqlCommand cmd = new SqlCommand();
      SqlTransaction transaction = conn.BeginTransaction();
      try
      {
        cmd.Connection = conn;
        cmd.CommandText = "DROP TABLE " + tableName;
        cmd.Transaction = transaction;
        cmd.ExecuteNonQuery();
        transaction.Commit();
      }
      catch (Exception e)
      {
        Console.WriteLine(e);
        transaction.Rollback();
      }
    }
  }
}
