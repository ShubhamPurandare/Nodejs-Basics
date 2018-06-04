const passport = require('passport')
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('Authorization');
opts.secretOrKey = 'your-256-bit-secret';


passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
   const User = _.filter(db, function(o) { return o.sub==jwt_payload.sub; });
console.log(User)
   done(null,User[0])//done(error,result)
}));

module.exports = passport

// find more on  https://www.npmjs.com/package/passport