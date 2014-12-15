/**
 * Created by thonatos on 14/12/15.
 */

var encrypt = require('../utils/encrypt');

exports.authService = {

    setAuth: function (_userEmail,_userPass) {
        var _userToken = encrypt.sha1(_userEmail + _userPass);

        return {
            userEmail: _userEmail,
            userToken: _userToken
        };
    },

    getAuth: function (){

    },

    verAuth: function (req,res,next) {

        //console.log('Verify Service');
        //console.log(req.cookies.userToken);
        if( (typeof req.cookies.userToken !== 'undefined') && ( typeof req.session.auth !== 'undefined') && (req.cookies.userToken === req.session.auth.userToken) ){
            res.redirect('/users/admin');
            return;
        }

        next();
    }

};