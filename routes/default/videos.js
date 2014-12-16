/**
 * Created by thonatos on 14/12/16.
 */

var express = require('express');
var router = express.Router();

var videosController = require('../../controller/videosController').videosController;

router.route('/')
    .get(function (req, res) {
        res.send('Videos Page');
    });

router.route('/live')
    .get(videosController.liveGet);

module.exports = router;