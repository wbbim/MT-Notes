var express = require('express');
var router = express.Router();
var moment = require('moment');
var Post = require('../../models/post');

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

        Post.count(function (err, totalRecords) {
            if (err)
                res.send(err);

            Post.find().skip(( currentPage - 1 ) * perPageNum).limit(perPageNum).sort('-create_date').exec(function (err, posts) {
                if (err)
                    res.send(err);

                var pageCount = ( totalRecords - totalRecords % perPageNum ) / perPageNum;
                pageCount = ( totalRecords > pageCount * perPageNum ) ? ( pageCount + 1 ) : pageCount;
                res.json({
                    pageCount: pageCount,
                    currentPage: currentPage,
                    perPageNum: perPageNum,
                    post: posts
                });
            });
        });
    });

router.route('/post')
    .post(function (req, res) {
        //var timestamp = Math.round(new Date().getTime() / 1000);
        console.log(req.body);
        var post = new Post({
            name: req.body.title,
            desc: req.body.excerpt,
            tags: req.body.tags,
            date: moment().format("dddd, MMMM Do YYYY"),
            author: req.body.author,
            content: req.body.content,
            category: req.body.category
        });
        post.save(function (err) {
            if (err)
                res.send(err);
            res.json({
                req: '/post',
                res: 'success',
                msg: req.body.title + " Added."
            });
        });
    });

router.route('/post/:pid')

    .get(function (req, res) {
        Post.findById(req.params.pid, function (err, post) {
            if (err)
                res.send(err);
            res.json(post);
        });
    })
    .put(function (req, res) {
        Post.findById(req.params.pid, function (err, post) {
            if (err)
                res.send(err);

            post.name = req.body.name;
            post.desc = req.body.desc;
            post.tags = req.body.tags;
            post.date = req.body.date;
            post.author = req.body.author;
            post.content = req.body.content;

            post.save(function (err) {
                if (err)
                    res.send(err);

                res.json({
                    req: '/post/' + req.params.pid,
                    res: 'success',
                    msg: req.body.name + " Updated."
                });
            });

        });
    })
    .delete(function (req, res) {
        Post.remove({
            _id: req.params.pid
        }, function (err, post) {
            if (err)
                res.send(err);
            res.json({
                req: '/post/' + req.params.pid,
                res: 'success',
                msg: req.params.pid + " Removed."
            });
        });
    });


module.exports = router;
