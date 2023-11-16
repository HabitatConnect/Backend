const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const maintenanceController = require('../controllers/maintenanceController');

/**
 * maintenance routes
 */
router.get('/maintenance', isLoggedIn, maintenanceController.maintenance);
//router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewAnn);
//router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateAnn);
//router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteAnn);
//router.get('/dashboard/add-ann', isLoggedIn, dashboardController.dashboardAddAnn);
//router.post('/dashboard/add-ann', isLoggedIn, dashboardController.dashboardPostAnn);
//router.get('/dashboard/search-ann', isLoggedIn, dashboardController.dashboardSearch);
//router.post('/dashboard/search-ann', isLoggedIn, dashboardController.dashboardSearchPost);

module.exports = router;