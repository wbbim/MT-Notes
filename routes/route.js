/**
 * Created by thonatos on 15/1/14.
 */

module.exports = function (app, passport) {

    // Default
    var index = require('./default/index');
    var blog = require('./default/blog');
    var docs = require('./default/docs');
    var user = require('./default/user');
    var demo = require('./default/demo');
    var file = require('./default/file');

    // Api
    var api   = require('./api/api');

    app.use('/', index);

    //app.use(/^\/doc\w{0,1}/, docs);
    app.use('/docs', docs);
    app.use('/blog', blog);
    app.use('/demo', demo);
    app.use('/file', file);
    app.use('/user', user(passport));
    app.use('/api',api);
};