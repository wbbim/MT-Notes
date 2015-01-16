define("MT.SPM/0.0.2/src/page/users-admin-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/12/15.
 */

var BASE_URL = '/users/admin/';

var init = function () {

    // SET BASE_TAG
    var util = require("MT.SPM/0.0.2/src/utils/common-debug");
    util.addBaseTag(BASE_URL);

    // SET ANGULAR
    var AngularSeedSpm = angular.module('ASS', [
        'ui.router',
        'ASS.post',
        'ASS.service'
    ]);

    var post = require("MT.SPM/0.0.2/src/page/admin/post/post-debug");
    var service = require("MT.SPM/0.0.2/src/page/admin/components/services/service-debug");

    AngularSeedSpm.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/post');
    }]);

    angular.bootstrap(document, ['ASS']);
};

exports.init = init;

});
define("MT.SPM/0.0.2/src/utils/common-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/12.
 */


exports.addBaseTag = function (url) {
    var _baseTag = document.createElement("base");
    _baseTag.setAttribute("href", url);
    document.getElementsByTagName("head")[0].appendChild(_baseTag);
};
});
define("MT.SPM/0.0.2/src/page/admin/post/post-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/12.
 */

var post = angular.module('ASS.post', ['ui.router']);

post.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('post', {
            url: '/post',
            views: {
                '': {
                    templateUrl: '/public/js-spm/src/page/admin/post/layout.html',
                    controller: 'postCtrl'
                },
                'side@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.side.html'
                },
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.main.html',
                    controller: 'postMainCtrl'
                }
            }
        })
        .state('post.list', {
            url: '/list',
            views: {
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.list.html',
                    controller: 'postListCtrl'
                }
            }
        })
        .state('post.add', {
            url: '/add',
            views: {
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.add.html',
                    controller: 'postAddCtrl'
                }
            }
        })
        .state('post.rev', {
            url: '/rev/:pid',
            views: {
                'main@post': {
                    templateUrl: '/public/js-spm/src/page/admin/post/post.rev.html',
                    controller: 'postRevCtrl'
                }
            }
        });
}]);

post.controller('postCtrl', ['$scope', function ($scope) {

    $scope.menuList = [
        {name: 'Main', url: 'post'},
        {name: 'List Post', url: 'post.list'},
        {name: 'Add Post', url: 'post.add'}
    ];
}]);

post.controller('postMainCtrl', ['$scope', 'postService', function ($scope, postService) {

    $scope.title = 'Post.Main';

}]);

post.controller('postListCtrl', ['$scope', 'postService', function ($scope, postService) {

    $scope.title = 'List all posts';

    var _currentPage = 1;

    render();

    $scope.prevPage = function () {
        if (_currentPage > 1) {
            _currentPage--;
            render();
        }
    };

    $scope.nextPage = function () {
        if ($scope.pageCount > _currentPage) {
            _currentPage++;
            render();
        }
    };

    $scope.del = function (pid) {
        console.log(pid);
        postService.del(pid).then(function (response) {
            console.log(response);
        })
    };

    function render() {

        postService.getAll(_currentPage).then(function (response) {

            $scope.post = response.posts;
            $scope.pageCount = response.pageCount;

            if ($scope.pageCount > _currentPage) {
                $scope.Next = true;
            } else {
                $scope.Next = false;
            }

            if (_currentPage > 1) {
                $scope.Prev = true;
            } else {
                $scope.Prev = false;
            }

            console.log(response);

        });
    }

}]);

post.controller('postAddCtrl', ['$scope', 'postService', function ($scope, postService) {

    $scope.title = 'Add a new post';


    $scope.categories = [
        {id: 1, name: 'Default'},
        {id: 2, name: 'Document'}];

    $scope.post = {};
    $scope.post.category = $scope.categories[0];


    $scope.submitPostForm = function (Valid) {
        if (Valid) {

            console.log($scope.post);
            postService.add($scope.post).then(function (response) {
                console.log(response);

                alert('success');
                $scope.post = {};
            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

post.controller('postRevCtrl', ['$scope','$stateParams','postService', function ($scope, $stateParams,postService) {

    $scope.title = 'Revision a old post';

    var pid = $stateParams.pid;

    postService.get(pid).then(function (response) {
        console.log(response);
        $scope.post = response.pageContent.post;
    });

    $scope.categories = [
        {id: 1, name: 'Default'},
        {id: 2, name: 'Document'}];

    $scope.submitPostForm = function (Valid) {
        if (Valid) {

            console.log($scope.post);
            postService.rev(pid,$scope.post).then(function (response) {
                console.log(response);
                alert('success');
            });
        } else {
            alert('you need complete the form');
        }
    };

}]);

module.exports = post;
});
define("MT.SPM/0.0.2/src/page/admin/components/services/service-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14-10-31.
 */

var service = angular.module('ASS.service', [
    'ASS.service.postService',
    'ASS.service.ajaxService'
]);

var post = require("MT.SPM/0.0.2/src/page/admin/components/services/postService-debug");
var ajax = require("MT.SPM/0.0.2/src/page/admin/components/services/ajaxService-debug");

module.exports = service;

});
define("MT.SPM/0.0.2/src/page/admin/components/services/postService-debug", [], function(require, exports, module){
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

});
define("MT.SPM/0.0.2/src/page/admin/components/services/ajaxService-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14-11-14.
 */

var ajaxService = angular.module('ASS.service.ajaxService', [])
    .factory('ajaxService', ['$http', function ($http) {

        return ({
            post: post,
            get: get,
            del: del,
            put: put
        });

        function post(url, data) {
            var promise = $http.post(url, data).then(function (response) {
                return response.data;
            });
            return promise;
        }

        function get(url) {
            var promise = $http.get(url).then(function (response) {
                return response.data;
            });
            return promise;
        }

        function del(url) {
            var promise = $http.delete(url).then(function (response) {
                return response.data;
            });
            return promise;
        }

        function put(url, data) {
            var promise = $http.put(url, data).then(function (response) {
                return response.data;
            });
            return promise;
        }
    }]);

module.exports = ajaxService;



});
