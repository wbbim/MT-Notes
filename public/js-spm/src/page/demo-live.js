/**
 * Created by thonatos on 14/12/16.
 */

var init = function () {

    var public = require('./public');
    public.init();

    console.log('Live Page');

    var SOURCE = ['http://media.html5media.info/video.mp4','http://img.vzhibo.tv/introduction/a.mp4'];
    var html5Player = require('../components/html5-player').create(
        '',
        $('.video-section'),
        $('.video-section video'),
        document.getElementById("html5-video"),
        {
            videoUrl: SOURCE[1],
            display: {
                all:true
            }
        }

    );
    html5Player.init();
    html5Player.resume();

    var updateBrowser = require('../components/update-browser').create('',false);

    updateBrowser.init();
};



exports.init = init;