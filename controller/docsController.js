/**
 * Created by thonatos on 14/12/7.
 */

var queryService = require('../service/queryService').queryService;
var renderService = require('../service/renderService').renderService;

var document = require('../conf/config_emu').create.docRepo();
var template = require('../conf/config_emu').create.docTemplate();

exports.docsController = {

    getMulti: function (req, res) {

        // Query Multi
        var _category = req.param('category') || '';
        var _path = _category;

        if(document.host.indexOf('coding') !== -1){
            _path = 'treeinfo/master/' + _path;
        }

        template.templateType = 'docs/multi';
        template.templateName = 'docs-multi';

        var query = {
            host: document.host,
            port: document.port,
            path: document.path + _path
        };

        renderData(_category || 'Docs', query, res);

    },

    getSingle: function (req, res) {

        // Query Single
        var _category = req.param('category');
        var _document = req.param('document');
        var _path = _category + '/' + _document;

        if(document.host.indexOf('coding') !== -1){
            _path = 'blob/master/' + _path;
        }

        template.templateType = 'docs/single';
        template.templateName = 'docs-single';

        var query = {
            host: document.host,
            port: document.port,
            path: document.path + _path
        };

        renderData(_document.replace(/\.md$/,''), query, res);
    }
};

function renderData (pageTitle, queryString, res) {

    queryService.get(queryString, function (err, data) {

        var _gotData = !err;
        var _template = template;
        var _content = [];


        if (_template.templateType === 'docs/single') {

            if(queryString.host.indexOf('coding') !== -1){
                console.log(queryString);
                _content = renderService.renderMarkdown(JSON.parse(data),'C');
            }else{
                _content = renderService.renderMarkdown(JSON.parse(data),'G');
            }


        } else if (_template.templateType === 'docs/multi') {

            if(queryString.host.indexOf('coding') !== -1){
                var _tmp = JSON.parse(data);
                _content = eval(_tmp.data.infos);
            }else{
                _content = eval(data);
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