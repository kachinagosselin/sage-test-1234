'use strict';

var express = require('express');
var controller = require('./message.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.update);
router.get('/twilio', controller.sendTwilio);
//router.post('/', controller.create);
//router.put('/:id', controller.updateMessage);
//router.patch('/:id', controller.updateMessage);
//router.delete('/:id', controller.destroy);

module.exports = router;
