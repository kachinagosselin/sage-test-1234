'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  amount: Number
});

export default mongoose.model('Product', ProductSchema);
