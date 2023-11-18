const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const calendarController = require('../controllers/calendarController');

/**
 * dashboard routes
 */
router.get('/calendar', isLoggedIn, calendarController.calendar);

module.exports = router;