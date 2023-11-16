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