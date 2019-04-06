const passport = require('passport');

const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');

// Create middleware for authentication using JWT strategy
// - don't create a session cookie
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = app => {
    
    app.post('/signin', requireSignIn, Authentication.signin);

    // Sign-up does not require authentication
    app.post('/signup', Authentication.signup);
    
    app.get('/', requireAuth, (req, res) => {
        res.send({ hi: 'there' });
    });
}