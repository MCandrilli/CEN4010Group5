const mongoose = require('mongoose');

const wishListItemSchema = new mongoose.Schema({
    title: {type: String, required: true},
    belongsTo: {type: String, required: true},
    imageLink: {type: String, required: true},
<<<<<<< HEAD
    price: {type: Number, required: true}
=======
    price: {type: String, required: true}
>>>>>>> 97dd1c3907d70647c4e4a659a58e029b44a1accc
})

const wishListItem = mongoose.model('WishListItem', wishListItemSchema);

module.exports = wishListItem;
