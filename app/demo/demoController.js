/**
 * Created by thonatos on 14/12/16.
 */

var fileService = require('../common/service/fileService').fileService;

exports.demoController = {
    htmlVideo : function(req,res){
        res.render('demo/html-video', {
            pageTitle: 'Live',
            liveFlag: true
        });
    },
    updateBrowser : function(req,res){
        res.render('demo/update-browser', {
            pageTitle: 'Update Browser'
        });
    },
    mtNotes : function(req,res){
        res.render('demo/mt-notes', {
            pageTitle: 'MT Notes'
        });
    }
};