<%@ include file="userprofile.jsp"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ page import="servlets.*"%>
<!DOCTYPE html "-//W3C//DTD XHTML 1.0 Strict//EN" 
  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8" />
<title>Start a Game</title>
<link rel="stylesheet" href="./css/nav1.css">
<link rel="stylesheet" href="./css/style.css" type="text/css">
<script type="text/javascript" src='http://code.jquery.com/jquery-latest.min.js'></script>
<script type="text/javascript" src='scripts/Utility.js'></script>
<script src="http://platform.twitter.com/anywhere.js?id=SqaAULlSoN50D7WwOWWQ&v=1" type="text/javascript"></script>
<script
	src="http://maps.google.com/maps?file=api&amp;v=2&amp;sensor=false&amp;key=AIzaSyDvg5_7JCwCLtunz2QXPyxnKUR9CDiCZNU"
	type="text/javascript">
</script>
<script type="text/javascript" src="scripts/startGame.js"></script>
</head>

<body onload="init()" onunload="GUnload()">

	<table id="outer">
		<tr>
			<td><h2>INVENTORY</h2></td>
			<td><h2>SCORE</h2></td>
			<td><h2>
					<a href="#" onclick="javascript:quitGame()">Quit Game</a>
				</h2></td>
		<tr>
			<td>


				<table id="items">
					<tr>
						<td><a href="#" onclick="javascript:getLetter()"> <img
								src="images/lettergetter.png"><br />Letter Getter<br />
								<div id="lg">x</div>
						</a></td>
						<td><a href="#" onclick="javascript:showScreenShots()"> <img
								src="images/showscreens.png"><br>Show Screenshots<br />
								<div id="ss">x</div>
						</a></td>
						<td><a href="#" onclick="javascript:randomizeSalary()"> <img
								src="images/randomsalary.png"><br>Randomize Salary<br />
								<div id="rs">x</div>
						</a></td>
						<!-- 
							<td><a href="360View.jsp" target="_blank"
								onclick="javascript:showPanoramic()"> <img
									src="images/panoramicview.png"><br>Show Panoramic
									View
							</a></td>-->
						 
						<td><a href="#" onclick="javascript:showStreetView()"> <img
								src="images/streetlabels.png"><br>Show Street Labels<br />
								<div id="sl">x</div>
						</a></td>
					</tr>
				</table>

			</td>


			<td id="dropdown">Current Score: <span id="game_salary">Loading...</span></td>
		</tr>


		<!-- begin things that matter -->
		<tr>
			<td colspan=2 id="map">
				<table>
					<tr>
						<td id="map"><div id="map_canvas"
								style="width: 700px; height: 500px">Loading...</div></td>
					</tr>
					<tr>
						<td>
							<div id="hint"></div>
						</td>
					</tr>
					<tr>
						<td id="user">
							<div id="userInput">
								Where are you? <input type="search" id="user_answer">
								<button type="button" onclick="javascript:checkAnswer()"
									id="ingameText">Submit</button>
							</div>
						</td>
					</tr>
				</table>

			</td>
			<td id="maincontent">
				<!-- start game items & inventory code --> <!--Creates table of arrows -->
				<h2>GAME ITEMS</h2>

				<table id="items">
					<tr>
						<td>
							<table id="navi">
								<tr>
									<td></td>
									<td><a href="#" onclick="javascript:advance(true,0.001)">
											<img src="./images/upArrow.png">
									</a></td>
									<td></td>
								</tr>

								<tr>
									<td><a href="#" onclick="javascript:advance(false,-0.001)"><img
											src="./images/rightArrow.png"></a></td>
									<td><a href="#" onclick="javascript:advance(null, 0)">
											<img src="./images/center.png">
									</a></td>
									<td><a href="#" onclick="javascript:advance(false, 0.001)">
											<img src="./images/leftArrow.png">
									</a></td>
								</tr>

								<tr>
									<td></td>
									<td><a href="#" onclick="javascript:advance(true, -0.001)">
											<img src="./images/downArrow.png">
									</a></td>
									<td></td>
								</tr>

								<!--zoom controls -->
								<tr>
									<td><a href="#" onclick="javascript:controlZoom(false)">
											<img src="./images/zoomout.png">
									</a></td>
									<td><a href="#" onclick="javascript:controlZoom(true)">
											<img src="./images/zoomin.png">
									</a></td>
									<td><a href="#" onclick="javascript:controlZoom(null)">
											<img src="./images/reset.png">
									</a></td>
								</tr>
							</table>

						</td>
					</tr>
				</table>



			</td>

		</tr>
	</table>

</body>
</html>