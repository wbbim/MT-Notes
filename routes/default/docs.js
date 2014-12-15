/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var docsController = require('../../controller/docsController').docsController;

router.route('*').all(function (req,res,next) {
        // We Can handle all request from /doc so that we can also do something before next();
        res.cookie('APP','MT-NODE');
        console.log('==== Docs ====');
        next();
    }
);

router.route('/').get(docsController.getMulti);

router.route('/:category').get(docsController.getMulti);

router.route('/:category/:document').get(docsController.getSingle);


module.exports = router;
