/**
 * Created by thonatos on 15/1/10.
 */

var moment = require('moment');
var postService = require('../service/postService').postService;

exports.postsController = {

    add: function (req, res) {

        var post = {
            name: req.body.title,
            desc: req.body.excerpt,
            tags: req.body.tags,
            date: moment().format("dddd, MMMM Do YYYY"),
            author: req.body.author,
            content: req.body.content,
            category: req.body.category
        };

        console.log(post);

        postService.add(post, function (data) {
            res.json(data);
        });

    },
    put: function (req, res) {

        var post = {
            name: req.body.title,
            desc: req.body.excerpt,
            tags: req.body.tags,
            date: moment().format("dddd, MMMM Do YYYY"),
            author: req.body.author,
            content: req.body.content,
            category: req.body.category
        };

        postService.put(post, function (data) {
            res.json(data);
        });

    },
    del: function (req, res) {

        var pid = req.params.pid;

        console.log(pid);

        postService.del(pid, function (data) {
            res.json(data);
        });

    },
    get: function (req,res) {

        var pid = req.params.pid;
        postService.get(pid, function (data) {

            res.json('posts/single', {
                pageTitle: data.post.name,
                pageName: 'posts-single',
                pageContent: data
            });
        });

    },

    getSingle: function (req, res) {

        var pid = req.params.pid;
        postService.get(pid, function (data) {
            //res.send(data);

            res.render('posts/single', {
                pageTitle: data.post.name,
                pageName: 'posts-single',
                pageContent: data
            });
        });

    },
    getAll: function (req, res) {

        var perPageNum = req.params.perPageNum || 2;
        var currentPage = req.params.currentPage || 1;

        postService.getAll(currentPage, perPageNum, function (data) {
            res.render('posts/multi', {
                pageTitle: 'Post',
                pageName: 'posts-multi',
                pageContent: data
            });

        });

    }
};