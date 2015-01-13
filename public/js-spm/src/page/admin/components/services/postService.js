/**
 * Created by thonatos on 14-11-8.
 */

var _postUrl  = '/users/post';
var _postsUrl = '/api/posts';
var _user = 'thonatos';

var postService = angular.module('ASS.service.postService', [])
    .factory('postService', ['ajaxService', function (ajaxService) {

        return ({
            add: _add,
            del: _del,
            rev: _rev,
            get: _get,
            getAll: _getAll
        });

        function _add(post) {

            post.category = post.category.name;
            post.author = _user || 'nobody';
            return ajaxService.post(_postUrl, post);
        }

        function _del(pid) {
            return ajaxService.del(_postUrl + '/' + pid);
        }

        function _rev(pid, post) {
            return ajaxService.put(_postUrl + '/' + pid, post);
        }

        function _get(pid) {
            return ajaxService.get(_postUrl + '/' + pid);
        }

        function _getAll(pager) {
            return ajaxService.get(_postsUrl + '/' + pager);
        }
    }]);

module.exports = postService;
