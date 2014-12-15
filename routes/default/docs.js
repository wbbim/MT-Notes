/**
 * Created by thonatos on 14/11/27.
 */

var express = require('express');
var router = express.Router();

var docsController = require('../../controller/docsController').docsController;

router.route('/')
    .get(docsController.getMulti);

router.route('/:category')
    .get(docsController.getMulti);

router.route('/:category/:document')
    .get(docsController.getSingle);


module.exports = router;
