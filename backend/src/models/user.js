const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  id: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  homeAddress: { type: String, required: true },
  nickname: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
