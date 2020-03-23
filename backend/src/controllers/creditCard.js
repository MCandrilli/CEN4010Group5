const CreditCard = require('../models/creditCards');
const httpResponse = require('../util/http');

const read = async (req, res) => {
  try{
    const { id: userId } = req.query;
    const creditCards = await CreditCard.find({ userId });
    httpResponse.successResponse(res, creditCards);
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  } 
}

const create = async (req, res) => {
  try{
    const { userId, name, cardNumber, securityCode, expirationDate } = req.body;
    
    const fields = {
      userId,
      name,
      cardNumber,
      securityCode,
      expirationDate
    }

    const newCard = await CreditCard.create(fields);

    httpResponse.successResponse(res, 'success');
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

const update = async (req, res) => {
  try{
    const { _id, fields } = req.body;

    const updated = await CreditCard.findOneAndUpdate({ _id }, fields).exec();
    
    httpResponse.successResponse(res, 'success');
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

const remove = async (req, res) => {
  try{
    const { _id } = req.query;

    const deleted = await CreditCard.findOneAndRemove({ _id }).exec();
    
    httpResponse.successResponse(res, 'success');
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { read, create, update, remove };