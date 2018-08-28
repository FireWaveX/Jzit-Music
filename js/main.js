$(document).ready(function() {


  getRequests();

	$( ".request_button" ).click(function() {
	  addRequest();
	});

  // non vue.js option
  // $( ".action" ).click(function() {
  //   getRequests();
  // });

  $( ".menu" ).click(function() {
    $("a").removeClass( "active" );
    $(this).addClass( "active" );
  });

  showHTML();

	includeHTML();

});

function addRequest() {

	var message = $.trim($('.message').val());
	// Check the link
    var link = $.trim($('.link').val());

    if (link  === '') {
        alert('input link please');
        return false;
    }

	var xhr = new XMLHttpRequest();
	var url = "https://apex.oracle.com/pls/apex/anime_keeper/Jzit/postRequest";
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onreadystatechange = function () {
	    if (xhr.readyState === 4 && xhr.status === 200) {
	        var json = JSON.parse(xhr.responseText);
	    }
	};
	var data = JSON.stringify({"LINK": link, "MESSAGE": message});
	xhr.send(data);

	$(".message").val('');
	$(".link").val('');

}


function showHTML() {

  $( ".Hom" ).click(function() {
    getRequests();
    $(".content").attr('hidden', 'true');
    $(".Ho").removeAttr("hidden");
  });

  $( ".Req" ).click(function() {
    $(".content").attr('hidden', 'true');
    $(".Re").removeAttr("hidden");
  });

  $( ".Abo" ).click(function() {
    $(".content").attr('hidden', 'true');
    $(".Ab").removeAttr("hidden");
  });

  $( ".Log" ).click(function() {
    $(".content").attr('hidden', 'true');
    $(".Lo").removeAttr("hidden");
  });

}


function getRequests(){

  $.ajax({
    type: 'GET',
    url: 'https://apex.oracle.com/pls/apex/anime_keeper/Jzit/getRequest',
    success: function(data) {
      showData(data);
      //console.log(data);
    },

    error: function() {

      console.log('La requête n\'a pas abouti'); 
    }

  });    

}



function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}

function showData(data) {

  $("#listOfSongs").empty();

  console.log(data.items);

  var items = data.items;

  var ul = document.createElement('ul');

  document.getElementById('listOfSongs').appendChild(ul);

  items.forEach(function (item) {

    var li = document.createElement('li');
    ul.appendChild(li);

    addIFrame(item.link, li);

  });


}

function addIFrame(link, list){

  var videoId = getId(link);

  // var iframe = document.createElement('iframe');
  // iframe.src = "https://www.youtube.com/embed/" + videoId +"";
  // list.appendChild(iframe);

  var key = "AIzaSyApxjtXcMyjhi83AG8CjBxvE4-WBkMwNAE";

  q = 'https://www.googleapis.com/youtube/v3/videos?id='+ videoId +'&key='+ key +'&fields=items(snippet(title))&part=snippet' ;

  $.ajax({
        url: q, 
        dataType: "jsonp",
        success: function(data){
          var video_name = data.items[0].snippet.title;
          list.append(video_name);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          alert (textStatus, + ' | ' + errorThrown);
          var video_name = "ERROR_LOADING_NAME";
        }
    });

    // imagelink = "<img src=\"http:\/\/img.youtube.com\/vi\/"+videoId+"\/hqdefault.jpg\">";

    // var video_thumbnail = $(imagelink);
    // $("#Ho").append(video_thumbnail);
        

}


function getId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
        return match[2];
    } else {
        return 'error';
    }
}


/*---------- vue.js ----------*/

new Vue({
  el: '#Ho',
  methods: {
    request_button2: function () {
      
      getRequests();

    }
  }
})