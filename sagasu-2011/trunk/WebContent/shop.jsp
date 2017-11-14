<%@ include file="userprofile.jsp" %>

<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    
<%@ page import="servlets.*" %>
<!DOCTYPE html "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8"/>
<title>Shop</title> 
<link rel="stylesheet" href="./css/style.css" type="text/css">
</style>
<style type="text/css">
	img {cursor:pointer}
</style>
<script type="text/javascript" src='scripts/Utility.js'></script>	
<script	type="text/javascript" src="http://platform.twitter.com/anywhere.js?id=SqaAULlSoN50D7WwOWWQ&v=1"></script>
<script type="text/javascript" src="scripts/shop.js"></script>
</head>
<body>
	<table id="shop">
		<tr>
			<td colspan=4 id="header">YOUR Points: <BR><div id="pId"><img src="./images/loading.gif" height=25></div></td>
		</tr>
		<tr>
			<th id="header"> ITEM </th>
			<th id="header"> DESCRIPTION </th>
			<th id="header"> YOUR INVENTORY </th>
			<th id="header"> COST </th>
		</tr>
		<tr>
			<td><img src="./images/lettergetter.png"></td>
			<td id="left"> <h3>Letter Getter</h3> - Reveals a random letter of the location's name</td>
			<td><div id = "letterGetter"><img src="./images/loading.gif" height=25></div></td>
			<td> 2000 POINTS
			<br><button id=buyLetterGetterButton disabled = true onclick = "buyLetterGetter()"><img src="./images/buy.png"></button> </td>
		</tr>
		<tr>
			<td> <img src="./images/showscreens.png"> </td>
			<td id="left"><h3>Show Screenshots</h3> - Reveals street level photos of the pegged area</td>
			<td><div id = "screenshots"><img src="./images/loading.gif" height=25></div></td>
			<td> 3000 POINTS
			<br><button id =buyScreenshotsButton disabled=true  onclick="buyScreenshots()"><img src="./images/buy.png"></button> </td>
		</tr>
		<tr>
			<td> <img src="./images/streetlabels.png"> </td>
			<td id="left"><h3>Show Street Labels</h3> - Reveals map data on roads and street names</td>
			<td><div id = "streetLabels"><img src="./images/loading.gif" height=25></div></td>
			<td> 10000 POINTS
			<br><button id="buyStreetLabelsButton" disabled=true onclick="buyStreetLabels()"><img src="./images/buy.png"></button> </td>
		</tr>
		<tr>
			<td> <img src="./images/randomsalary.png"> </td>
			<td id="left"> <h3>Random Salary</h3> - ??? </td>
			<td><div id = "randomSalary"><img src="./images/loading.gif" height=25></div></td>
			<td> 2000 Points
			<br><button id=buyRandomSalaryButton disabled=true onclick ="buyRandomSalary()"><img src="./images/buy.png"></button> </td>
		</tr>
	</table>

</body> 
 
</html> 


		</td>
	</tr>

</table>


</body>
</html>
