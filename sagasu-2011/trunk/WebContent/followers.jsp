<%@ include file="userprofile.jsp" %>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Friends and Followers</title>
<script type="text/javascript" src='http://code.jquery.com/jquery-latest.min.js'></script>
<script type="text/javascript" src='scripts/Utility.js'></script>	
<script	type="text/javascript" src="http://platform.twitter.com/anywhere.js?id=SqaAULlSoN50D7WwOWWQ&v=1"></script>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
<script type="text/javascript" src="scripts/followers.js"></script>
</head>
<body>
		<table id="game">

			<tr>
				<td colspan=2>Followers:</td>
			</tr>
			<tr>
				<td id="online" colspan=2 align="center"><div id="online"></div></td>
			</tr>
			<tr>
				<td id="ingame" colspan=2 align="center"><div id="ingame"></div></td>
			</tr>
			<tr>
				<td id="offline" colspan=2 align="center"><div id="offline"></div></td>
			</tr>
			<tr>
				<td colspan=2>Followers not registered on Sagasu! </td>
			</tr>
			<tr>			
				<td id="followers" colspan=2 align="center"><div id="followers"></div></td>
			</tr>
		</table>
</body>
</html>