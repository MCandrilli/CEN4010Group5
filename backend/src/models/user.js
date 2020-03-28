const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String },
  id: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  password: { type: String, required: true },
  homeAddress: { type: String },
  nickname: { type: String },
  recentlyPurchased: { type: Array, default: [] }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
