const Announcement = require('../models/Announcements');
const mongoose = require('mongoose');


/**
 * GET /
 * Dashboard
 */
exports.dashboard = async(req, res) => {

  // 5 announcements per page
  let perPage = 5;
  let page = req.query.page || 1;
  
  const locals = {
    title: 'Dashboard',
    description: 'Base App for Habitat Connect'
  };

  try {
    const announcements = await Announcement.aggregate([
      { $sort: {createdAt: -1} },
      // this is that only a single user sees their own
      // announcements. we will need to change this later on
      { $match: {user: new mongoose.Types.ObjectId(req.user.id)} },
    ])
    .skip(perPage*page - perPage)
    .limit(perPage)
    .exec();

    const count = await Announcement.countDocuments().exec();
    res.render('dashboard/index', {
      userName: req.user.firstName,
      locals,
      announcements,
      layout: 'layouts/dashboard',
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * view announcement
 */
exports.dashboardViewAnn = async(req, res) => {
  const announcement = await Announcement.findById({ _id: req.params.id})
  // user can only see their announcements
  // prob delete where part later on
  // not if we should delete .lean part
  .where({ user: req.user.id }).lean();

  if (announcement) {
    res.render('dashboard/view-ann',{
      annID: req.params.id,
      announcement,
      layout: 'layouts/dashboard'
    });
  } else{
    res.send('Retrieving announcement went wrong...')
  }

};

/**
 * GET /
 * update announcement
 */
exports.dashboardUpdateAnn = async(req, res) => {

};