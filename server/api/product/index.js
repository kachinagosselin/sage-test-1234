'use strict';

var express = require('express');
var controller = require('./product.controller');
var stripe = require("stripe")(
  "sk_test_ML35uwZ12PGlbABvqi8kfc8T"
);
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.get('/:id/charge', controller.charge);
router.post('/:id/stripe', controller.stripe);

module.exports = router;
