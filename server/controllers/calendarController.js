
// calendarController.ejs
const User = require('../models/User');
const Announcement = require('../models/Announcements');

/**
 * GET /
 * calendar
 */
exports.calendar = async (req, res) => {
    
    const locals = {
        title: 'Calendar View',
        description: 'Calendar View'
    };

    /*
    // get current date
    const currentDate = {
        day: new Date().getDate(),
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    };
    */
     // Parse query parameters for month and year
     const queryMonth = parseInt(req.query.month);
     const queryYear = parseInt(req.query.year);
 
     const currentDate = {
         day: new Date().getDate(),
         month: queryMonth || new Date().getMonth() + 1,
         year: queryYear || new Date().getFullYear(),
     };
 
     // Handle navigation between months
     if (currentDate.month > 12) {
         currentDate.month = 1; // Reset to January
         currentDate.year += 1; // Move to the next year
     } else if (currentDate.month < 1) {
         currentDate.month = 12; // Reset to December
         currentDate.year -= 1; // Move to the previous year
     }
 
     // Handle navigation between years when going back
     if (currentDate.month === 12 && queryMonth === 1) {
         currentDate.year -= 1; // Move to the previous year when going back from January
     }


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
