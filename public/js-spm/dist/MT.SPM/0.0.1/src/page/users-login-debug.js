define("MT.SPM/0.0.1/src/page/users-login-debug", [], function(require, exports, module) {
  /**
   * Created by thonatos on 14/11/27.
   */
  var init = function() {
    console.log('users-login');
    resizeHeight();
    // Don't ask me why i do this.
    setTimeout(function() {
      $('.layout').css({
        'opacity': 1
      });
    }, 200);
  };

  function resizeHeight() {
    var _widowsHeight = $(window).height();
    var _layoutHeight = $('.layout').height();
    if (_widowsHeight > _layoutHeight) {
      $('.header').css({
        'margin-top': (_widowsHeight - _layoutHeight) / 2
      });
    }
  }
  exports.init = init;
});