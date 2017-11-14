<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<%@ page import="servlets.*"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="./css/style.css" type="text/css">
<title>User Profile</title>
<script type="text/javascript" src='http://code.jquery.com/jquery-latest.min.js'></script>
<script type="text/javascript" src='scripts/Utility.js'></script>
<script type="text/javascript" src="http://platform.twitter.com/anywhere.js?id=SqaAULlSoN50D7WwOWWQ&v=1"></script>
<script type="text/javascript" src="scripts/userprofile.js"></script>
</head>
<body>
	<table id="primary" cellspacing=0 cellpadding=0>
		<tr>
			<td class="left_nav_container" rowspan=2>
				<table class="left_nav_table" border=0 cellspacing=0 cellpadding=0>
					<tr>
						<td height=30>&nbsp;</td>
					</tr>
					<tr>
						<td class="left_nav_td"><img src="./images/logo.png"
							width=200></td>
					</tr>
					<tr>
						<td class="left_nav_td"><p id="userdetails"></p></td>
					</tr>
					<tr>
						<td class="left_nav_td">
							<p>
								<img src="./images/left_div.png"> <br>Points: <span
									id="pointsId">Loading...</span> <br>Level: <span
									id="userLevelId">Loading...</span>
							<p>
								<img src="./images/left_div.png">
							</p>
						</td>
					<tr>
					<tr>
						<td height=30>&nbsp;</td>
					</tr>
					<tr>
						<td class="left_nav_td">
							<div id="tbox"></div>
						</td>
					</tr>
					<tr>
						<td class="left_nav_td">
							<div id="tweets" align="center">Loading...</div> 
							<script src="http://widgets.twimg.com/j/2/widget.js"></script> 
							<script type="text/javascript">
									new TWTR.Widget({
											id : 'tweets',
											version : 2,
											type : 'search',
											search : '#SAGASU410',
											interval : 30000,
											title : 'Live Feed',
											subject : '#SAGASU410',
											width : 250,
											height : 300,
											theme : {
												shell : {
													background : '#28476f',
													color : '#ffffff'
												},
												tweets : {
													background : '#ffffff',
													color : '#444444',
													links : '#1985b5'
												}
											},
											features : {
												scrollbar : true,
												loop : false,
												live : true,
												behavior : 'all'
											}
									}).render().start();
								</script>

						</td>
					</tr>					
				</table>


			</td>
			<td height=50>


				<table id="topnav">
					<tr>
						<td id="topnavtd"><a href="followers.jsp">Home</a></td>
						<td id="topnavtd"><a href="lobby.jsp">Create Game</a></td>
						<td id="topnavtd"><a href="shop.jsp">Visit Shop</a></td>
						<td id="dropdown"><a id="signout" href="#">Sign Out</a></td>
						<td width=25></td>
					</tr>
				</table>
				<hr>

			</td>
		</tr>
		<tr>
			<td id="maincontent">
