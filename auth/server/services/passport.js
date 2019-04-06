const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');
const config = require('../config');

// Map the email property in the request to the username for strategy
const localOptions = {
    usernameField: 'email'
};

// Local (email/password) strategy for login processing
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
    // Verify username and password
    User.findOne({ email: email }, (err, user) => {
        if (err) {
            return done(err);
        }
        
        // No matching user
        if (!user) {
            return done(null, false);
        }
        
        // Compare hashed passwords
        user.comparePassword(password, (err, isMatch) => {
            if (err) {
                return done(err);
            }
            
            if (!isMatch) {
                return done(null, false);
            }
            
            return done(null, user);
        });
    });
});

// Setup options for JWT strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // Check user.id from payload exists in database
    User.findById(payload.sub, (err, user) => {
        if (err) {
            return done(err, false);
        }
        
        // If exists, call 'done' with the user object
        if (user) {
            done(null, user);
        } else {
            // Otherwise, call 'done' without a user object
            done(null, false);
        }
    });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
