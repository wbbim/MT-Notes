/**
 * Created by thonatos on 14/12/11.
 */

var _development = false;

exports.envConf = {
    env : function () {
        if(_development){
            return 'develop';
        }else{
            return 'product'
        }
    }
};