// basic imports
var app = require('express')();    //we need express
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const router = require('./admin/index')//we need the index.js file in routes folder

const bodyParser = require('body-parser')
const passport = require('./util/passport')
const auth = require('./util/authorizer')
var request = require('request');
const _  = require("lodash")
const mongoose = require('mongoose')
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
 // we need body parser to parse data in UTF, JSON formats

// in case of a post request if data is sent through the body in JSON format, the following two lines will be used


// sockets code
io.on('connection', function(socket){  // listener for connection , this is called when we call socket.connect(); from android
  socket.on('chatmessage', function(msg){  // this is the explicit listener , we need to call socket.emit("chatmessage") from android
	console.log(msg)
    io.emit('chat message', msg);
  });
});

// IMPORTANT -->  io is the object for the whole socket.io package, when a client connects to the server via a socket,
// io.on('connection) is called which returns a "socket " obj which is the explicit connection between the server and client



var db = [{
  "sub": "1234567890",
"name":"John Doe",

"email":"john@sellezely.com",
"role":"admin"
}];



mongoose.connect('mongodb://hello123:hello123@ds245680.mlab.com:45680/hello123');// URL from MLAB where we host our mongodb database

// mongoose can also be used to connect to db and get a callback when it is connected , as shown below

/*mongoose.connect('mongodb://hello123:hello123@ds245680.mlab.com:45680/hello123', function(err , database){

	if(err){
		throw err;
		console.log("Error connecting to mlab ...");
	}else{
		var db = database.db("databasename");

	}
});*/

// find more on mongoose on https://www.npmjs.com/package/mongoose

const User = mongoose.model('User', { name: String,email:String, phoneNo:String }); 

app.post('/find-user',function(req,res){
  User.find({ email: req.body.email},'email', function (err, docs) {
  if(err){
	console.log(err)
	res.status(500).json(err)
  }
	res.json(docs)
  });
})

app.post('/create-user',function(req,res){
console.log(req.body)
	const user = new User(req.body)
	user.save().then(function(r){   // .save() is the built in method for saving the data in the prescribed collection , creating/updating a document

	console.log(r)
	res.json(r)
	}).catch(function(err){
	res.status(500).json(err)
	})
})




// The code below is sdemonstrates how to access the api from a different server
// request is used to directly call an API
// for more details --> https://www.npmjs.com/package/request 

app.post('/',function(req,res){
	console.log("user", req.user)
	request('http://api.meetup.com/Pune-Developers-Community/events', function (error, response, body) {
 		res.json(JSON.parse(body))
	});
})

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


//app.post('/profile', function (req, res, next) {
  //console.log(req.body);
  //res.json(req.body.hey);
//});

//app.post('/',auth,function(req,res){
//res.json({
//hello:"hi"
//})
//})

http.listen(port, function(){
  console.log('listening on *:' + port);
});
