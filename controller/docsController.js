/**
 * Created by thonatos on 14/12/7.
 */

var queryService = require('../service/queryService');
var renderService = require('../service/renderService');

var api = require('../conf/document').config;
var template = require('../conf/template').template;

var routerHandler = {

    getMulti: function (req, res) {

        // Query lists
        var _category = req.param('category') || '';

        template.templateType = 'docs/multi';
        template.templateName = 'docs-multi';

        var query = {
            host: api.host,
            port: api.port,
            path: api.path + _category
        };

        routerHandler.renderData(_category || 'Docs', query, res);

    },

    getSingle: function (req, res) {

        // Query Single
        var _category = req.param('category');
        var _document = req.param('document');

        //console.log(_document);

        var _path = _category + '/' + _document;

        template.templateType = 'docs/single';
        template.templateName = 'docs-single';

        var query = {
            host: api.host,
            port: api.port,
            path: api.path + _path
        };

        routerHandler.renderData(_document.replace(/\.md$/,''), query, res);
    },

    renderData: function (pageTitle, queryString, res) {

        //console.log(queryString);

        queryService.get(queryString, function (err, data) {

            var _gotData = !err;
            var _template = template;
            var _content = {};


            if (_template.templateType == 'docs/single') {
                _content = renderService.renderMarkdown(JSON.parse(data));

            } else if (_template.templateType == 'docs/multi') {
                _content = eval(data);

                // Remove ignore list file.

                if (_content[0].name == '.gitignore') {
                    _content = _content.slice(1);
                }
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
};

exports.docsController = routerHandler;