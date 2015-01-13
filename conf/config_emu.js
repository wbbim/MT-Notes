/**
 * Created by thonatos on 14/12/19.
 */

var fs      = require('fs');
var path    = require('path');

var CONFIG_APP = checkConf();
var UTIL = require('../utils/obj');

var CODING = {
    host: 'coding.net',
    port: 443,
    path: '/api/user/MTTUSER/project/MTTPROJECT/git/'
};

var GITHUB = {
    host: 'api.github.com',
    port: 443,
    path: '/repos/MTTUSER/MTTPROJECT/contents/'
};

function checkConf(){

    var _conf = {};

    if (fs.existsSync(path.join(__dirname, '../config_local.json'))) {

        console.log('## MT-NOTES: CONFIG_EMU, Find Private Config File, Use the Config.');
        _conf = JSON.parse(fs.readFileSync(path.join(__dirname, '../config_local.json'),'utf-8')).docRepo;


    }else{
        console.log('## MT-NOTES: CONFIG_EMU, Cant Find Private Config File, Use default Config.');
        _conf = require('./config_app').docRepo;
    }

    return _conf;
}

module.exports = {

    docTemplate: function () {
        return {
            templateType: '',
            templateName: ''
        };
    },

    docRepo: function () {

        if (CONFIG_APP.GC === "G") {

            var _g = UTIL.cloneObj(GITHUB);

            _g.path = _g.path.replace(/MTTUSER/g, CONFIG_APP.github.doc_user);
            _g.path = _g.path.replace(/MTTPROJECT/g, CONFIG_APP.github.doc_project);

            return _g;

        } else {

            var _c = UTIL.cloneObj(CODING);
            _c.path = _c.path.replace(/MTTUSER/g, CONFIG_APP.coding.doc_user);
            _c.path = _c.path.replace(/MTTPROJECT/g, CONFIG_APP.coding.doc_project);

            return _c;
        }
    }
};