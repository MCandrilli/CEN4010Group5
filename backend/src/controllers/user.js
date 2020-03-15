const User = require('../models/user');
const httpResponse = require('../util/http');
const bcrypt = require('bcrypt-nodejs');

const read = async (req, res) => {
  try{
    const { id } = req.query;
    console.log(id);
    
    const user = await User.findOne({ id });
    console.log('sending')
    console.log(user)

    httpResponse.successResponse(res, user);
  } catch (e) {
    httpResponse.failureResponse(res, e.toString());
  }
}

const create = async (req, res) => {
  try{
    const { email, id, firstName, lastName, password, homeAddress, nickname, creditCards, shippingAddresses } = req.body

    const exists = await User.findOne({ id });

    if(exists){
      throw new Error(`User with id: ${id} already exists`);
    }

    const hashedPass = bcrypt.hashSync(password);

    const fields = {
      email,
      id,
      firstName,
      lastName,
      password:hashedPass,
      homeAddress,
      nickname,
      creditCards,
      shippingAddresses
    }

    const newUser = await User.create(fields);

    httpResponse.successResponse(res, newUser);
  } catch (e) {
    httpResponse.failureResponse(res, e.toString());
  }
}

const update = async (req, res) => {
  try{
    const { id, fields } = req.body;
    const updated = await User.findOneAndUpdate({ id }, fields).exec();
    httpResponse.successResponse(res, 'success');

  } catch (e) {
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { read, create, update };