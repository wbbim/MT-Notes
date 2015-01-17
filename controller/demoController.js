/**
 * Created by thonatos on 14/12/16.
 */


exports.demoController = {
    live : function(req,res){
        res.render('demo/live', {
            pageTitle: 'Live',
            liveFlag: true
        });
    }
};