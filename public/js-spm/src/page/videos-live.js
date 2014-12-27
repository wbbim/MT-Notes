/**
 * Created by thonatos on 14/12/16.
 */

var initPlayer = {

};

var init = function () {

    console.log('Live Page');

    var html5Player = require('../components/html5-player').create(
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

};



exports.init = init;