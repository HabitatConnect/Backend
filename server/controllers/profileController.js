const User = require('../models/User');


/**
 * GET /
 * profile
 */
exports.profile = async (req, res) => {
    
    const locals = {
        title: 'Profile',
        description: 'Profile page'
    };

    const user = await User.findById({ _id: req.user._id});

    try {
        res.render('profile/index', {
            locals,
            user,
            layout: 'layouts/profile',
            errors: null,
          }); 
    } catch (error) {
      console.log(error);
    }
};


/**
 * PUT /
 * update profile
 */
exports.profileUpdate = async(req, res) => {  

  // retrieve user data
  const { username, roomNumber, birthdate } = req.body;
  const errors = [];

  // username validation
  if (!/^[^\s]{1,12}$/.test(username)) {
      errors.push("Username cannot be longer than 12 characters.");
  }

  // roomnumber validation
  if (!/^(3[0-9]{2}|4[0-9]{2}|500)$/.test(roomNumber)) {
      errors.push("Room Number must be between 300 and 500.");
  }

  if (errors.length > 0) {
      const user = await User.findById(req.user.id);
      return res.render('profile/index', {
          locals: {
              title: 'Profile',
              description: 'Profile page'
          },
          user,
          layout: 'layouts/profile',
          errors,
      });
  }

  try {
    await User.findByIdAndUpdate(
      { _id: req.user.id },
      { username: req.body.username,
        roomNumber: req.body.roomNumber,
        birthdate: req.body.birthdate
      });

      res.redirect('/profile');
  } catch (error) {
    console.log(error);
  }
};