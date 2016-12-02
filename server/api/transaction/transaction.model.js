'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TransactionSchema = new mongoose.Schema({
	stripe_transaction: String,
	product_id: String, //: [{type: Schema.ObjectId, ref: 'Product'}],
	user_id: String,
	created_at: Date
});

export default mongoose.model('Transaction', TransactionSchema);
