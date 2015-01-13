/**
 * Created by thonatos on 15/1/10.
 */

var express = require('express');
var router = express.Router();

var postsController = require('../../controller/postsController').postsController;

router.route('/')
    .get(postsController.getAll);

router.route('/page/:currentPage')
    .get(postsController.getAll);

router.route('/:pid')
    .get(postsController.getSingle);

module.exports = router;