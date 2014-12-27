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