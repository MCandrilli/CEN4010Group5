const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  cardNumber: { type: Number, required: true },
  securityCode: { type: Number, required: true },
  expirationDate: { type: String, required: true }
})

const CreditCard = mongoose.model('CreditCards', creditCardSchema);

module.exports = CreditCard;
