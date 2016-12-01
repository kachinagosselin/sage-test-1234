'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TransactionSchema = new mongoose.Schema({
  stripe_transaction: String,
  product_id: Number,
  user_id: Number,
  created_at: Date
});

export default mongoose.model('Transaction', TransactionSchema);
