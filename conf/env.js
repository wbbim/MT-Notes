/**
 * Created by thonatos on 14/12/11.
 */

var _development = true;

var _local = true;
var _debug = false;

exports.conf = {
    local : _local,
    debug : _debug,
    env : function () {
        if(_development){
            return 'develop';
        }else{
            return 'product'
        }
    }
};