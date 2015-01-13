/**
 * Created by thonatos on 14-11-8.
 */

var _postUrl  = '/users/post';
var _postsUrl = '/api/posts';
var _user = 'thonatos';

var postService = angular.module('ASS.service.postService', [])
    .factory('postService', ['ajaxService', function (ajaxService) {

        return ({
            add: add,
            del: del,
            rev: rev,
            get: get,
            getAll: getAll
        });

        function add(post) {

            post.category = post.category.name;
            post.author = _user || 'nobody';
            return ajaxService.post(_postUrl, post);
        }

        function del(pid) {
            return ajaxService.del(_postUrl + '/' + pid);
        }

        function rev(pid, post) {
            return ajaxService.put(_postUrl + '/' + pid, post);
        }

        function get(pid) {
            return ajaxService.get(_postUrl + '/' + pid);
        }

        function getAll(pager) {
            return ajaxService.get(_postsUrl + '/' + pager);
        }
    }]);

module.exports = postService;
