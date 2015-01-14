var express = require('express');
var router = express.Router();

var postsController = require('../../controller/postsController').postsController;

// Return Json
router.route('/')
    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to @TF.ME!'
        });
    });

router.route('/posts/page/:currentPage')
    .get(postsController.getAll);

router.route('/posts/:pid')
    .get(postsController.get);

module.exports = router;
