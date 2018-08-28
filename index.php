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
	 	<h2>Song list</h2>

	 	<div id="listOfSongs">
	 		
	 	</div>

	 	<div id="sing-btn">
	 		<button v-on:click="request_button2">Let's sing !</button>
	 	</div>

	</div>


	<div id="Re" class="content Re" hidden> <!-- w3-include-html="html/Request.php" -->

	 	<form>
		  Youtube link of the song<br>
		  <input type="text" id="link" name="link" class="link"><br>
		  Your message<br>
		  <textarea id="message" name="message" class="message"></textarea>
		</form>

		<button class="request_button" type="button">Request</button>
		

	</div>


	<div class="content Ab" hidden>
			<p>About this website</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			<br/><br/>
			Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
			<img class="singer-img" src="images/Singer.png">
	</div>  <!-- w3-include-html="html/About.php" -->

	<div id="Re" class="content Lo" hidden>
		<form>
		  Username<br>
		  <input type="text" id="username" name="username" class="username"><br>
		  Password<br>
		  <input type="password" id="password" name="password" class="password">
		</form>

		<button class="login_button" type="button">Log in</button>
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
