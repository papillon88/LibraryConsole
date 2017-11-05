package com.main.handler;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/transmittodb")
public class DBInterface extends HttpServlet{
	public static final long serialVersionUID = 1L;
	private Connection dbcon = null;
	private Statement stmt = null;
	private ResultSet rs = null;
	private ResultSetMetaData rsmd = null;
	
	public Connection getconn() {
		try {
			try{
				Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
			} catch (ClassNotFoundException cnf){
				cnf.printStackTrace();
			}
			dbcon = DriverManager.getConnection("jdbc:sqlserver://PAPILLON-PC:56119;" +
					   "databaseName=Company;user=abcd1234;password=abcd#12345;");
			stmt = dbcon.createStatement();
		} catch (SQLException se){
			se.printStackTrace();
		}
		return dbcon;
	}
	
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws ServletException,IOException{
		getconn();
		try {
			String sql = request.getParameter("sqlstr");
			System.out.println(sql+"=============================================");
			System.out.println("post query");
			rs = stmt.executeQuery(sql);
			///////////////////////////////////////////////
			if(rs!=null){
			rsmd = rs.getMetaData();
			PrintWriter out = response.getWriter();
			int numberOfColumns = rsmd.getColumnCount();
			out.write("[");
			//String temp="[";
			rs.next();
			while(true) {
				out.write("{");
				//temp+="{";
				for(int i = 1; i<=numberOfColumns; i++){
					out.write("\""+rsmd.getColumnName(i)+"\":\""
							+rs.getString(rsmd.getColumnName(i))+"\"");
					//temp+="\""+rsmd.getColumnName(i)+"\":\""
							//+rs.getString(rsmd.getColumnName(i))+"\"";
				if(i < numberOfColumns){
					out.write(",");
				//temp+=",";}
					}
				}
				out.write("}");
				//temp+="}";
				if(rs.next()){
					out.write(",");
					//temp+=",";
				} else {
					out.write("]");
					//temp+="]";
					//System.out.println(temp);
					break;
				}
			}
			} else {
				System.out.println("rs is null");
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