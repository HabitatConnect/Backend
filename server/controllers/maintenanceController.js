const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');


/**
 * GET /
 * maintenance
 */
exports.maintenance = async(req, res) => {

  // 5 tickets per page
  let perPage = 5;
  let page = req.query.page || 1;
  
  const locals = {
    title: 'Maintenance',
    description: 'Maintenance requests'
  };

  try {
    const tickets = await Ticket.aggregate([
      { $sort: {updatedAt: -1} },
      // only owner can see their tickets
      { $match: {user: new mongoose.Types.ObjectId(req.user.id)} },
    ])
    .skip(perPage*page - perPage)
    .limit(perPage)
    .exec();

    const count = await Ticket.countDocuments().exec();
    res.render('maintenance/index', {
      userName: req.user.firstName,
      locals,
      tickets,
      layout: 'layouts/maintenance',
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (error) {
    console.log(error);
  }
};