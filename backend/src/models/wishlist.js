const mongoose = require('mongoose');

const wishListSchema = new mongoose.Schema({
    title: {type: String, required: true}
})

const WishList = mongoose.model('WishList', wishListSchema);

module.exports = WishList;