const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;
const User = require('../models/User')

passport.use(new JwtStrategy({jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(), 
  secretOrkey: process.env.JWT_SECRET}), 
  (jwtPayload, done) => {
      User.findOne({_id: jwt_payload.id}).then(user=> {
        return done(null, user)
      }).catch(err => {
        return done(err);
      })
  }
);