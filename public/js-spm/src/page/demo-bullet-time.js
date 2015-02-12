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

    var bulletWrapIndex = 0;

    initImg(initAnimation());

    var touchListener = require('../utils/touchListener').create($('.bullet-wrap'));

    touchListener.registerSwipeLeftCallback(function () {

        console.log('left', bulletWrapIndex);

        if (bulletWrapIndex > 0) {
            bulletWrapIndex--;
        }

        if (bulletWrapIndex > -1) {
            translate();
        }

    });

    touchListener.registerSwipeRightCallback(function () {

        console.log('right', bulletWrapIndex);

        if (bulletWrapIndex < 3) {
            bulletWrapIndex++;
        }

        if (bulletWrapIndex < 4) {
            translate();
        }

    });

    function translate() {

        console.log(bulletWrapIndex);

        $('.box-ul').css({
            'left': -300 * bulletWrapIndex + 'px'
        });
    }

};