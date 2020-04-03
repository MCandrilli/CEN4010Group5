const WishListItem = require('../models/wishlistItem');
const httpResponse = require('../util/http');

const create = async (req, res) => {
	try {
		const { title, belongsTo, imageLink, price, id } = req.body;
		const fields = {
			title,
			belongsTo,
			imageLink,
			price,
			id
		};

		const wishlistItem = await WishListItem.create(fields);

		httpResponse.successResponse(res, 'success');
	} catch (e) {
		console.log(e);
		httpResponse.failureResponse(res, e.toString());
	}
};

const read = async (req, res) => {
	try {
		const wishlists = await WishListItem.find({});

		httpResponse.successResponse(res, wishlists);
	} catch (e) {
		console.log(e);
		httpResponse.failureResponse(res, e.toString());
	}
};

const removeEntry = async (req, res) => {
	try {
		const wishlists = await WishListItem.findOneAndRemove({ title: req.body.title });
		httpResponse.successResponse(res, wishlists);
	} catch (e) {
		console.log(e);
		httpResponse.failureResponse(res, e.toString());
	}
};

const removeByID = async (req, res) => {
	try {
		const wishlists = await WishListItem.deleteOne({ _id: req.params.id });
		res.send(wishlists);
		//httpResponse.successResponse(res, wishlists);
	} catch (e) {
		console.log(e);
		//httpResponse.failureResponse(res, e.toString());
	}
};

module.exports = { read, create, removeEntry, removeByID };
