var express = require('express');
var router = express.Router();
var Post = require('../../models/post');

var postService = require('../../service/postService').postService;

router.route('/')

    .get(function (req, res) {
        res.json({
            req: '/',
            res: '',
            msg: 'Welcome to @TF.ME!'
        });
    });

router.route('/posts/:currentPage')

    .get(function (req, res) {
        var perPageNum = req.params.perPageNum || 2,
            currentPage = req.params.currentPage || 1;

        postService.getAll(currentPage, perPageNum, function (data) {

            res.json({
                pageCount: data.pageCount,
                currentPage: data.currentPage,
                perPageNum: data.perPageNum,
                posts: data.posts
            });

        });

    });


module.exports = router;
