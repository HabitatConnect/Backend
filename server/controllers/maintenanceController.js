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

/**
 * GET /
 * view ticket
 */
exports.maintenanceViewTicket = async(req, res) => {
  const ticket = await Ticket.findById({ _id: req.params.id})
  // user can only see their tickets
  .where({ user: req.user.id }).lean();

  if (ticket) {
    res.render('maintenance/view-ticket',{
      ticketID: req.params.id,
      ticket,
      layout: 'layouts/maintenance'
    });
  } else{
    res.send('Retrieving ticket went wrong...')
  }
};

/**
 * PUT /
 * update ticket
 */
exports.maintenanceUpdateTicket = async(req, res) => {
  try {
    await Ticket.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      })

      res.redirect('/maintenance');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * delete ticket
 */
exports.maintenanceDeleteTicket = async (req, res) => {
  try {
    await Ticket.deleteOne({
      _id: req.params.id
    })
    // only owner can delete their tickets
    .where({user: req.user.id});

    res.redirect('/maintenance');
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * add ticket
 */
exports.maintenanceAddTicket = async (req, res) => {
  res.render('maintenance/add-ticket', {
    layout:'layouts/maintenance'
  });
};

/**
 * POST /
 * add ticket
 */
exports.maintenancePostTicket = async (req, res) => {
  try {

    req.body.user = req.user.id;
    await Ticket.create(req.body);
    res.redirect('/maintenance');

  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * search ticket
 */
exports.maintenanceSearch = async (req, res) => {
  try {
    res.render('maintenance/search-ticket', {
      searchResults: '',
      layout: 'layout/maintenance'
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * search ticket
 */
exports.maintenanceSearchPost = async(req, res) => {
  try {

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchResults = await Ticket.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChars, 'i') }}
      ]
    })
    // only owner can search their tickets
    .where({user: req.user.id});
    
    res.render('maintenance/search-ticket', {
      searchResults,
      layout: 'layouts/maintenance'
    });

  } catch (error) {
    console.log(error);
  }
};