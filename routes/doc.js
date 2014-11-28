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
                pageTitle: 'Document',
                pageName:'doc-multi',
                pages:'',
                current:''
            });
    });

router.route('/:document')
    .get(function (req, res) {

        var _document = req.param('document');
        var _queryString = '';
        var _template = {
            templateType : '',
            templateName : ''
        };

        if(isNaN(Number(_document))){

            // Query Single
            _queryString = 'home/General/getEventInfo';

            _template.templateType = 'doc/single';
            _template.templateName = 'doc-single';
        }else{

            // Query lists
            _queryString = 'home/General/getEventInfo/page/'+_document;

            _template.templateType = 'doc/multi';
            _template.templateName = 'doc-multi';
        }

        console.log(_queryString);

        queryService.get(_queryString, function(err,result){

            var _gotData = !err;

            if(_template.templateType == 'doc/single'){

                res.render(_template.templateType,{
                    pageTitle : _document,
                    pageName  :_template.templateName,
                    pageContent:{
                        render    : _gotData,
                        title   : result.from,
                        content : result.data
                    }
                });

            }else if(_template.templateType == 'doc/multi'){

                res.render(_template.templateType,{
                    pageTitle : _document,
                    pageName  :_template.templateName,
                    pageContent:{
                        render    : _gotData,
                        title   : result.from,
                        content : result.data
                    }
                });

            }
        });

    });

module.exports = router;
