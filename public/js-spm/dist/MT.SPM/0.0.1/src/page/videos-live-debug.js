define("MT.SPM/0.0.1/src/page/videos-live-debug", [], function(require, exports, module) {
  /**
   * Created by thonatos on 14/12/16.
   */
  var initPlayer = {};
  var init = function() {
    console.log('Live Page');
    var html5Player = require("MT.SPM/0.0.1/src/components/html5-player-debug").create($('.live-section'), $('.live-section video'), document.getElementById("live-video"));
    html5Player.init();
    html5Player.resume();
  };
  exports.init = init;
});
define("MT.SPM/0.0.1/src/components/html5-player-debug", [], function(require, exports, module) {
  /**
   * Created by thonatos on 14/12/17.
   */
  var html5Player = {
    create: function($container, $video, $player) {
      var obj = {};
      var _protected = {};
      var $container = $container;
      var $video = $video;
      var $player = $player;
      var _dataUrl = $video.attr('data-src');
      obj.init = function() {
        _protected.init();
      };
      obj.resume = function() {
        _protected.resume();
      };
      _protected.init = function() {
        $video.remove();
        $video.find('source').attr('src', _dataUrl);
        $video.attr('autoplay', 'autoplay');
        $video.attr("preload", "auto");
        $container.append($video);
      };
      _protected.resume = function() {
        $player.src = _dataUrl;
        window.addEventListener('touchstart', function videoStart() {
          $player.play();
          this.removeEventListener('touchstart', videoStart);
        });
        $player.load();
      };
      return obj;
    }
  };
  exports.create = html5Player.create;
});