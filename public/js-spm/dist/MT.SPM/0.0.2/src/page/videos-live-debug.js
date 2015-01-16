define("MT.SPM/0.0.2/src/page/videos-live-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/12/16.
 */

var initPlayer = {

};

var init = function () {

    console.log('Live Page');

    var html5Player = require("MT.SPM/0.0.2/src/components/html5-player-debug").create(
        $('.video-section'),
        $('.video-section video'),
        document.getElementById("html5-video"),
        {
            display:{
              volumeControl:false
            },
            control:
            {
                progress:false,
                volume:false
            }
        }

    );
    html5Player.init();
    html5Player.resume();

    var updateBrowser = require("MT.SPM/0.0.2/src/components/update-browser-debug").create('',false);

    updateBrowser.init();
};



exports.init = init;
});
define("MT.SPM/0.0.2/src/components/html5-player-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 14/12/17.
 */

var html5Player = {

    create: function ($container, $video, $player, options) {

        var obj = {};
        var _protected = {};

        /**
         * Variable
         * --------
         *
         * $container
         * $video
         * $player
         *
         * options
         *      play
         *      mute
         *      progress
         *      volume
         *      fullScreen
         *
         * _dataUrl
         *
         */

        var $container = $container;
        var $video = $video;
        var $player = $player;
        var _options = options || {};

        var _dataUrl = $video.attr('data-src');

        /**
         * obj
         * --------
         *
         * init
         * stop
         * pause
         * resume
         *
         */

        /**
         * Handler
         * --------
         *
         * playingHandler
         * playHandler
         * pauseHandler
         * timeupdateHandler
         *
         * toggleFullScreen
         * toggleMute
         *
         * timeupdate
         *
         */

        /**
         * Event
         * --------
         *
         * seekBar.change
         * volumeBar.change
         */

        obj.init = function () {
            _protected.init();
        };

        obj.resume = function () {
            _protected.resume();
        };


        _protected.init = function () {


            $video.remove();
            $video.find('source').attr('src', _dataUrl);
            //$video.attr('autoplay', 'autoplay');
            //$video.attr("preload", "auto");

            $container.prepend($video);

            var _controls = '';

            _controls += '<div class="video-controls">';
            _controls += '<div class="controls-container">';
            _controls += '<div class="play">';
            _controls += ' <a class="button" id="play-pause"></a>';
            _controls += '</div>';
            _controls += '<div class="progress">';
            _controls += '<input type="range" id="seek-bar" class="seek-bar" value="0">';
            _controls += '</div>';
            _controls += '<div class="mute">';
            _controls += '<a class="button" id="mute"></a>';
            _controls += '</div>';
            _controls += '<div class="volume">';
            _controls += '<input type="range" id="volume-bar" class="volume-bar" min="0" max="1" step="0.1" value="1">';
            _controls += '</div>';
            _controls += '<div class="full-screen">';
            _controls += '<a class="button" id="full-screen"></a>';
            _controls += '</div>';
            _controls += '</div>';
            _controls += '</div>';

            $container.append(_controls);
        };

        _protected.resume = function () {

            $player.src = _dataUrl;
            window.addEventListener('touchstart', function videoStart() {
                $player.play();
                this.removeEventListener('touchstart', videoStart);
            });

            $player.load();
            _protected.updatePlayerStyle();
            _protected.playerHandler();
        };

        _protected.updatePlayerStyle = function () {


            // Container
            var _videoWidth = $container.find('video').width();
            var _left = 0;


            // hide volume and mute
            if (!_options.display.volumeControl) {
                $container.find('.video-controls .mute').hide();
                $container.find('.video-controls .volume').hide();
            }

            // show / hide volume
            if (_options.display.volumeControl) {

                _left = _videoWidth - 36 * 3 - 4 * 5;

                $container.find('.progress').css({
                    'width': _left * 0.6
                });

                $container.find('.volume').css({
                    'width': _left * 0.35
                });
            } else {

                _left = _videoWidth - 36 * 2 - 4 * 3;

                $container.find('.progress').css({
                    'width': _left * 0.99
                });
            }


        };

        _protected.playerHandler = function () {

            /**
             * Event
             * --------
             * playButton.play-pause.click
             * muteButton.mute.click
             * fullScreenButton.full-screen.click
             *
             * seekBar.change
             * volumeBar.change
             */

            // Buttons
            var playButton = document.getElementById("play-pause");
            var muteButton = document.getElementById("mute");
            var fullScreenButton = document.getElementById("full-screen");

            // Sliders
            var seekBar = document.getElementById("seek-bar");
            var volumeBar = document.getElementById("volume-bar");

            // Event listener for the play/pause button
            playButton.addEventListener("click", function () {
                if ($player.paused == true) {
                    $player.play();

                    //playButton.innerHTML = "Pause";
                    playButton.style.backgroundImage = 'url(/public/images/player/player-pause.svg)';
                } else {
                    $player.pause();
                    //playButton.innerHTML = "Play";
                    playButton.style.backgroundImage = 'url(/public/images/player/player-play.svg)';
                }
            });


            // Event listener for the mute button
            muteButton.addEventListener("click", function () {
                if ($player.muted == false) {
                    $player.muted = true;
                    //muteButton.innerHTML = "Unmute";
                    muteButton.style.backgroundImage = 'url(/public/images/player/player-mute.svg)';
                } else {
                    $player.muted = false;
                    //muteButton.innerHTML = "Mute";
                    muteButton.style.backgroundImage = 'url(/public/images/player/player-unmute.svg)';
                }
            });


            // Event listener for the full-screen button
            fullScreenButton.addEventListener("click", function () {
                if ($player.requestFullscreen) {
                    $player.requestFullscreen();
                } else if ($player.mozRequestFullScreen) {
                    $player.mozRequestFullScreen(); // Firefox
                } else if ($player.webkitRequestFullscreen) {
                    $player.webkitRequestFullscreen(); // Chrome and Safari
                }
            });

            // Event listener for the seek bar
            seekBar.addEventListener("change", function () {
                var _time = $player.duration * (seekBar.value / 100);

                if(_options.control.progress){
                    if ($player.seekable) {
                        $player.currentTime = _time;
                    } else {
                        seekTo(_time);
                    }
                }

                function seekTo(value) {
                    if ($player.seekable) {
                        $player.currentTime = value;

                        return false;
                    } else {
                        setTimeout(function () {
                            seekTo(value);
                        }, 500)
                    }
                }
            });

            // Event listener for the volume bar
            volumeBar.addEventListener("change", function () {
                $player.volume = volumeBar.value;
            });


            //Add listener handler
            $player.addEventListener('play', playHandler, false);
            $player.addEventListener('pause', pauseHandler, false);
            $player.addEventListener('playing', playingHandler, false);
            $player.addEventListener('timeupdate', timeUpdateHandler, false);
            $player.addEventListener('touchstart', touchStartHandler, false);
            $player.addEventListener('touchend', touchEndHandler, false);


            /**
             * Handler
             * --------
             *
             * playingHandler
             * playHandler
             * pauseHandler
             * timeupdateHandler
             *
             * toggleFullScreen
             * toggleMute
             *
             * timeupdate
             *
             * touchStartHandler
             * touchEndHandler
             *
             */

            function playingHandler() {
                console.log(getTime() + ' Player.Playing');
            }

            function pauseHandler() {
                console.log(getTime() + ' Player.Pause');
            }

            function playHandler() {
                console.log(getTime() + ' Player.Play');
            }

            function timeUpdateHandler() {
                console.log(getTime() + ' Player.timeUpdate');
                var _value = (100 / $player.duration) * $player.currentTime;
                seekBar.value = _value;
            }

            function touchStartHandler() {
                console.log(getTime() + ' Player.touchStart');
                $('.live-controls').css({
                    'opacity': 0.9
                });
            }

            function touchEndHandler() {
                console.log(getTime() + ' Player.touchEnd');
                setTimeout(function () {
                    $('.live-controls').css({
                        'opacity': 0
                    });
                }, 2000);
            }

            function getTime() {
                return (new Date().getTime());
            }
        };

        return obj;
    }
};

exports.create = html5Player.create;
});
define("MT.SPM/0.0.2/src/components/update-browser-debug", [], function(require, exports, module){
/**
 * Created by thonatos on 15/1/16.
 */


var updateBrowser = {

    create: function (options, test) {
        
        var _protected = {};

        var obj = {};

        obj.options = options || {};

        obj.options.versionRequied = {i: 8, f: 23, o: 12, s: 6.2, n: 12, c: 28};
        obj.options.versionDefault = {i: 8, f: 23, o: 12, s: 6.2, n: 12, c: 28};
        obj.options.versionMinimal = {i: 9, f: 23, o: 12, s: 6.2, n: 12, c: 28};

        obj.options.version = options.version || obj.options.versionDefault;

        // Options

        var _navigator = window.navigator, _browser;

        _protected.init = function () {

            // Loop
            for (_browser in obj.options.versionRequied) {
                if (obj.options.version[_browser] >= obj.options.versionRequied[_browser])
                    obj.options.version[_browser] = obj.options.version[_browser] - 0.2;
                if (!obj.options.version[_browser])
                    obj.options.version[_browser] = obj.options.versionDefault[_browser];
                if (obj.options.version[_browser] < obj.options.versionMinimal[_browser])
                    obj.options.version[_browser] = obj.options.versionMinimal[_browser];
            }

            obj.options.test = test || options.test || false;

            if (window.location.hash == "#test-bu") {
                obj.options.test = true;
            }

        };

        _protected.getBrowser = function () {

            var n, v, t, ua = navigator.userAgent;
            var names = {
                i: 'Internet Explorer',
                f: 'Firefox',
                o: 'Opera',
                s: 'Apple Safari',
                n: 'Netscape Navigator',
                c: "Chrome",
                x: "Other"
            };
            if (/bot|googlebot|facebook|slurp|wii|silk|blackberry|mediapartners|adsbot|silk|android|phone|bingbot|google web preview|like firefox|chromeframe|seamonkey|opera mini|min|meego|netfront|moblin|maemo|arora|camino|flot|k-meleon|fennec|kazehakase|galeon|android|mobile|iphone|ipod|ipad|epiphany|rekonq|symbian|webos/i.test(ua)) n = "x";
            else if (/Trident.*rv:(\d+\.\d+)/i.test(ua)) n = "i";
            else if (/Trident.(\d+\.\d+)/i.test(ua)) n = "io";
            else if (/MSIE.(\d+\.\d+)/i.test(ua)) n = "i";
            else if (/OPR.(\d+\.\d+)/i.test(ua)) n = "o";
            else if (/Chrome.(\d+\.\d+)/i.test(ua)) n = "c";
            else if (/Firefox.(\d+\.\d+)/i.test(ua)) n = "f";
            else if (/Version.(\d+.\d+).{0,10}Safari/i.test(ua))    n = "s";
            else if (/Safari.(\d+)/i.test(ua)) n = "so";
            else if (/Opera.*Version.(\d+\.\d+)/i.test(ua)) n = "o";
            else if (/Opera.(\d+\.?\d+)/i.test(ua)) n = "o";
            else if (/Netscape.(\d+)/i.test(ua)) n = "n";
            else return {n: "x", v: 0, t: names[n]};

            //do not notify ver old systems since their is no up-to-date browser available
            if (/windows.nt.5.0|windows.nt.4.0|windows.98|os x 10.4|os x 10.5|os x 10.3|os x 10.2/.test(ua)) n = "x";

            //do not notify firefox ESR
            if (n == "f" && v == 24)
                n = "x";
            //do not notify opera 12 on linux since it is the latest version
            if (/linux|x11|unix|bsd/.test(ua) && n == "o" && v > 12)
                n = "x";

            if (n == "x") return {n: "x", v: 0, t: names[n]};

            v = new Number(RegExp.$1);
            if (n == "so") {
                v = ((v < 100) && 1.0) || ((v < 130) && 1.2) || ((v < 320) && 1.3) || ((v < 520) && 2.0) || ((v < 524) && 3.0) || ((v < 526) && 3.2) || 4.0;
                n = "s";
            }
            if (n == "i" && v == 7 && window.XDomainRequest) {
                v = 8;
            }
            if (n == "io") {
                n = "i";
                if (v > 6) v = 11;
                else if (v > 5) v = 10;
                else if (v > 4) v = 9;
                else if (v > 3.1) v = 8;
                else if (v > 3) v = 7;
                else v = 9;
            }
            return {n: n, v: v, t: names[n] + " " + v};
        };

        _protected.generateInfo = function () {

            // Div

            var _PixRatio = (window.devicePixelRatio > 1)?2:1;

            var div = document.createElement("div");
            obj.options.div = div;

            div.id = "update-browser";
            div.className = "update-browser";

            var _rawHTML = '\
                    <div class="update-browser-box">\
                        <div class="update-browser-icon"><img src="/public/images/icon/'+_PixRatio+'x/updataBrowserIcon.png'+'" alt=""></div>\
                        <div class="update-browser-info"><p>马上升级你的浏览器，活的更流畅的访问体验</p></div>\
                        <div class="update-browser-action"><a href="#">免费更新</a></div>\
                    </div>\
                    <div class="update-browser-close"><a id="update-browser-button-close" href="#">残忍拒绝</a></div></div>';

            div.innerHTML = options.div || _rawHTML;

            // Style
            var sheet = document.createElement("style");

            var _rawCSS =  '.update-browser {position: fixed;top: 0;left: 0;padding: 14px 0;width: 100%;display: table;background: #f4f4f4;box-shadow: 0 0 4px #000000;z-index: 9999;}\
.update-browser-box{margin: 0 auto;width: 600px;}\
.update-browser-box:before{content: \' \';display: table;}\
.update-browser-box:after{content: \' \';clear: both;display: table;}\
.update-browser-icon,.update-browser-info,.update-browser-action {display: inline-block;float: left;}\
.update-browser-icon img{width: 28px;vertical-align: middle;}\
.update-browser-info p{margin: 10px;display: block;font-size: 16px;color: #505050;}\
.update-browser-action a{padding: 10px 0;display: block;font-size: 16px;color: #2732c9;}\
.update-browser-close{position: absolute;top: 23px;right: 23px;}\
.update-browser-close a{display: block;text-decoration: none;font-size: 12px;color: #858689;}';

            var style = options.style || _rawCSS;

            // Insert
            document.body.insertBefore(div, document.body.firstChild);
            document.getElementsByTagName("head")[0].appendChild(sheet);

            // Append
            try {
                sheet.innerText = style;
                sheet.innerHTML = style;
            }
            catch (e) {
                try {
                    sheet.styleSheet.cssText = style;
                }
                catch (e) {
                    return;
                }
            }

            document.getElementById('update-browser-button-close').onclick = function (e) {
                e.preventDefault();

                obj.options.div.style.display = "none";

            }
        };

        _protected.appendInfo = function () {

            // GetBrowser
            obj.options.browser = _protected.getBrowser();

            // Detect
            if (!obj.options.test && (!obj.options.browser || !obj.options.browser.n || obj.options.browser.n == "x" || obj.options.browser.v > obj.options.version[obj.options.browser.n])){
                return;
            }

            _protected.generateInfo();
            
        };


        obj.init = function () {
            _protected.init();

            _protected.appendInfo();
        };

        return obj;

    }
};

exports.create = updateBrowser.create;

});
