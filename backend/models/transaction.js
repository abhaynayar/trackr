const mongoose = require('mongoose');

// schema

const transactionSchema = mongoose.Schema({
  type: {type: String, required: true},
  amount: {type: String, required: true}
});

// model

module.exports = mongoose.model('Transaction', transactionSchema);
