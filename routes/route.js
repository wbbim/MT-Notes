/**
 * Created by thonatos on 15/1/14.
 */

module.exports = function (app, passport) {

    // Default
    var docs = require('./default/docs');
    var index = require('./default/index');
    var users = require('./default/users');
    var posts = require('./default/posts');
    var videos = require('./default/videos');

    // Api
    var api   = require('./api/api');

    app.use('/', index);

    app.use(/^\/doc\w{0,1}/, docs);
    app.use(/^\/post\w{0,1}/, posts);

    app.use('/videos', videos);
    app.use('/api',api);
    app.use('/users', users(passport));
};