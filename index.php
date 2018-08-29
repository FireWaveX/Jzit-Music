<!DOCTYPE html> 
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Jzit Music</title>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/style.css" />
<link rel="stylesheet" type="text/css" media="screen and (max-width: 992px)" href="css/smallscreen.css" />
</head>
<body>

<div id="body">

<header>
	<h1 class="title" v-on:click="goBackHome">Jzit Music</h1>

	<ul class="topnav" id="myTopnav">
	  	<li><a v-bind:class="'menu Hom ' + activeClass('Home') + ' {{ activeHome }} '" href="#" v-on:click="setCurrentMenu('Home')">Homepage</a></li>
		<li><a v-bind:class="'menu Req ' + activeClass('Request')" href="#" v-on:click="setCurrentMenu('Request')">Request a song</a></li>
		<li><a v-bind:class="'menu Abo ' + activeClass('About')" href="#" v-on:click="setCurrentMenu('About')">About</a></li>
		<li><a v-bind:class="'menu Log ' + activeClass('Login')" href="#" v-on:click="setCurrentMenu('Login')">Login</a></li>
		<li class="icon"><a class="menu ico" href="#" onclick="myFunction()">
			<i class="fa fa-bars"></i>
		</a></li>
	</ul> 
</header>

<section id="sec1">

	<div id="Ho" v-bind:class="'content Ho '" v-show="currentContent === 'Home'"> <!-- w3-include-html="html/Homepage.php" -->

		<img class="singer2-img img" src="images/Singer2.png">

	 	<h2 v-on:click="goBackHome">Song list</h2>
	 	<button class="btn refresh" v-on:click="fetchRequests">Refresh</button>

	 	<div  id="listOfSongs">

	 		<ul>
 			    <li v-for="(item, index) in songsNames">

			      {{ item.name }}

			    </li>
	 		</ul>

	 	</div>

	 	<div id="sing-btn">
	 		<button data-toggle="modal" data-target="#videoModal">Let's sing !</button>
	 	</div>

	 	<div class="modal" id="videoModal">
		    <div class="modal-dialog">
		      <div class="modal-content">
		      
		        <!-- Modal Header -->
		        <div class="modal-header">
		          <h4 class="modal-title">Music video</h4>
		          <button type="button" class="close" data-dismiss="modal">&times;</button>
		        </div>
		        
		        <!-- Modal body -->
		        <div class="modal-body">
		          Video here
		        </div>
		        
		        <!-- Modal footer -->
		        <div class="modal-footer">
		          <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
		        </div>
		        
		      </div>
		    </div>
	  	</div>

	</div>


	<div id="Re" v-bind:class="'content Re '" v-show="currentContent === 'Request'"> <!-- w3-include-html="html/Request.php" -->

		<img class="singer-img img" src="images/Singer.png">

	 	<form>
		  Youtube link of the song<br>
		  <input type="text" id="link" name="link" class="link"><br>
		  Your message<br>
		  <textarea id="message" name="message" class="message"></textarea>
		</form>

		<button class="request_button" type="button">Request</button>

	</div>

	<div id="Ab" v-bind:class="'content Ab '" v-show="currentContent === 'About'">
			<img class="singeuse-img img" src="images/Singeuse.png">

			
			<p>About this website</p>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			<br/><br/>
			Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>

	</div>  <!-- w3-include-html="html/About.php" -->

	<div id="Lo" v-bind:class="'content Lo '" v-show="currentContent === 'Login'">
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


</div>

<script src="https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.js"></script>
<script type='text/javascript' src='js/jquery.js'></script>
<script type='text/javascript' src='js/jquery-ui.js'></script>
<script type='text/javascript' src='js/main.js'></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>


</body>
</html>
