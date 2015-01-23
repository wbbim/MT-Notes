/**
 * Created by thonatos on 15/1/23.
 */

var BASE_URL = 'http://img.vzhibo.tv/introduction/';

var BASE_ARR = [
    {'name': 'a', 'point': [0,2,5,15,30,50]},
    {'name': 'b', 'point': [0,2,5,15,30,50]},
    {'name': 'c', 'point': [0,2,5,15,30,50]},
    {'name': 'd', 'point': [0,2,5,15,30,50]}
];

var BASE_SUF = '.mp4';

var WINDOW_WIDTH  = 0;
var WINDOW_HEIGHT = 0;

var $flashPlayer = {};
var $htmlPlayer = {};
var htmlPlayer = {};

function initDOMEvent() {

    WINDOW_WIDTH = $(window).innerWidth();
    WINDOW_HEIGHT = $(window).innerHeight();

    console.log(WINDOW_WIDTH,WINDOW_HEIGHT);

    var $btnWatch = document.getElementsByClassName('promote-btn')[0];

    $btnWatch.onclick = function () {
        location.href = 'http://vzhibo.tv';
    };
}

function initPlayer() {

    $flashPlayer = $('.flash-player');
    $htmlPlayer =  $('.html-player');

    if ($('html').hasClass('video')) {
        // USE HTML VIDEO
        playHtml();
        $flashPlayer.remove();
        $htmlPlayer.show();

    } else {
        // USE FLASH PLAYER
        playFlash();
        $htmlPlayer.remove();
        $flashPlayer.show();
    }


}

function playHtml() {

    //* 1.SHOW PREVIEW IMG
    //* 2.GET VIDEO
    //* 3.CHECK VIDEO LENGTH
    //*      L > 0: GO TO 4
    //*      L < 0 || L === NULL : GO TO 3
    //* 4.SHOW VIDEO
    //* 5.HIDE PREVIEW IMG

    var _interface = {};

    var TEMP_VIDEO_URL = BASE_URL + BASE_ARR[randomNumber(0,4)].name + BASE_SUF;

    console.log(TEMP_VIDEO_URL);

    var $videoSection = $('.html-player');
    var $video = $('.html-player video');
    var $player = document.getElementById("html5-video");

    htmlPlayer = require('../components/html5-player').create(_interface, $videoSection, $video, $player,
        {
            videoUrl: TEMP_VIDEO_URL,
            display: {
                all:false
            }
        });

    htmlPlayer.init();
    htmlPlayer.resume();

    /**
     * Get Random Number
     * @param start
     * @param end
     * @returns {number}
     */
    function randomNumber(start,end){
        return Math.floor(Math.random() * end + start);
    }

}

function playFlash(){

    $flashPlayer.find('object[name=index-player] param[name=flashvars]').attr( 'value', 'name=a');
    $flashPlayer.find('embed[name=index-player]').attr( 'width', WINDOW_WIDTH);
    $flashPlayer.find('embed[name=index-player]').attr( 'height', WINDOW_HEIGHT);

    $('.html-player').before($flashPlayer);
}

exports.init = function () {
    initDOMEvent();
    initPlayer();
};