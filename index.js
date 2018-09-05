require('./scr/index');

const fetch = require('node-fetch');


const express = require('express')
const app = express()
var path = require('path');
const port = 3000

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname + '/index.html'));
})


// app.get('/video', function(request, response){

// 	var videoId = request.query.id;

//     var key = "AIzaSyApxjtXcMyjhi83AG8CjBxvE4-WBkMwNAE";
//     query = 'https://www.googleapis.com/youtube/v3/videos?id='+ videoId +'&key='+ key +'&fields=items(snippet(title))&part=snippet' ;

// 	// fetch(query).then(function(data) {

// 	// 	console.log(data)
// 	// 	return response.json()
// 	// })

// 	return query;

// })


app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})