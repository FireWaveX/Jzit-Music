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
	
	 <div class="content Ho" w3-include-html="html/Homepage.php"></div>
	 <div class="content Re" hidden w3-include-html="html/Request.php"></div>
	 <div class="content Ab" hidden w3-include-html="html/About.php"></div>
	 <div class="content Lo" hidden w3-include-html="html/Login.php"></div>

</section>


<script type='text/javascript' src='js/jquery.js'></script>
<script type='text/javascript' src='js/jquery-ui.js'></script>
<script type='text/javascript' src='js/main.js'></script>
</body>
</html>
