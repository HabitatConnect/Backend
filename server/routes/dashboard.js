const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

/**
 * dashboard routes
 */
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewAnn);
router.post('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateAnn);

module.exports = router;