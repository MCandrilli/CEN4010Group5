const WishList = require('../models/wishlist');
const httpResponse = require('../util/http');

const create = async (req, res) => {
  try{
    const { owner, title } = req.body;
    const fields = {
      owner,
      title
      
    }

    const wishlist = await WishList.create(fields);

    httpResponse.successResponse(res, 'success')
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());

  }
}

const read = async (req, res) => {
  try{
    const wishlists = await WishList.find({});

    httpResponse.successResponse(res, wishlists);
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

const removeEntry = async (req, res) => {
  try {
    const wishlists = await WishList.findOneAndRemove({title: req.body.title});
    httpResponse.successResponse(res, wishlists);
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

const removeByID = async (req, res) => {
  try {
    const wishlists = await WishList.deleteOne({_id: req.params.id});
    res.send(wishlists);
    httpResponse.successResponse(res, wishlists);
  } catch (e) {
    console.log(e);
    httpResponse.failureResponse(res, e.toString());
  }
}

module.exports = { read, create, removeEntry, removeByID};