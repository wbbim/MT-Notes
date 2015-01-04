/**
 * Created by thonatos on 14/12/7.
 */

var queryService = require('../service/queryService').queryService;
var renderService = require('../service/renderService').renderService;

var document = require('../conf/config_emu').create.docRepo();
var template = require('../conf/config_emu').create.docTemplate();

exports.docsController = {

    getMulti: function (req, res, mt) {

        // Query Multi
        var _category = mt.category || '';
        var _document = decodeURI(mt.document.replace(/\.md$/, '')); // decodeURI for document named in chinese
        var _path = _category;

        if (document.host.indexOf('coding') !== -1) {
            _path = 'treeinfo/master/' + _path;
        }

        template.templateType = 'docs/multi';
        template.templateName = 'docs-multi';

        var query = {
            host: document.host,
            port: document.port,
            path: document.path + _path
        };

        renderData(_document || 'Docs', query, res);

    },

    getSingle: function (req, res, mt) {

        // Query Single
        var _category = mt.category;
        var _document = decodeURI(mt.document.replace(/\.md$/, '')); // decodeURI for document named in chinese

        var _path = _category;

        console.log(mt.category);

        if (document.host.indexOf('coding') !== -1) {
            _path = 'blob/master/' + _path;
        }

        template.templateType = 'docs/single';
        template.templateName = 'docs-single';

        var query = {
            host: document.host,
            port: document.port,
            path: document.path + _path
        };

        renderData(_document, query, res);
    }
};

function renderData(pageTitle, queryString, res) {

    queryService.get(queryString, function (err, data) {

        var _gotData = !err;
        var _template = template;
        var _content = [];


        if (_template.templateType === 'docs/single') {

            if (queryString.host.indexOf('coding') !== -1) {
                _content = renderService.renderMarkdown(JSON.parse(data), 'C');
            } else {
                _content = renderService.renderMarkdown(JSON.parse(data), 'G');
            }


        } else if (_template.templateType === 'docs/multi') {

            var _tmp = JSON.parse(data);

            if (queryString.host.indexOf('coding') !== -1) {
                _content = _tmp.data.infos;
            } else {
                _content = _tmp;
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