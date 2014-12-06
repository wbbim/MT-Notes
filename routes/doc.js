/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var docController = require('../controller/docController').docController;

router.route('/')
    .get(function (req, res) {
        // List Post
        docController.getMulti(req, res);
    });

router.route('/:category')
    .get(function (req, res) {
        // List Post
        docController.getMulti(req, res);
    });

router.route('/:category/:document')
    .get(function (req, res) {
        // Show Post
        docController.getSingle(req, res);
    });


module.exports = router;
