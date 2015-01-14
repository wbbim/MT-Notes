MT.NOTES

## #About

A blog/documents Site Running on NodeJS Server.

## #Config

### Private Config

if there is not a file named with config_local.json, it will use default conf.

```
{
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
    },
    "runEnv": {
        "DEV": true,
        "PORT": 8084,
        "LOCAL": false,
        "SEAJS": true,
        "DEBUG": false
    }
}
```

## #Api

### Public Api

#### METHOD:GET

* /posts/
* /posts/:pid
* /posts/page/:currentPage

### Private Api

#### METHOD:POST

* /users/post/

#### METHOD:PUT

* /users/post/:pid

#### METHOD:DELETE

* /users/post/:pid