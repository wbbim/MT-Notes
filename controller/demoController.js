/**
 * Created by thonatos on 14/12/16.
 */


exports.demoController = {
    videolive : function(req,res){
        res.render('demo/video-live', {
            pageTitle: 'Live',
            liveFlag: true
        });
    },
    updateBrowser : function(req,res){
        res.render('demo/update-browser', {
            pageTitle: 'Update Browser'
        });
    },
    backgroundVideo: function (req, res) {
        res.render('demo/background-video', {
            pageTitle: 'Background Video'
        });
    }
};