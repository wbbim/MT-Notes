/**
 * Created by thonatos on 14/11/30.
 */


exports.conf = {
    "site":{
      "name":"Thonatos.Yang"
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
    "runEnv": {
        "DEV": true,
        "PORT": 8084,
        "LOCAL": true,
        "SEAJS": true,
        "DEBUG": false
    },
    "secure": {
        "cookie": {
            "name": "MT.NODE_"
        },
        "session": {
            "name": "MT.Name",
            "secret": "MT.Secret"
        },
        "administartor": {
            "email": "thonatos",
            "passwd": "vzhibo"
        }
    }
};

