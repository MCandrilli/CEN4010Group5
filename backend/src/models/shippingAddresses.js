const mongoose = require('mongoose');

const ShippingAddressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true }
})

const ShippingAddress = mongoose.model('ShippingAddress', ShippingAddressSchema);

module.exports = ShippingAddress;
