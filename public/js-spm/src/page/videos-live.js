/**
 * Created by thonatos on 14/12/16.
 */

var initPlayer = {

};

var init = function () {

    console.log('Live Page');

    var html5Player = require('../components/html5-player').create($('.live-section'),$('.live-section video'),document.getElementById("live-video"));
    html5Player.init();
    html5Player.resume();

};



exports.init = init;