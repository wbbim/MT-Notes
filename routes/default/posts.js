/**
 * Created by thonatos on 15/1/10.
 */

var express = require('express');
var router = express.Router();

var postsController = require('../../controller/postsController').postsController;

// Render HTML

router.route('/')
    .get(postsController.getMulti);

router.route('/page/:currentPage')
    .get(postsController.getMulti);

router.route('/:pid')
    .get(postsController.getSingle);

module.exports = router;