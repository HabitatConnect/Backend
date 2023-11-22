const Announcement = require('../models/Announcements');
const Comment = require('../models/Comment');


/**
 * GET /
 * Dashboard
 */
exports.dashboard = async(req, res) => {

  // 8 announcements per page
  let perPage = 8;
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
      username: req.user.username,
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

  try {

    const announcement = await Announcement.findById(req.params.id)
    .populate('user', 'username profileImage')
    .exec();

    if (announcement) {

      const isOwner = announcement.user._id.equals(req.user._id);

      // fetch comments
      const comments = await Comment.find({ announcement: announcement._id })
      .populate('user', 'username profileImage')
  
      res.render('dashboard/view-ann',{
        annID: req.params.id,
        announcement,
        // if no comments, pass an empty list
        comments: comments || [],
        layout: 'layouts/dashboard',
        isOwner: isOwner,
        viewer: req.user,
        error: null,
      });
    } else{
      res.send('Retrieving announcement went wrong...')
    }

  } catch (error) {
    console.log(error);
    res.send('Error fetching announcement or comments...');
  }
};

/**
 * PUT /
 * update announcement
 */
exports.dashboardUpdateAnn = async(req, res) => {
  try {

    // retrieve user data
    const { title, body } = req.body;
    const errors = [];

    // title length validation
    if (title.length > 500 ) {
      errors.push("Title cannot exceed 500 characters.");
    }

    // body length validation
    if (body.length > 1000) {
      errors.push("Body cannot exceed 1,000 characters.");
    }

    if (errors.length > 0) {
      const announcement = await Announcement.findById(req.params.id)
      .populate('user', 'username profileImage')
      .exec();
      const isOwner = announcement.user._id.equals(req.user._id);
      const comments = await Comment.find({ announcement: announcement._id })
      .populate('user', 'username profileImage')

      return res.render('dashboard/view-ann', {
        annID: req.params.id,
        announcement,
        comments,
        layout: 'layouts/dashboard',
        isOwner: isOwner,
        viewer: req.user,
        error: errors,
      });
    }

    // validation passed
    // update announcement
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
    layout:'layouts/dashboard',
    error: null,
  });
};

/**
 * POST /
 * add announcement
 */
exports.dashboardPostAnn = async (req, res) => {
  try {

    // retrieve user data
    const { title, body } = req.body;
    const errors = [];

    // title length validation
    if (title.length > 500 ) {
      errors.push("Title cannot exceed 500 characters.");
    }

    // body length validation
    if (body.length > 1000) {
      errors.push("Body cannot exceed 1,000 characters.");
    }

    if (errors.length > 0) {
      return res.render('dashboard/add-ann', {
        layout: 'layouts/dashboard',
        error: errors,
      });
    }

    // validation passed
    // create announcement
    const announcement = new Announcement({
      user: req.user.id,
      title: title,
      body: body,
      createdAt: Date.now(),
    });

    await announcement.save();
    res.redirect('/dashboard');

  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * add comment
 */
exports.dashboardAddComm = async (req, res) => {
  res.render('dashboard/add-comm', {
    annID: req.params.id,
    layout: 'layouts/dashboard',
    error: null,
  });
};

/**
 * POST /
 * post comment
 */
exports.dashboardPostComm = async (req, res) => {
  try {

    // validate comment length
    if (req.body.text.length > 500) {
      // not passed. render view and display error

      const error = `Comment must not exceed 500 characters.`;

      const announcement = await Announcement.findById(req.params.id)
      .exec();
      
      res.render('dashboard/add-comm', {
        annID: req.params.id,
        announcement,
        layout: 'layouts/dashboard',
        error,
      });
      return;
    }

    // validation passed
    // create comment
    const comment = new Comment({
      user: req.user.id,
      announcement: req.params.id,
      text: req.body.text,
      createdAt: Date.now(),
    });

    await comment.save();

    res.redirect(`/dashboard/item/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * PUT /
 * update comment
 */
exports.dashboardUpdateComm = async(req, res) => {
  try {

    // validate comment length
    if (req.body.updatedText.length > 500) {

      const error = `Comment must not exceed 500 characters.`;

      // render the view to display the error
      const announcement = await Announcement.findById(req.params.id)
      .populate('user', 'username profileImage')
      .exec();
      const isOwner = announcement.user._id.equals(req.user._id);
      const comments = await Comment.find({ announcement: announcement._id })
      .populate('user', 'username profileImage')
      

      res.render('dashboard/view-ann', {
        annID: req.params.id,
        announcement,
        comments,
        layout: 'layouts/dashboard',
        isOwner,
        viewer: req.user,
        error,
      });
      return;
    }

    await Comment.findByIdAndUpdate(
      { _id: req.params.commId },
      { text: req.body.updatedText,
        updatedAt: Date.now(),
      })
      // only owner can update their comments
      .where({user: req.user.id});

      res.redirect(`/dashboard/item/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.send("Error updating comment.");
  }
};

/**
 * Delete /
 * delete comment
 */
exports.dashboardDeleteComm = async (req, res) => {
  try {
    await Comment.findByIdAndDelete({
      _id: req.params.commId
    })
    // only owner can delete their comment
    .where({user: req.user.id});

    res.redirect(`/dashboard/item/${req.params.id}`);
  } catch (error) {
    console.log(error);
    res.send("Error deleting comment.");
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