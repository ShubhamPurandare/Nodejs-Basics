const passport=require('passport')    // gets passport library
var _ = require('lodash')
var JwtStrategy = require('passport-jwt').Strategy ,    // gets the stratergy from passport-jwt
    ExtractJwt = require('passport-jwt').ExtractJwt;    // gets extractJWT from passport-jwt
var request = require('request');
const bodyParser = require('body-parser')
const express = require('express');
const app = express();

var opts = {}

app.use(bodyParser.json());//converting it to JSON format
app.use(bodyParser.urlencoded({extended:true}));//converting to UTF format

// we extract the jwt from the header of the post request..
//the header contains a key called BearerToken which contains th e jwt
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

// our secret which is used to sign the jwt 
opts.secretOrKey = 'your-256-bit-secret';

// static data for checking how jwt tokens work
// the token is extracted and compared with the db object we have below
var db=[{
    "sub": "1234567890",
      "name": "John Doe",
      "role":"user"
      }]

//strategy we are using for authentication
// the jwt payload is checked for authentication
// if it doesnt match then done is called...which returns authentiction fail to client
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    // lodash is used to check if the jwt payload sub matches one of the sub we have statically defined in db
    // the filter function works similar to the map function commonly used in mongodb queries
    const User = _.filter(db,function(o){return o.sub==jwt_payload.sub;}); //returns a member of the array whose sub is equal to the payload sub
    
    console.log(User)
    console.log('from db')
    
    // returns failed authentication to client
    done(null,User[0])
}));

//middleware
// checks if the key role has the value admin
// sends the appropriate message depending on if authentication is sucessful or fails
var auth = function(req,res,next){

    if(req.user.role=="admin")
        next(); // calls the next function which is defined after the auth instance
    else
        res.status(401).send("unauthorized man")
}

// calls the authenticate function with jwt and session defined as false..
// the passport function hs been defined above and the instance is used here to authenticate
// after jwt token is retrieved and checked the auth function is called
// aftet the auth function , if successful authentication takes place, the meetup api is called and the data is sent back to the client
app.post('/', passport.authenticate('jwt', { session: false }),auth,function(req,res){
    console.log("user",req.user)
    request('http://api.meetup.com/Pune-Developers-Community/events', function (error, response, body) {
        res.json(JSON.parse(body))
    });
})


app.listen(3000, () => console.log("Running on port 3000!"))
