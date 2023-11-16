const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const checkerController = require('../controllers/checkerController');

/**
 * laundry checker routes
 */
router.get('/checker', isLoggedIn, checkerController.checker);
router.post('/checker/:id/update-status', isLoggedIn, checkerController.checkerUpdateStatus);
router.get('/checker/search-wm', isLoggedIn, checkerController.checkerSearch);
router.post('/checker/search-wm', isLoggedIn, checkerController.checkerSearchPost);

module.exports = router;