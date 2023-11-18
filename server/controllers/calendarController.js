const User = require('../models/User');
const Announcement = require('../models/Announcements');

/**
 * GET /
 * calendar
 */
exports.calendar = async (req, res) => {
    
    const locals = {
        title: 'Profile',
        description: 'Profile page'
    };

    const currentDate = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    };


    // get user's birthdates
    const users = await User.find();
    const userBirthdays = users.map(user => ({
        userId: user._id,
        username: user.username,
        birthdate: user.birthdate.getDate(),
        birthmonth: user.birthdate.getMonth() + 1,
        birthyear: user.birthdate.getFullYear(),
    }));

    try {
        res.render('calendar/index', {
            locals,
            userBirthdays,
            currentDate,
            layout: 'layouts/calendar',
          }); 
    } catch (error) {
      console.log(error);
    }
};