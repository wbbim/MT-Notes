/**
 * Created by thonatos on 14/11/30.
 */

var marked = require('marked');

exports.renderService = {
    renderMarkdown : function (json) {

        var _raw = '';
        var _html = '';

        if (json.content) {
            _raw = new Buffer(json.content, json.encoding).toString('utf8');
            _html = marked(_raw);
        } else {
            _html = json.message + ' . ' + json.documentation_url;
        }
        return _html;
    }
};

