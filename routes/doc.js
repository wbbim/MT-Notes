/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();
var queryService = require('../service/queryService');
var renderService = require('../service/renderService');


var api = require('../conf/document').config;
var template = require('../conf/template').template;

router.route('/')
    .get(function (req, res) {

        // List Post
        getMulti(req, res);
    });

router.route('/:category')
    .get(function (req, res) {
        // List Post
        getMulti(req, res);
    });

router.route('/:category/:document')
    .get(function (req, res) {
        // Show Post
        getSingle(req, res);
    });


function getMulti(req, res) {

    // Query lists
    var _category = req.param('category') || '';

    template.templateType = 'doc/multi';
    template.templateName = 'doc-multi';

    var query = {
        host: api.host,
        port: api.port,
        path: api.path + _category
    };

    renderData(_category || 'Doc', query, res);

}

function getSingle(req, res) {

    // Query Single
    var _category = req.param('category');
    var _document = req.param('document');

    console.log(_document);

    var _path = _category + '/' + _document;

    template.templateType = 'doc/single';
    template.templateName = 'doc-single';

    var query = {
        host: api.host,
        port: api.port,
        path: api.path + _path
    };

    renderData(_document, query, res);
}

function renderData(pageTitle, queryString, res) {

    console.log(queryString);

    queryService.get(queryString, function (err, data) {

        var _gotData = !err;
        var _template = template;
        var _content = {};

        console.log(typeof data);

        //data = JSON.parse(data);

        if (_template.templateType == 'doc/single') {
            _content = renderService.renderMarkdown(JSON.parse(data));

        } else if (_template.templateType == 'doc/multi') {
            _content = eval(data);
        }

        res.render(_template.templateType, {
            pageTitle: pageTitle,
            pageName: _template.templateName,
            pageContent: {
                render: _gotData,
                title: pageTitle,
                content: _content
            }
        });

    });
}

module.exports = router;
