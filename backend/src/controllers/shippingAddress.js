const ShippingAddress = require('../models/shippingAddresses');
const httpResponse = require('../util/http');

const read = async (req, res) => {
  try{
    const { id:userId } = req.query;
    const shippingAddresses = await ShippingAddress.find({ userId });
    httpResponse.successResponse(res, shippingAddresses);
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  } 
}

const create = async (req, res) => {
  try{
    const { userId, street, city, state, country } = req.body;

    const fields = {
      userId,
      street,
      city,
      state,
      country
    }

    const newAddress = await ShippingAddress.create(fields);

    httpResponse.successResponse(res, 'success');
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

const update = async (req, res) => {
  try{
    const { _id, fields } = req.body;

    const updated = await ShippingAddress.findOneAndUpdate({ _id }, fields).exec();

    httpResponse.successResponse(res, 'updated');
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

const remove = async (req, res) => {
  try{
    const { _id } = req.query;

    const deleted = await ShippingAddress.findOneAndRemove({ _id }).exec();

    httpResponse.successResponse(res, 'deleted');
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { read, create, update, remove };