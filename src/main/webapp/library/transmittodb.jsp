<jsp:useBean id="db" class="com.main.handler.DBInterface" />
<%
	System.out.println("transmittodb call");
	db.doGet(request,response);
%>