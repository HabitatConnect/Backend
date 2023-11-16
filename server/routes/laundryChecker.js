const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const checkerController = require('../controllers/checkerController');

/**
 * laundry checker routes
 */
router.get('/checker', isLoggedIn, checkerController.checker);

module.exports = router;