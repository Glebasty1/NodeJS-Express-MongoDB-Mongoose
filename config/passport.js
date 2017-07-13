const LocalStratagy = require('passport-local').Strategy;
import User from '../models/user';
import config from './database';
import bcrypt from 'bcryptjs';

export default (passport) => {
  // Local Strategy
  passport.use(new LocalStratagy((username, password, done) => {
    // Match Username
    let query = {username: username};
    User.findOne(query, (err, user) => {
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null,user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}
