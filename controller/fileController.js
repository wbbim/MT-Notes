/**
 * Created by thonatos on 15/1/26.
 */

var path = require('path');
var fileService = require('../service/fileService').fileService;
var upyunService = require('../service/upyunService').upyunService;

exports.fileController = {
    listFiles: function (req, res) {
        var fileList = fileService.list('static');
        res.send(fileList);
    },
    downloadFile : function (req, res) {
        var remoteUrl = req.body.url;
        fileService.download(remoteUrl,'static');
        res.send('Start Download File ... You can find it from /file/');
    },
    test: function (req, res) {
        upyunService.upload('/roms','',path.join(process.cwd(),'static/logo-green-orange.png'));
        res.send('test');
    }
};