const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

/**
 * dashboard routes
 */
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewAnn);
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateAnn);
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteAnn);
router.get('/dashboard/add-ann', isLoggedIn, dashboardController.dashboardAddAnn);
router.post('/dashboard/add-ann', isLoggedIn, dashboardController.dashboardPostAnn);

module.exports = router;