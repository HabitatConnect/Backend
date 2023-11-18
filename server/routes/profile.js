const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const profileController = require('../controllers/profileController');

/**
 * profile routes
 */
router.get('/profile', isLoggedIn, profileController.profile);

module.exports = router;