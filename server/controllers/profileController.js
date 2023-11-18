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

    console.log("hi");

    const user = await User.findById({ _id: req.params._id});

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

//const User = require('../models/User');
//
///**
// * GET /profile
// * Display user profile
// */
//exports.profile = async (req, res) => {
//  try {
//    const user = req.user; // Assuming you are using passport for authentication and the user is stored in req.user
//
//    if (!user) {
//      // If user is not logged in, redirect to login page
//      return res.redirect('/login');
//    }
//
//    const locals = {
//      title: 'Profile',
//      description: 'Change profile description as you wish.',
//    };
//
//    res.render('profile/index', {
//      locals,
//      user,
//      layout: 'layouts/profile',
//    });
//  } catch (error) {
//    console.error(error);
//    res.status(500).send('Internal Server Error');
//  }
//};