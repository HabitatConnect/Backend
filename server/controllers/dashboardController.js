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
  }

  try {

    Announcement.aggregate([
      {
        $sort: {
          createdAt: -1 // newest announcement first
        }
      },
      {
        // user can see their announcements
        // prob change this
        $match: {
          user: mongoose.Types.ObjectId(req.user.id)
        }
      },
      {
        // max title 30 char
        // max body 100 char
        // this is just test,
        // will need to change it
        $project: {
          title: { $substr: ['$title', 0, 30]},
          body: { $substr: ['$body', 0, 100]}
        }
      }
    ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec(function(err, announcements){
      Announcement.count().exec(function (err, count){
        if (err) return next(err);

        res.render('dashboard/index', {
          userName: req.user.firstName,
          locals,
          announcements,
          layout: 'layouts/dashboard',
          current: page,
          pages: Math.ceil(count / perPage)
        });
      })
    })
    
  } catch (error) {
    console.log(error);
  }
}
