const WashingMachine = require('../models/WashingMachine');
const mongoose = require('mongoose');

/**
 * GET /
 * Checker
 */
exports.checker = async(req, res) => {

    // 5 items per page
    let perPage = 5;
    let page = req.query.page || 1;
    
    const locals = {
      title: 'Checker',
      description: 'Laundry Checker'
    };
  
    try {
      const washing_machines = await WashingMachine.aggregate([
        { $sort: {updatedAt: -1} },
      ])
      .skip(perPage*page - perPage)
      .limit(perPage)
      .exec();
  
      const count = await WashingMachine.countDocuments().exec();
      res.render('checker/index', {
        locals,
        washing_machines,
        layout: 'layouts/laundry-checker',
        current: page,
        pages: Math.ceil(count / perPage)
      });
    } catch (error) {
      console.log(error);
    }
};

/**
 * POST /
 * update status of washing machine
 */
exports.checkerUpdateStatus = async(req, res) => {

  let update = {};

  const id = req.params.id;
  const newStatus = req.body.status;

  try {

    if (newStatus == "Use"){
      update = {
        status: 'In use',
        updatedAt: Date.now()
      };
    } else if (newStatus == "Finish") {
      update = {
        status: 'Available',
        updatedAt: Date.now()
      };
    }

    await WashingMachine.findByIdAndUpdate({ _id: req.params.id }, update);

    res.redirect('/checker');
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * search announcement
 */
exports.checkerSearch = async (req, res) => {
  try {
    res.render('checker/search-ann', {
      searchResults: '',
      layout: 'layout/laundry-checker'
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * POST /
 * search announcement
 */
exports.checkerSearchPost = async(req, res) => {
  try {

    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChars = searchTerm.replace(/[^a-zA-Z0-9\s]/g, "");

    const searchResults = await WashingMachine.find({
      status: { $regex: new RegExp(searchNoSpecialChars, 'i') }
    })
    
    res.render('checker/search-wm', {
      searchResults,
      layout: 'layouts/laundry-checker'
    });

  } catch (error) {
    console.log(error);
  }
};