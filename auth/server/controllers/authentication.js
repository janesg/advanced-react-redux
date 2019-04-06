const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

const tokenForUser = user => {
    const timestamp = new Date().getTime();
    
    // Use JWT registered claims:
    //  - sub = subject
    //  - iat = issued at
    return jwt.encode({ 
        sub: user.id, 
        iat: timestamp
    }, config.secret);  
};

exports.signin = (req, res, next) => {
    // User has already been authenticated via email/pwd
    //  - ...we just need to issue them a token
    // Our passport login strategies return the user object on the
    // done callback and passport sticks this user object on the request
    res.json({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {

    const email = req.body.email;
    const pwd = req.body.password;

    if (!email || !pwd) {
        return res.status(422).send({ error: 'Email and password must be provided' });
    }

    // Does given user email already exist ?
    User.findOne({ email: email }, (err, existingUser) => {
        
        if (err) {
            return next(err);
        }
        
        // If already exists, return an error
        if (existingUser) {
            return res.status(422).send({ error: 'Email already in use' });
        }
        
        // Otherwise, create and save user record
        const user = new User({ 
            email: email,
            password: pwd
        });
        
        user.save(err => {
            if (err) {
                return next(err);
            }
            
            // Respond to request indicating user was created
            res.json({ token: tokenForUser(user) });
        });
    });
    
};