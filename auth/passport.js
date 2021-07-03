const passport = require('passport');
const passportJwt = require('passport-jwt');
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = require('../models/User')



// console.log(process.env.JWT_SECRET)

// passport.use(new JwtStrategy({jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(), 
//   secretOrKey: process.env.JWT_SECRET}), 
//   (jwtPayload, done) => {
//       return User.findOne({_id: jwt_payload.id}).then(user=> {
//         return done(null, user)
//       }).catch(err => {
//         return done(err);
//       })
//   }
// );

passport.use(new JwtStrategy({jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET},
 function(jwt_payload, done) {
    
    // We will assign the `sub` property on the JWT to the database ID of user
    User.findById( jwt_payload.id, function(err, user) {
        
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

// var opts = {}
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.JWT_SECRET;

// passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
//     User.findOne({id: jwt_payload.sub}, function(err, user) {
//         if (err) {
//             return done(err, false);
//         }
//         if (user) {
//             return done(null, user);
//         } else {
//             return done(null, false);
//             // or you could create a new account
//         }
//     });
// }));