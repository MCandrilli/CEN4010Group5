const cart = [];
const save_for_later = [];

/* Save cart data to local storage for the browsing session */
const setShoppingCart = () =>
{
	sessionStorage.setItem("ShoppingCart", JSON.stringify(cart));
}

/* Retrieve cart data from local storage */
const getShoppingCart = () =>
{
	let shoppingCart = sessionStorage.getItem("ShoppingCart");
	shoppingCart = JSON.parse(shoppingCart);
	return shoppingCart;
}

/* Save save-for-later data to local storage for the browsing session */
const setSFL = () =>
{
	sessionStorage.setItem("SavedForLater", JSON.stringify(save_for_later));
}

/* Retrieve save-to-cart data from local storage */
const getSFL = () =>
{
	let sfl = sessionStorage.getItem("SavedForLater");
	sfl = JSON.parse(sfl);
	return sfl;
}

/* Update constant shopping cart with the cart data from local storage */
const updateShoppingCart = () =>
{
	if (cart.length === 0)
	{
		for (const [ index, book ] of getShoppingCart().entries()) {
			cart.push(book);
		}
	}
}

/* Update constant save-for-later list with the save-for-later data from local storage */
const updateSFL = () =>
{
	if (save_for_later.length === 0)
	{
		for (const [ index, book ] of getSFL().entries()) {
			save_for_later.push(book);
		}
	}
}

/* Save shopping cart and save-for-later list to local storage */
const updateSessionStorage = () =>
{
	setShoppingCart();
	setSFL();
}

export {cart, save_for_later, updateSessionStorage, updateShoppingCart, updateSFL};