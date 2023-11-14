const Announcement = require('../models/Announcements');
const mongoose = require('mongoose');


/**
 * GET /
 * Dashboard
 */
exports.dashboard = async(req, res) => {
  const locals = {
    title: 'Dashboard',
    description: 'Base App for Habitat Connect'
  }

  try {
    const announcements = await Announcement.find({});
    
    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      announcements,
      layout: 'layouts/dashboard'
    });
    
  } catch (error) {
    
  }
}
