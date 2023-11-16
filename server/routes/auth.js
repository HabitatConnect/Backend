const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async function(accessToken, refreshToken, profile, done) {
    
    const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
    }

    try {
        let user = await User.findOne({googleId: profile.id});

        if (user){
            // user found in DB
            done(null, user);
        } else{
            // user not found in DB
            user = await User.create(newUser);
            done(null, user);
        }


    } catch (error) {
        console.log(error);
    }

  }
));

// google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));
// retrieve user data
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login-failure',
  successRedirect: '/dashboard'
})
);

// route in case of failure
router.get('login-failure', (req, res) =>{
    res.send('Something went wrong...')
});

// destroy user session
router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if(error) {
            console.log(error);
            res.send('Error loggin out');
        } else{
            res.redirect('/')
        }
    })
});

// presist user data after successful authentication
passport.serializeUser(function(user, done){
    done(null, user.id);
});

// retrieve user data from session
passport.deserializeUser(function(id, done){
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null);
        });
});


module.exports = router;