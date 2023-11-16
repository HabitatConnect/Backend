const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../middleware/checkAuth');
const maintenanceController = require('../controllers/maintenanceController');

/**
 * maintenance routes
 */
router.get('/maintenance', isLoggedIn, maintenanceController.maintenance);
router.get('/maintenance/item/:id', isLoggedIn, maintenanceController.maintenanceViewTicket);
router.put('/maintenance/item/:id', isLoggedIn, maintenanceController.maintenanceUpdateTicket);
router.delete('/maintenance/item-delete/:id', isLoggedIn, maintenanceController.maintenanceDeleteTicket);
router.get('/maintenance/add-ticket', isLoggedIn, maintenanceController.maintenanceAddTicket);
router.post('/maintenance/add-ticket', isLoggedIn, maintenanceController.maintenancePostTicket);
router.get('/mainteance/search-ticket', isLoggedIn, maintenanceController.maintenanceSearch);
router.post('/maintenance/search-ticket', isLoggedIn, maintenanceController.maintenanceSearchPost);

module.exports = router;