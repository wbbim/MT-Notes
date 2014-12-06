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

        template.templateType = 'doc/multi';
        template.templateName = 'doc-multi';

        var query = {
            host: api.host,
            port: api.port,
            path: api.path + _category
        };

        this.renderData(_category || 'Doc', query, res);

    },

    getSingle: function (req, res) {

        // Query Single
        var _category = req.param('category');
        var _document = req.param('document');

        //console.log(_document);

        var _path = _category + '/' + _document;

        template.templateType = 'doc/single';
        template.templateName = 'doc-single';

        var query = {
            host: api.host,
            port: api.port,
            path: api.path + _path
        };

        this.renderData(_document, query, res);
    },

    renderData: function (pageTitle, queryString, res) {

        //console.log(queryString);

        queryService.get(queryString, function (err, data) {

            var _gotData = !err;
            var _template = template;
            var _content = {};


            if (_template.templateType == 'doc/single') {
                _content = renderService.renderMarkdown(JSON.parse(data));

            } else if (_template.templateType == 'doc/multi') {
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

exports.docController = routerHandler;