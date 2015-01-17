/**
 * Created by thonatos on 14/12/16.
 */

var init = function () {

    var public = require('./public');
    public.init();

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

    var updateBrowser = require('../components/update-browser').create('',false);

    updateBrowser.init();
};



exports.init = init;