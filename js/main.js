$(document).ready(function() {

	$( ".request_button" ).click(function() {
	  addRequest();
	});

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

}