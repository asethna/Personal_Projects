using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Security;

namespace demo
{
  class SQLHandler
  {
    public void OpenSQLConnection(ref SqlConnection conn)
    {
      if (conn == null)
      {
        conn = new SqlConnection("Server=localhost;Database=master;Trusted_Connection=True;");
      }
      conn.Open();
    }

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
      catch
      {
        transaction.Rollback();

      }
    }

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
      catch
      {
        transaction.Rollback();
      }
    }
    public String SelectTable(SqlConnection conn, String tableName, String columns)
    {
      SqlCommand cmd = new SqlCommand("SELECT " + columns + " FROM " + tableName, conn);
      String val = "";
      SqlDataReader read = cmd.ExecuteReader();
      while (read.Read())
      {
        val += read["name"].ToString() + "|" + read["price"].ToString() + "|" + read["review"].ToString() + "\n";
      }
      read.Close();
      return val;
    }

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
      catch
      {
        transaction.Rollback();
      }
    }
  }
}
