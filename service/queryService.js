/**
 * Created by thonatos on 14/11/27.
 */

var https = require('https');

exports.get = function (queryString, callback) {

    var _options = {
        hostname    :   queryString.host || '',
        port        :   queryString.port || 443,
        path        :   queryString.path || '/',
        agent       :   false,
        headers     :   {
                            'Connection': 'keep-alive',
                            'User-Agent':'MT.Server'
                        }
    };

    var _protect = {

        receive: function (response) {

            var _chunks = '';
            var _length = 0;

            console.log('STATUS: ' + response.statusCode);
            console.log('HEADERS: ' + JSON.stringify(response.headers));

            response.setEncoding('utf8');
            response.on('data', function (chunk) {

                //console.log("Got data: " + chunk);

                _chunks += chunk;
                _length += chunk.length;

            }).on('end', function () {

                console.log('QueryService: End.');
                callback( null, _chunks);
            });
        }
    };

    var req = https.get(_options, _protect.receive)
        .on('error', function(e) {
            console.log("Got error: " + e.message);
            req.abort();
        });

    req.end();

};
