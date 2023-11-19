const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const profileController = require('../controllers/profileController');

/**
 * profile routes
 */
// load profile
router.get('/profile', isLoggedIn, profileController.profile);
// update profile
router.put('/profile/update', isLoggedIn, profileController.profileUpdate);

module.exports = router;