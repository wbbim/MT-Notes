/**
 * Created by thonatos on 14/11/30.
 */


module.exports = {
    "site":{
      "name":"MT.NOTES"
    } ,
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
    },
    "secure": {
        "cookie": {
            "name": "MT.NOTES_"
        },
        "session": {
            "name": "MT.Name",
            "secret": "MT.Secret"
        },
        "administartor": {
            "email": "m@t.biu",
            "passwd": "what?are#you$doing!"
        }
    },
    "runEnv": {
        "DEV": true,
        "PORT": 8084,
        "LOCAL": false,
        "SEAJS": true,
        "DEBUG": false
    }
};

