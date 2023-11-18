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