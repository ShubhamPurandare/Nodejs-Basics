var request = require('request');


// this handles incoming post request on localhost:3000/
// when the client sends a post request to the server, the server calls the meetup api to get data
// we use request library to call the meetup api...
// the response we get from the meetup api can be of either type error , or of type response and body
// the body we get is returned to the client then..

app.post("/" , function( req , res ) {

    request('http://api.meetup.com/Pune-Developers-Community/events', function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log(JSON.parse(('body:', body))); // Print the HTML for the Google homepage.
	});

    // flow of data ( request or response )
    // client -> server -> meetup api -> server -> client

});