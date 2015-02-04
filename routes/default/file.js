/**
 * Created by thonatos on 15/1/26.
 */

var express = require('express');
var router = express.Router();

var fileController = require('../../controller/fileController').fileController;

router.route('/')
    .get(fileController.listFiles);

router.route('/test')
    .get(fileController.test);

router.route('/download')
    .post(fileController.downloadFile);

module.exports = router;