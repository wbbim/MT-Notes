/**
 * Created by thonatos on 14/11/27.
 */

var http = require('http');

exports.get = function (path, callback) {

    var _host = 'http://statistics.vzhibo.tv/';
    var _path = path || '';

    var _protect = {
        callback: function (response) {

            var _result = '';

            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + JSON.stringify(response.headers));

            response.setEncoding('utf8');
            response.on('data', function (chunk) {

                console.log("Got data: " + chunk);
                _result += chunk.toString();

            }).on('end', function () {

                console.log('QueryService: End.');
                callback(false, {
                    from: _host + _path,
                    data: _result
                });
            });
        }
    };

    http.get(_host + _path, _protect.callback).end();

};
