/**
 * Created by thonatos on 14-11-8.
 */

var PRIVATE_API = '/users/post';
var PUBLIC_API = '/api/posts';

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
            return ajaxService.post(PRIVATE_API, post);
        }

        function del(pid) {
            return ajaxService.del(PRIVATE_API + '/' + pid);
        }

        function rev(pid, post) {
            return ajaxService.put(PRIVATE_API + '/' + pid, post);
        }

        function get(pid) {
            return ajaxService.get(PUBLIC_API + '/' + pid);
        }

        function getAll(pager) {
            return ajaxService.get(PUBLIC_API + '/page/' + pager);
        }
    }]);

module.exports = postService;
