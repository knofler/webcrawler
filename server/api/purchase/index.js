'use strict';

var express = require('express');
var controller = require('./purchase.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/last', controller.lastEntry);
router.get('/:id', controller.show);
router.get('/name/:pur_req', controller.name);
router.get('/purdata/:oneid', controller.purchaseData);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;