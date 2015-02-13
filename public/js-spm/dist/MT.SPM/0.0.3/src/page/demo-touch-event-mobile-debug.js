define("MT.SPM/0.0.3/src/page/demo-touch-event-mobile-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/2/11.
 */

function initImg(callback) {

    function setImg(obj, url) {
        var img = new Image();
        img.src = url;

        if (img.complete) {
            obj.setAttribute('src', url);
            obj.style.display = '';
        } else {
            img.onload = function () {
                obj.setAttribute('src', url);
                obj.style.display = '';


            };
            img.onerror = function () {
                setDefaultImg(obj, url);
            };
        }
    }

    function setDefaultImg(obj, url) {
        if (!url) return;

        var img = new Image();
        img.src = url;

        if (img.complete) {
            obj.setAttribute('src', url);
            obj.style.display = '';
        } else {
            img.onload = function () {
                obj.setAttribute('src', url);
                obj.style.display = '';
            };
        }
    }

    var imgs = document.getElementsByTagName('img');

    for (var i = 0; i < imgs.length; i++) {
        setImg(imgs[i], imgs[i].getAttribute('src'));
    }

    if (callback) {
        callback();
    }

}

function initAnimation() {

    var animation = function (obj, fps, times, callback) {

        var runing = false;
        var handler = null;

        var step = 0;       //当前帧
        var steps = fps;
        var time = 0;       //当前第几轮

        var speed = 1000 / fps;      //间隔时间

        console.log(speed);


        function _play() {
            if (step >= steps) {
                step = 0;
                time++;
            }
            if (0 == times || time < times) {


                obj.css('top', (-225 * step) + 'px');

                step++;
            } else {
                control.stop();
                callback && callback();
            }
        }

        var control = {
            start: function () {
                if (!runing) {
                    runing = true;
                    step = time = 0;
                    handler = setInterval(_play, speed);
                }
                return this;
            }

            , stop: function (restart) {
                if (runing) {
                    runing = false;
                    if (handler) {
                        clearInterval(handler);
                        handler = null;
                    }
                    if (restart) {
                        obj.css('top', '0px');
                        step = 0;
                        time = 0;
                    }
                }
            }
            , dispose: function () {
                this.stop();
                //console.log('anim dispose');
            }
        };
        return control;
    };
    var anim = animation($('.img-ul'), 15 / 4, 5);
    anim.start();
}

exports.init = function () {

    var degreeX = 0;
    var degreeY = 0;

    //initImg(initAnimation());

    var touchListener = require("MT.SPM/0.0.3/src/utils/touchListener-debug").create($('.box-3d'));

    touchListener.registerSwipeLeftCallback(function () {
        degreeY -= 120;
        translate('left',degreeX,degreeY);
    });

    touchListener.registerSwipeRightCallback(function () {
        degreeY += 120;
        translate('right',degreeX,degreeY);
    });

    touchListener.registerSwipeUpCallback(function () {
        degreeX -= 120;
        translate('up',degreeX,degreeY);
    });

    touchListener.registerSwipeDownCallback(function () {

        degreeX += 120;
        translate('down',degreeX,degreeY);
    });



    function translate(direction,x,y) {
        $('.direction span').html(direction);
        $('.degree-x span').html(x);
        $('.degree-y span').html(y);
        $('.box-3d .rectangle').css({
            'transform': 'rotateX('+ x +'deg)'+' rotateY('+ y +'deg)'
        });
    }

};
});
define("MT.SPM/0.0.3/src/utils/touchListener-debug", [], function(require, exports, module){
/**
 * @fileOverview mobile touch event listener
 *               expose a series of callbacks
 * @author Max
 * created at Mon Sep 01 2014 16:10:48 GMT+0800 (CST)
 */


var TouchListener = {
    HIJACK_UP: 8,
    HIJACK_RIGHT: 4,
    HIJACK_DOWN: 2,
    HIJACK_LEFT: 1,
    create: function ($target, userOptions) {
        var obj = {};

        // 0000 4bit mask
        // 1000 stands for up
        // 0100 stands for right
        // 0010 stands for down
        // 0001 stands for left
        var hijackMask = 0;

        userOptions = userOptions || {};
        var options = {
            swipeHorizontalDistance: userOptions.swipeHorizontalDistance || 30,
            swipeVerticalDistance: userOptions.swipeVerticalDistance || 30,
            timeout: 300
        };
        var swipeUpCallback, swipeDownCallback, swipeLeftCallback, swipeRightCallback;

        var path = new Array();
        var isPathAlive;
        var isGestureDetected;


        // constructor
        bindEvents();

        obj.setHijackMask = function (mask) {
            hijackMask = hijackMask | mask;
        }
        obj.hijackAll = function () {
            hijackMask = TouchListener.HIJACK_UP +
            TouchListener.HIJACK_RIGHT +
            TouchListener.HIJACK_DOWN +
            TouchListener.HIJACK_LEFT;
        }
        obj.freeAll = function () {
            hijackMask = 0;
        }
        obj.freeHijackMask = function (mask) {
            hijackMask |= mask;
            hijackMask -= mask;
        }

        obj.registerSwipeUpCallback = function (callback) {
            swipeUpCallback = callback;
        }
        obj.registerSwipeDownCallback = function (callback) {
            swipeDownCallback = callback;
        }
        obj.registerSwipeLeftCallback = function (callback) {
            swipeLeftCallback = callback;
        }
        obj.registerSwipeRightCallback = function (callback) {
            swipeRightCallback = callback;
        }


        function bindEvents() {
            $target.bind('touchstart', function (e) {
                var point = generateCurrentOrigin(e);

                isPathAlive = true;
                isGestureDetected = false;
                path = [];
                path.push(point);

                return true;
            });
            $target.bind('touchmove', function (e) {
                if (!isPathAlive) return false;

                var point = generateCurrentOrigin(e);
                if (!point) {
                    isPathAlive = false;
                    return false;
                }

                path.push(point);
                var prevPoint = path[path.length - 2];

                var offsetX = point.left - prevPoint.left;
                var offsetY = point.top - prevPoint.top;

                // simulate touchmove behaviour
                var xMask = offsetX > 0 ? TouchListener.HIJACK_RIGHT : TouchListener.HIJACK_LEFT;
                var yMask = offsetY > 0 ? TouchListener.HIJACK_DOWN : TouchListener.HIJACK_UP;
//                if(!(xMask & hijackMask)) {
//                    $target.scrollLeft($target.scrollLeft() - offsetX);
//                }
                if (!(yMask & hijackMask)) {
//                    $target.scrollTop($target.scrollTop() - offsetY);
                } else {
                    e.preventDefault();
                }

                // analyze gesture
                analyzeGesture();

            });
            $target.bind('touchend', function (e) {

            })
        }

        function analyzeGesture() {
            if (isGestureDetected) return;

            var firstPoint = path[0];
            var lastPoint = path[path.length - 1];


            // swipe gesture
            // swipe up
            if (firstPoint.top - lastPoint.top > options.swipeVerticalDistance &&
                lastPoint.timestamp - firstPoint.timestamp < options.timeout) {
                isGestureDetected = false;
                if (swipeUpCallback) {
                    var flag = swipeUpCallback();
                    if (flag) {
                        isPathAlive = false;
                    }
                }
            }

            // swipe down
            if (lastPoint.top - firstPoint.top > options.swipeVerticalDistance &&
                lastPoint.timestamp - firstPoint.timestamp < options.timeout) {
                isGestureDetected = false;
                if (swipeDownCallback) {
                    var flag = swipeDownCallback();
                    if (flag) {
                        isPathAlive = false;
                    }
                }
            }

            // swipe left
            if (lastPoint.left - firstPoint.left > options.swipeHorizontalDistance &&
                lastPoint.timestamp - firstPoint.timestamp < options.timeout) {
                isGestureDetected = false;
                if (swipeLeftCallback) {
                    var flag = swipeLeftCallback();
                    if (flag) {
                        isPathAlive = false;
                    }
                }

            }

            // swipe right
            if (firstPoint.left - lastPoint.left > options.swipeHorizontalDistance &&
                lastPoint.timestamp - firstPoint.timestamp < options.timeout) {
                isGestureDetected = false;
                if (swipeRightCallback) {
                    var flag = swipeRightCallback();
                    if (flag) {
                        isPathAlive = false;
                    }
                }
            }

        }

        function generateCurrentOrigin(e) {
            var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];

            var point = {
                left: touch.clientX,
                top: touch.clientY,
                timestamp: new Date().valueOf()
            };

            return point;
        }


        return obj;
    }
}

module.exports = TouchListener;

});
