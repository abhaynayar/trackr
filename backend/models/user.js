const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // npm install --save mongoose-unique-validator

// schema
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// plugin
userSchema.plugin(uniqueValidator);

// model
module.exports = mongoose.model('User', userSchema);
