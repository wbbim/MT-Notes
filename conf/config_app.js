/**
 * Created by thonatos on 14/11/30.
 */


module.exports = {
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
};

