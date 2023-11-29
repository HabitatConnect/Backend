// profileController.js
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

  const user = await User.findById({ _id: req.user._id });

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
exports.profileUpdate = async (req, res) => {

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
      {
        username: req.body.username,
        roomNumber: req.body.roomNumber,
        birthdate: req.body.birthdate,
        profileImage: req.body.profileImage
      });

    res.redirect('/profile');
  } catch (error) {
    console.log(error);
  }
  
  
  
};
