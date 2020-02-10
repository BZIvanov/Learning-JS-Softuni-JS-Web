const passport = require('passport');
const LocalPassport = require('passport-local');
const User = require('mongoose').model('User');

module.exports = () => {
    passport.use(new LocalPassport((username, password, done) => {
        User.findOne({ username: username }).then(user => {
            if (!user) {
                return done(null, false);
            }

            // authenticate method comes from the schema
            if (!user.authenticate(password)) {
                return done(null, false);
            }

            return done(null, user);
        });
    }));

    // serializeUser is going to store the user in the session
    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => {
            if (!user) {
                return done(null, false);
            }
            
            return done(null, user);        
        });
    });
};
