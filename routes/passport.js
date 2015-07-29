// Tutorial: https://scotch.io/tutorials/easy-node-authentication-facebook

var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/user');

module.exports = function(passport) {

  // Used to serialize the user for the session.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Used to deserialize the user.
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },

  // Facebook will send back the token and profile.
  function(token, refreshToken, profile, done) {

    process.nextTick(function() {
      User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        if (err) return done(err);

        if (user) {
          return done(null, user); // User found, return that user.
        } else {
          // If there is no user found with that facebook id, create them.
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;           
          newUser.facebook.name = profile.name.givenName 
            + ' ' + profile.name.familyName;
          newUser.facebook.email = profile.emails[0].value;

          // save our user to the database
          newUser.save(function(err) {
            if (err) throw err;
            return done(null, newUser);
          });
        }
      });
    });
  }));
};
