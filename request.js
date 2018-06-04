var request = require('request');
request('http://api.meetup.com/Pune-Developers-Community/events', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log(JSON.parse(('body:', body))); // Print the HTML for the Google homepage.
});
