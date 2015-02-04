/**
 * Created by thonatos on 14/11/30.
 */

var fs = require('fs');
var path = require('path');


// CONFIG_LOCAL
var CONFIG_LOCAL = path.join(process.cwd(), 'config_local.json');

module.exports = function (from) {

    // LOG_MSG
    var LOG_MSG = {
        success: '## MT-NOTES: ' + from + ', Find Private Config File, Use the Config.',
        failed: '## MT-NOTES: ' + from + ', Cant Find Private Config File, Use default Config.'
    };

    // READ CONF
    var privateConf = {};

    if (fs.existsSync(CONFIG_LOCAL)) {

        console.log(LOG_MSG.success);
        privateConf = JSON.parse(fs.readFileSync(CONFIG_LOCAL, 'utf-8'));

    } else {

        console.log(LOG_MSG.failed);
        privateConf = {
            "site": {
                "name": "MT.NOTES",
                "desc": "A blog/documents Site Running on NodeJS Server",
                "docRepo": {
                    "github": {
                        "doc_user": "thonatos",
                        "doc_project": "Mt.Notes.And.Documents"
                    },
                    "coding": {
                        "doc_user": "thonatos",
                        "doc_project": "Mt.Notes.And.Documents"
                    },
                    "GC": "C"
                }
            },
            "auth": {
                "cookie": {
                    "name": "MT.NOTES_"
                },
                "session": {
                    "name": "MT.Name",
                    "secret": "MT.Secret"
                },
                "database": {
                    "url": "mongodb://localhost:27017/tfme",
                    "options": {
                        db: {native_parser: true},
                        server: {poolSize: 5},
                        user: 'tfme',
                        pass: 'tfme2014'
                    }
                },
                "administrator": {
                    "email": "m@t.biu"
                },
                "upyun": {
                    "bucket": "bucket",
                    "operator": "operator",
                    "password": "password"
                }
            },
            "env": {
                "PORT": 8084,   // APP LEVEL: NODE SERVER PORT
                "TRUST": false,  // APP LEVEL: BEHIND NGINX OR NOT
                "APP_DEVELOPMENT": true,    // APP LEVEL: PRODUCTION OR DEVELOPMENT
                "WEB_PRODUCTION": false, // WEB LEVEL: For Use CDN/LOCAL LIB
                "WEB_SEA": true,  // WEB LEVEL: USE SEA JS OR NOT
                "WEB_DEVELOPMENT": false // WEB LEVER: DEBUG FOR SEA JS
            }
        }
    }

    return privateConf;
};

