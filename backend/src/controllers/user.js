const User = require('../models/user');
const httpResponse = require('../util/http');
const bcrypt = require('bcrypt-nodejs');

const login = async (req, res) => {
  try{
    const { id, password } = req.body;

    const user = await User.findOne({ id });

    if(!user){
      throw new Error('user does not exist');
    }

    const { password:hashedPass } = user;

    const same = bcrypt.compareSync(password, hashedPass);

    if(!same){
      throw new Error('Incorrect Password');
    }

    httpResponse.successResponse(res, 'success');
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  } 
}

const read = async (req, res) => {
  try{
    const { id } = req.query;
    
    const user = await User.findOne({ id });

    httpResponse.successResponse(res, user);
  } catch (e) {
    httpResponse.failureResponse(res, e.toString());
  }
}

const create = async (req, res) => {
  try{
    const { id, password } = req.body

    const exists = await User.findOne({ id });

    if(exists){
      throw new Error(`User with id: ${ id } already exists`);
    }

    const hashedPass = bcrypt.hashSync(password);

    const fields = {
      id,
      password:hashedPass,
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

const updatePassword = async (req, res) => {
  try{
    const { password, _id } = req.body;
    const hashedPass = bcrypt.hashSync(password);

    const updated = await User.findOneAndUpdate({ _id }, { password: hashedPass });

    httpResponse.successResponse(res, 'success');
  } catch(e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { read, create, update, updatePassword, login };