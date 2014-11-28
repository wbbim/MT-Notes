/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();
var queryService = require('../service/queryService');

router.route('/')
    .get(function (req, res) {
        res.render('doc/multi',
            {
                title: 'Document',
                tmpl:'doc-multi',
                pages:'',
                current:''
            });
    });

router.route('/:document')
    .get(function (req, res) {

        var _document = req.param('document');
        var _queryString = '';
        var _template = {
            view: "",
            template : ''
        };

        if(isNaN(Number(_document))){
            _queryString = 'home/General/getEventInfo';

            _template.view = 'doc/single';
            _template.template = 'doc-single';
        }else{
            _queryString = 'home/General/getEventInfo/page/'+_document;

            _template.view = 'doc/multi';
            _template.template = 'doc-multi';
        }

        queryService.get(_queryString, function(err,result){
            if(err)
                res.render(_template.view,{
                    title : _document,
                    tmpl  :_template.template,
                    doc:{
                        flag    : false,
                        content : err
                    }
                });

            res.render(_template.view,{
                title : _document,
                tmpl  :_template.template,
                doc:{
                    flag    : true,
                    title   : result.from,
                    content : result.data
                }
            });
        });

    });

module.exports = router;
