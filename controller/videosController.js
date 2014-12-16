/**
 * Created by thonatos on 14/12/16.
 */


exports.videosController = {
    liveGet : function(req,res){
        res.render('videos/live', {
            pageTitle: 'Live',
            pageName: 'videos-live',
            liveFlag: true
        });
    }
};