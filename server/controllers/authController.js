const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');



// Local Strategy
passport.use('local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
},

async function (email, password, done) {

  try {

    let user = await User.findOne({ email: email });

    if (!user) {
      // user not found DB
      done(null, false, { message: 'User not found' });

    }
    
    // user found in DB
    if (user.password) {
      
      // check if passwords match
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        // password match
        done(null, user);
      } else {
        // password don't match
        done(null, false, { message: 'Incorrect password' });
      }
    } else {
        // password does not exist
        done(null, false, { message: 'User did not register with email and password. Try other login methods' });
    }

  } catch (error) {
    console.log(error);
    done(error);
  }
}));



// Google Strategy

// registration
passport.use('google-register', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_REGISTER_CALLBACK_URL,
  passReqToCallback: true,
  scope: ['email', 'profile'],
}, (req, accessToken, refreshToken, profile, done) => {

  // create new user
  const newUser = {
    email: profile.emails[0].value,
    googleId: profile.id,
    profileImage: profile.photos[0].value
  };

  User.findOne({ googleId: profile.id })
  .then((user)  => {
    
    if (!user) {
      // user not in DB
      return User.create(newUser);
    }

    // user in DB
    return user;
  })
  .then((user) => {
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        req.res.redirect('/login-failure');
      }

      req.res.redirect('/auth/complete-profile');
    });
  })
  .catch(error => {
    console.log(error);
    done(error);
  });
}));

// login
passport.use('google-login', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_LOGIN_CALLBACK_URL,
  passReqToCallback: true,
  scope: ['email', 'profile'],
}, (req, accessToken, refreshToken, profile, done) => {

  // find user
  User.findOne({ googleId: profile.id })
  .then((user)  => {
    
    if (!user) {
      // user not in DB
      return done(null, false, { message: 'User not found.' });
    }
    
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        req.res.redirect('/login-failure');
      }

      req.res.redirect('/dashboard');
    });
  })
  .catch(error => {
    console.log(error);
    done(error);
  });
}));


// routes
/**
 * GET /
 * register
 */
exports.authGetRegister = (req, res) => {
  try {
    res.render('auth/register', { 
      error: null
    }); 
  } catch (error) {
    console.log(error);
  }
};


/**
 * POST /
 * register
 */
exports.authLocalRegister = async (req, res) => {
  // only local users go through here
  try {

    // password validation
    if (! /^(?=.*[A-Z])[\w!@#$%^&*()-_=+{};:,<.>]{8,}$/.test(req.body.password)) {

      try {
        res.render('auth/register', {
          error: "Password must be longer than 8 characters and contain at least one capital letter."
        });
      } catch (error) {
        console.log(error);
      }
    }

    // create user
    const newUser = {
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
    };

    const user = await User.create(newUser); 

    req.login(user, (err) => {
      if (err) {
        console.error(err);
        res.redirect('/login-failure');
      }

      res.redirect('/auth/complete-profile');
    });
  } catch (error) {
    console.error(error);
    res.render('auth/register', {
      error: 'Registration failed.'
    });
  }
};


/**
 * GET /
 * google register
 */
exports.authGoogleRegister = passport.authenticate('google-register');


/**
 * GET /
 * google callback register
 */
exports.authRegisterCallback =  passport.authenticate('google-register', {
  failureRedirect: '/login-failure',
  successRedirect: '/auth/complete-profile',
  failureFlash: true,
});


/**
 * GET /
 * google login
 */
exports.authGoogleLogin = passport.authenticate('google-login', { scope: ['email', 'profile'] });


/**
 * GET /
 * google callback
 */
exports.authLoginCallback =  passport.authenticate('google-login', {
  failureRedirect: '/login-failure',
  successRedirect: '/dashboard',
  failureFlash: true,
});


/**
 * GET /
 * complete profile
 */
exports.authGetCompleteProfile = (req, res) => {
  try {
    res.render('auth/complete-profile', { 
      errors: null
    }); 
  } catch (error) {
    console.log(error);
  }
};


/**
 * POST /
 * complete profile
 */
exports.authPostCompleteProfile = async (req, res) => {

  // retrieve user data
  const { username, roomNumber, birthdate } = req.body;
  const errors = [];

  // username validation
  if (! /^[^\s]{1,12}$/.test(username)) {
    errors.push("Username cannot be longer than 12 characters.");
  }

  // roomnumber validation
  if (! /^(3[0-9]{2}|4[0-9]{2}|500)$/.test(roomNumber)) {
    errors.push("Room Number must be between 300 and 500.");
  }

  // birthdate validation
  const isValidDate = (dateString) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return { isValid: false, errorMessage: "Invalid birthdate format. Please choose the date from the calendar." };
    }

    const selectedDate = new Date(dateString);
    const currentDate = new Date();

    // Compare with the current date
    if (selectedDate > currentDate) {
      return { isValid: false, errorMessage: "Birthdate cannot be in the future. Please choose a valid past date from the calendar." };
    }

    return { isValid: true, errorMessage: "" };
  };

  const dateValidationResult = isValidDate(birthdate);
  if (!dateValidationResult.isValid) {
    errors.push(dateValidationResult.errorMessage);
  }


  if (errors.length > 0) {
    return res.render('auth/complete-profile', { 
        errors: errors
      }); 
  }

  // update profile
  try {

      await User.findByIdAndUpdate(req.user._id, { username, roomNumber, birthdate });
      res.redirect('/dashboard');

  } catch (error) {

      console.error(error);
      res.render('auth/complete-profile', { errors: ['Failed to complete the profile.'] });
      
  }
};


/**
 * GET /
 * log in
 */
exports.authGetLogin = (req, res) => {
  try {
    res.render('auth/login', { 
      error: null
    }); 
  } catch (error) {
    console.log(error);
  }
};


/**
 * POST /
 * log in
 */
exports.authPostLogin = passport.authenticate('local', {
    failureRedirect: '/login-failure',
    successRedirect: '/dashboard',
    failureFlash: true,
});


/**
 * GET /
 * log in failure
 */
exports.authLoginFailure = (req, res) => {
  res.send('Something went wrong...');
};



/**
 * GET /
 * logout
 */
exports.authLogout = (req, res) => {
  req.session.destroy((error) => {
      if(error) {
          console.log(error);
          res.send('Error loggin out');
      } else{
          res.redirect('/');
      }
  })
};


// serialize user data after successful authentication
passport.serializeUser((user, done) => {
  done(null, user.id);
});


// deserialize user data from session
passport.deserializeUser(function(id, done){
  User.findById(id)
      .then(user => {
          done(null, user);
      })
      .catch(err => {
          done(err, null);
      });
});
