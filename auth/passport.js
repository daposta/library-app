const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('../models/User')





passport.use(new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET},
 function(jwt_payload, done) {
    
    // We will assign the `sub` property on the JWT to the database ID of user
    // User.findById( jwt_payload.id, function(err, user) {  this works too
    User.findOne( {_id: jwt_payload.id}, function(err, user) {
        
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
    
}));

