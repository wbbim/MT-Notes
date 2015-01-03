define("MT.SPM/0.0.1/src/page/index-index-debug", [], function(require, exports, module) {
  /**
   * Created by thonatos on 14/11/27.
   */
  var init = function() {
    console.log("\n\n" + "儿时的梦想，终究未能实现。\n" + "如今还剩下什么呢？\n\n");
    //var modal = require('../modal/modal').create(null);
    //modal.init();
    //resizeHeader();
    //$(window).resize(resizeHeader);
    randomBackground();
  };

  function randomBackground() {
    //var _num = (Math.random()*10).toFixed(0) % 2;
    var _num = Math.floor(Math.random() * 3 + 1) - 1;
    var _bgSrc = '0' + _num.toString();
    var $wrap = $('.wrap');
    $wrap.css({
      "background-image": 'url(/public/images/bg/' + _bgSrc + '.jpg)'
    });
  }

  function resizeHeader() {
    var _widowsHeight = $(window).height();
    var _layoutHeight = $('.layout').height();
    if (_widowsHeight > _layoutHeight) {
      $('.header').height((_widowsHeight - _layoutHeight) / 2);
    }
  }
  exports.init = init;
});