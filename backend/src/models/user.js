const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  id: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  homeAddress: { type: String, required: true },
  nickname: { type: String, required: true },
  creditCards: { type: Array, default: [] },
  shippingAddresses: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
