/**
 * GET /
 * Homepage
 */

exports.homepage = async(req, res) => {
    const locals = {
        title: 'Base App',
        description: 'Base App for Habitat Connect'
    }
    res.render('index', {
        locals,
        layout: 'layouts/front-page'
    });
}

/**
 * GET /about
 * About
 */
exports.about = async(req, res) => {
    const locals = {
        title: 'About - Base App',
        description: 'Base App for Habitat Connect'
    }
    res.render('about', locals);
}