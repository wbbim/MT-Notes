/**
 * Created by thonatos on 15/4/30.
 */

var fmService = require('../common/service/fmService').fmService;

exports.fmController = {
    
    // Return Json
    get: function (req, res) {

        fmService.getMusicInfo(req.params.musicId, function (data) {
            console.log(data);
            res.json(data);
        });

    },
    getPlayList:function(req,res) {
        fmService.getListInfo('2096362',function(data) {
            res.json(data);
        }) ;  
    }
};