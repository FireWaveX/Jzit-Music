<!DOCTYPE html> 
<html>
<head>
<meta charset="UTF-8">
<title></title>
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet">
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


<section>

	 <div class="content Ho"> <!-- w3-include-html="html/Homepage.php" -->

	 	<button class="action" type="button">Send</button>

	 	<div id="listOfSongs">
	 		


	 	</div>

	 </div>


	 <div class="content Re" hidden> <!-- w3-include-html="html/Request.php" -->

	 	<form>
		  Link of the song:<br>
		  <input type="text" name="firstname" class="link"><br>
		  Message:<br>
		  <input type="text" name="lastname" class="message">
		</form>

		<button class="request_button" type="button">Send</button>

	 </div>


	 <div class="content Ab" hidden></div>  <!-- w3-include-html="html/About.php" -->
	 <div class="content Lo" hidden></div> <!-- w3-include-html="html/Login.php" -->

</section>


<script type='text/javascript' src='js/jquery.js'></script>
<script type='text/javascript' src='js/jquery-ui.js'></script>
<script type='text/javascript' src='js/main.js'></script>
</body>
</html>
