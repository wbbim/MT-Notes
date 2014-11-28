/**
 * Created by thonatos on 14/11/27.
 */

var init = function () {

    console.log("\n\n" +
    "儿时的梦想，终究未能实现。\n"+
    "如今还剩下什么呢？\n\n");

    resizeHeader();
    $(window).resize(resizeHeader);
};

function resizeHeader(){

    var _widowsHeight = $(window).height();
    var _layoutHeight = $('.layout').height();

    if( _widowsHeight > _layoutHeight){
        $('.header').height( (_widowsHeight - _layoutHeight ) / 2 );
    }
}

exports.init = init;
