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
      {
        $addFields: {
          latestDate: { $max: ['$createdAt', '$updatedAt'] }
        }
      },
      { $sort: { latestDate: -1 } },
      { $project: { latestDate: 0 } },
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
  const announcement = await Announcement.findById({ _id: req.params.id});

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
 * PUT /
 * update announcement
 */
exports.dashboardUpdateAnn = async(req, res) => {
  try {
    await Announcement.findByIdAndUpdate(
      { _id: req.params.id },
      { title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
      })
      // only owner can update their announcements
      .where({user: req.user.id});

      res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * delete announcement
 */
exports.dashboardDeleteAnn = async (req, res) => {
  try {
    await Announcement.deleteOne({
      _id: req.params.id
    })
    // only owner can delete their announcements
    .where({user: req.user.id});

    res.redirect('/dashboard');
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * add announcement
 */
exports.dashboardAddAnn = async (req, res) => {
  res.render('dashboard/add-ann', {
    layout:'layouts/dashboard'
  });
};

/**
 * POST /
 * add announcement
 */
exports.dashboardPostAnn = async (req, res) => {
  try {

    req.body.user = req.user.id;
    await Announcement.create(req.body);
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * search announcement
 */
exports.dashboardSearch = async (req, res) => {
  try {
    res.render('dashboard/search-ann', {
      searchResults: '',
      layout: 'layout/dashboard'
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * search announcement
 */
exports.dashboardSearchPost = async(req, res) => {
  try {

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const searchResults = await Announcement.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChars, 'i') }},
        { body: { $regex: new RegExp(searchNoSpecialChars, 'i') }}
      ]
    });
    
    res.render('dashboard/search-ann', {
      searchResults,
      layout: 'layouts/dashboard'
    });

  } catch (error) {
    console.log(error);
  }
};