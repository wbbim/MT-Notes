/**
 * Created by thonatos on 14/12/7.
 */

var queryService = require('../service/queryService').queryService;
var renderService = require('../service/renderService').renderService;

var DOCUMENT = require('../conf/config_emu').docRepo();
var TEMPLATE = '';

exports.docsController = {

    getMulti: function (req, res, mt) {

        // Query Multi
        var _category = mt.category || '';
        var _document = decodeURI(mt.document.replace(/\.md$/, '')); // decodeURI for document named in chinese
        var _path = _category;

        if (DOCUMENT.host.indexOf('coding') !== -1) {
            _path = 'treeinfo/master/' + _path;
        }

        TEMPLATE = 'docs/multi';

        var query = {
            host: DOCUMENT.host,
            port: DOCUMENT.port,
            path: DOCUMENT.path + _path
        };

        renderData(_document || 'Docs', query, res);

    },

    getSingle: function (req, res, mt) {

        // Query Single
        var _category = mt.category;
        var _document = decodeURI(mt.document.replace(/\.md$/, '')); // decodeURI for document named in chinese
        var _path = _category;

        if (DOCUMENT.host.indexOf('coding') !== -1) {
            _path = 'blob/master/' + _path;
        }

        TEMPLATE = 'docs/single';

        var query = {
            host: DOCUMENT.host,
            port: DOCUMENT.port,
            path: DOCUMENT.path + _path
        };

        renderData(_document, query, res);
    }
};

function renderData(pageTitle, queryString, res) {

    queryService.get(queryString, function (err, data) {

        var _gotData = !err;
        var _content = [];

        if (TEMPLATE === 'docs/single') {

            if (queryString.host.indexOf('coding') !== -1) {
                _content = renderService.renderMarkdown(JSON.parse(data), 'C');
            } else {
                _content = renderService.renderMarkdown(JSON.parse(data), 'G');
            }

        } else if (TEMPLATE === 'docs/multi') {

            var _tmp = JSON.parse(data);

            if (queryString.host.indexOf('coding') !== -1) {
                _content = _tmp.data.infos;
            } else {
                _content = _tmp;
            }
        }

        res.render(TEMPLATE, {
            pageTitle: pageTitle,
            pageContent: {
                render: _gotData,
                title: pageTitle,
                content: _content
            }
        });

    });
}