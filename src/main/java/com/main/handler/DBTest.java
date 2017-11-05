/*package com.main.handler;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

public class DBTest {
	
	public static void main(String[] args) {
		Connection dbcon = null;
		Statement stmt = null;
		ResultSet rs = null;
		ResultSetMetaData rsmd = null;
		
		try {
			try{
				Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			} catch (ClassNotFoundException cnf){
				cnf.printStackTrace();
			}
			dbcon = DriverManager.getConnection("jdbc:sqlserver://USXXGANDHS3L1C:49172;" +
					   "databaseName=Company;user=abcd1234;password=abcd#1234;");
			stmt = dbcon.createStatement();
		} catch (SQLException se){
			se.printStackTrace();
		}
		
		
		try {
			String sql = "SELECT B.ISBN10,B.Title,BA.Fullname,BC.Branch_id,BR.branch_name,BC.No_of_copies,(BC.No_of_copies-output2.output) AS No_of_available_copies FROM BOOKS B LEFT JOIN Book_Authors BA1 on bA1.isbn10=B.isbn10 LEFT JOIN AUTHORS AS BA ON BA.Author_Id = BA1.Author_Id LEFT JOIN BOOK_COPIES AS BC ON BC.Book_id = B.isbn10 JOIN Library_Branch BR on BR.Branch_id=Bc.Branch_Id LEFT JOIN (select Branch_id, isbn, ISnull(count(1),0) as output FROM BOOK_LOANS WHERE Date_in is null group by Branch_id,isbn) AS output2 ON output2.isbn = B.isbn10 AND output2.Branch_id = BC.Branch_id  where  BA.fullname like '%%' AND b.title like '%%'  AND b.isbn10 like '%%'";
			rs = stmt.executeQuery(sql);
			rsmd = rs.getMetaData();
			int numberOfColumns = rsmd.getColumnCount();
			System.out.print("[");
			rs.next();
			while(true) {
				System.out.print("{");
				for(int i = 1; i<=numberOfColumns; i++){
					System.out.println("\""+rsmd.getColumnName(i)+"\":\""
							+rs.getString(rsmd.getColumnName(i))+"\"");
				if(i < numberOfColumns)
					System.out.print(",");
				}
				System.out.print("}");
				if(rs.next())
					System.out.print(",");
				else {
					System.out.print("]");
					break;
				}
			}
		} catch (SQLException se1){
			se1.printStackTrace();
		} finally {
			try {
				if(rs != null)
					rs.close();
				if(stmt != null)
					stmt.close();
				if(dbcon != null)
					dbcon.close();
			} catch (SQLException se2) {
				se2.printStackTrace();
			}
		}

	}

}
*/