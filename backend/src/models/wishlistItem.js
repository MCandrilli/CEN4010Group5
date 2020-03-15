const mongoose = require('mongoose');

const wishListItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    belongsTo: {type: String, required: true}
})

const wishListItem = mongoose.model('WishListItem', wishListItemSchema);

module.exports = wishListItem;
