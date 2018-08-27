$(document).ready(function() {

	$( ".request_button" ).click(function() {
	  addRequest();
	});

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