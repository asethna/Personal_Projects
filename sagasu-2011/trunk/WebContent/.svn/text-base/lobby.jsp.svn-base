<%@ include file="userprofile.jsp"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="./css/style.css" type="text/css">
<script type="text/javascript" src='http://code.jquery.com/jquery-latest.min.js'></script>
<script type="text/javascript" src='scripts/Utility.js'></script>
<script src="http://platform.twitter.com/anywhere.js?id=SqaAULlSoN50D7WwOWWQ&v=1" type="text/javascript"></script>
<script
	src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=AIzaSyDvg5_7JCwCLtunz2QXPyxnKUR9CDiCZNU"
	type="text/javascript">
</script>
<title>Game Lobby</title>
<script type="text/javascript" src="scripts/lobby.js"></script>
</head>
<body onload="init()" onunload="GUnload()">

<table id="game" border=0>
	<tr>
		<td id="left" colspan=3>
		
			<table>
				<tr>
					<td>Lobby Leader: </td>
					<td><div id="userName"><img src="./images/loading.gif" height=25></div></td>
				</tr>
			</table>
					
		</td>
	</tr>
	<tr>
		<td width=500><img src="./images/landmarks.png" name="gameModePicture">
		<!-- <div id="gameModePicture" style="width: 500px; height: 300px">...</div>--></td>
		<td id="lobby" width=175>
			Game Mode
			 
			
			<br>
			<div id="invitation">Invite Friends</div>
			<a href="#" onclick="javascript:quitGame()">Leave this Lobby</a><br>
			<div id="startGame">Start Game</div></td>
		<td onmouseover="showmenu('gameModes')" onmouseout="hidemenu('gameModes')" id="lobby">Select <img src="./images/dropdown.png">
		
		<table id="gameModes" width="200" border=0 style="visibility: hidden;">
			   <tr><td onclick="javascript:updateGameModeImage(1)">Novice: <a href="#">Landmarks</a></td></tr>
			   <tr><td onclick="javascript:updateGameModeImage(2)">Intermediate: <a href="#">State/Province</a></td></tr>
			   <tr><td onclick="javascript:updateGameModeImage(3)">Expert: <a href="#">City</a></td></tr>
		</table>
		
		</td>
	</tr>
</table>


</body>
</html>

</td>
</tr>

</table>
