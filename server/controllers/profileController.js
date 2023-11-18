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
          }); 
    } catch (error) {
      console.log(error);
    }
};

/**
 * POST /
 * uodate profile
 */
exports.profileUpdate = async(req, res) => {
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