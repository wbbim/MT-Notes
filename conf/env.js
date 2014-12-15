/**
 * Created by thonatos on 14/12/11.
 */

var _development = true;

var _local = false;
var _debug = false;
var _seaJs = true;
var _port  = 8084;

var _config = {
    SEAJS   :    _seaJs,
    LOCAL   :   _local,
    DEBUG   :   _debug,
    PORT    :   _port,
    ENV : function () {
        if(_development){
            return 'development';
        }else{
            return 'production'
        }
    }
};

exports.conf = {config:_config};