const mongoose = require('mongoose');

// schema

const transactionSchema = mongoose.Schema({
  date: { type: Date, required: true },
  type: { type: String, required: true },
  amount: { type: String, required: true },
  remark: { type: String, required: false },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

// model

module.exports = mongoose.model('Transaction', transactionSchema);
