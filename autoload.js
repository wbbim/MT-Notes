/**
 * Created by thonatos on 14/11/26.
 */

var debug = require('debug')('MT.NODE');
var app = require('./app');

var server = app.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
});

