const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const dashboardController = require('../controllers/dashboardController');

/**
 * dashboard routes
 */
// load dashboard
router.get('/dashboard', isLoggedIn, dashboardController.dashboard);
// add announcement
router.get('/dashboard/add-ann', isLoggedIn, dashboardController.dashboardAddAnn);
router.post('/dashboard/add-ann', isLoggedIn, dashboardController.dashboardPostAnn);
// view announcement
router.get('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardViewAnn);
// update announcement
router.put('/dashboard/item/:id', isLoggedIn, dashboardController.dashboardUpdateAnn);
// delete announcement
router.delete('/dashboard/item-delete/:id', isLoggedIn, dashboardController.dashboardDeleteAnn);

// add comment
router.get('/dashboard/item/:id/add-comm', isLoggedIn, dashboardController.dashboardAddComm);
router.post('/dashboard/item/:id/comm', isLoggedIn, dashboardController.dashboardPostComm);
// update comment
router.put('/dashboard/item/:id/comment/:commId', isLoggedIn, dashboardController.dashboardUpdateComm);
// delete comment
router.delete('/dashboard/item/:id/comment/:commId', isLoggedIn, dashboardController.dashboardDeleteComm);

// search announcements
router.get('/dashboard/search-ann', isLoggedIn, dashboardController.dashboardSearch);
router.post('/dashboard/search-ann', isLoggedIn, dashboardController.dashboardSearchPost);

module.exports = router;