<!DOCTYPE html> 
<html>
<head>
<meta charset="UTF-8">
<title></title>
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="css/style.css" />
</head>
<body>

<header>
	<h1>Jzit Music</h1>
	 <ul>
	  <li><a class="active menu Hom">Homepage</a></li>
	  <li><a class="menu Req">Request a song</a></li>
	  <li><a class="menu Abo">About</a></li>
	  <li><a class="menu Log">Login</a></li>
	</ul> 
</header>


<section id="sec1">

	<div id="Ho" class="content Ho"> <!-- w3-include-html="html/Homepage.php" -->

		<!-- <button class="action" type="button">Send</button> --> <!-- non vue.js option -->
	 	<!-- <button v-on:click="request_button2">Send</button> --> <!-- no need, automatic now -->

	 	<div id="listOfSongs">
	 		
	 	</div>

	 	<div id="sing-btn">
	 		<button v-on:click="request_button2">Let's sing !</button>
	 	</div>

	</div>


	<div id="Re" class="content Re" hidden> <!-- w3-include-html="html/Request.php" -->

	 	<form>
		  Link of the song<br>
		  <input type="text" name="firstname" class="link"><br>
		  Message<br>
		  <input type="text" name="lastname" class="message">
		</form>

		<button class="request_button" type="button">Send</button>
		

	</div>


	<div class="content Ab" hidden>
		<p>About this website</p>
	</div>  <!-- w3-include-html="html/About.php" -->

	<div class="content Lo" hidden>
		<p>You must login before using this website</p>
	</div> <!-- w3-include-html="html/Login.php" -->

</section>

<footer>
	Copyright Alexandre Ledemé & Thibaut Martinot 2018
</footer>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script type='text/javascript' src='js/jquery.js'></script>
<script type='text/javascript' src='js/jquery-ui.js'></script>
<script type='text/javascript' src='js/main.js'></script>
</body>
</html>
