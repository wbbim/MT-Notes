/**
 * Created by thonatos on 15/1/12.
 */

var Post = require('../models/post');

exports.postService = {

    add: function (post, callback) {

        var _post = new Post(post);

        console.log(_post);

        _post.save(function (err) {

            if (err) {
                console.log(err);

                callback(err);
                return;
            }

            callback({
                req: '/post',
                res: 'success',
                msg: post.name + " Added."
            });

        });
    },
    put: function (post, callback) {

        Post.findById(req.params.pid, function (err, _post) {
            if (err) {
                callback(err);
            }

            _post = post;

            _post.save(function (err) {
                if (err) {
                    callback(err);
                }

                callback({
                    req: '/post/' + req.params.pid,
                    res: 'success',
                    msg: req.body.name + " Updated."
                });
            });
        });

    },
    del: function (pid, callback) {

        Post.remove({
            _id: pid
        }, function (err, post) {
            if (err) {
                callback(err)
            }
            callback({
                req: '/post/' + pid,
                res: 'success',
                msg: pid + " Removed."
            });
        });

    },
    get: function (pid, callback) {

        Post.findById(pid, function (err, post) {
            if (err) {
                callback(err);
                return;
            }
            callback({
                post: post
            });
        });

    },
    getAll: function (currentPage, perPageNum, callback) {

        var perPageNum = perPageNum || 2;
        var currentPage = currentPage || 1;

        Post.count(function (err, totalRecords) {

            if (err) {
                callback(err);
            }


            Post.find().skip(( currentPage - 1 ) * perPageNum).limit(perPageNum).sort('-create_date').exec(function (err, posts) {

                if (err) {
                    return err;
                    return;
                }

                var pageCount = ( totalRecords - totalRecords % perPageNum ) / perPageNum;
                pageCount = ( totalRecords > pageCount * perPageNum ) ? ( pageCount + 1 ) : pageCount;

                callback({
                    pageCount: pageCount,
                    currentPage: currentPage,
                    perPageNum: perPageNum,
                    posts: posts
                });
            });
        });
    }
};