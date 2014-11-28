/**
 * Created by thonatos on 14/11/27.
 */

var http = require('http');
//var qs = require('querystring');


exports.get = function (path, callback) {

    var _host = 'http://statistics.vzhibo.tv/';
    var _path = path || '';

    http.get(_host + _path, function (res) {

        console.log('STATUS: ' + res.statusCode);
        console.log('HEADERS: ' + JSON.stringify(res.headers));

        var _result = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {

            console.log("Got data: " + chunk);

            _result += chunk.toString();

        }).on('end', function () {

            console.log('QueryService: End.');


            callback(false,{
                from: _host + _path,
                data: _result
            });
        })

    }).on('error', function (e) {
        console.log('QueryService:' + e.message);
        return e;
    });

};
