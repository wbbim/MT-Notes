/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var usersController = require('../../controller/usersController').usersController;

router.route('*')
    .all(usersController.loginAll);

router.route('/')
    .get(function (req, res) {
        res.redirect('/users/login');
    });

router.route('/login')
    .get(usersController.loginGet)
    .post(usersController.loginPost);

router.route('/admin')
    .get(usersController.adminGet);

module.exports = router;
