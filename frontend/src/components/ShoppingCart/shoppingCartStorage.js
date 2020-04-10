const cart = [];
const save_for_later = [];

/* Save cart data to local storage for the browsing session */
const setShoppingCart = () => {
	localStorage.setItem('ShoppingCart', JSON.stringify(cart));
};

/* Retrieve cart data from local storage */
const getShoppingCart = () => {
	let shoppingCart = localStorage.getItem('ShoppingCart');
	shoppingCart = JSON.parse(shoppingCart);
	return shoppingCart;
};

/* Save save-for-later data to local storage for the browsing session */
const setSFL = () => {
	localStorage.setItem('SavedForLater', JSON.stringify(save_for_later));
};

/* Retrieve save-to-cart data from local storage */
const getSFL = () => {
	let sfl = localStorage.getItem('SavedForLater');
	sfl = JSON.parse(sfl);
	return sfl;
};

/* Update constant shopping cart with the cart data from local storage */
const updateShoppingCart = () => {
	let newCart = getShoppingCart();
	if (cart.length === 0 && newCart !== null) {
		for (const [ index, book ] of newCart.entries()) {
			cart.push(book);
		}
	}
};

/* Update constant save-for-later list with the save-for-later data from local storage */
const updateSFL = () => {
	let newSFL = getSFL();
	if (save_for_later.length === 0 && newSFL !== null) {
		for (const [ index, book ] of newSFL.entries()) {
			save_for_later.push(book);
		}
	}
};

/* Save shopping cart and save-for-later list to local storage */
const updateLocalStorage = () => {
	setShoppingCart();
	setSFL();
};

/* Return the length of the cart */
const getCartLength = () => {
	let count = 0;
	for (const [ index, book ] of getShoppingCart().entries()) {
		count += book.quantity;
	}
	return count;
};

export { cart, save_for_later, getCartLength, updateLocalStorage, updateShoppingCart, updateSFL };
