import React, { Component, useState } from 'react';
import { DataTable, TableHeader, Textfield } from 'react-mdl';
import delete_logo from './images/delete_bin.png';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
	StyledCoverArt,
	StyledDeleteButton,
	StyledActionButton,
	StyledBookTitle,
	StyledShoppingCartTitle,
	StyledSFLTitle,
	StyledSubtotal,
	StyledCheckoutButton,
	StyledTooltip
} from './ShoppingCart/shoppingCartStyles';
import {
	img_url_prefix,
	addToCart,
	getSubtotal,
	saveForLater,
	removeFromCart,
	removeFromSFL,
	backToCart,
	updateQuantity
} from './ShoppingCart/useShoppingCart';
import {
	cart,
	save_for_later,
	updateShoppingCart,
	updateSFL,
	updateLocalStorage
} from './ShoppingCart/shoppingCartStorage';

class ShoppingCart extends Component {
	constructor() {
		super();
		this.state = {
			click_toggle_on: true,
			quantity_toggles: this.initQuantityToggles(cart.length)
		};
	}

	/* Direct all button clicks to the proper functions and update changes to local storage */
	handleClick = (id, action) => {
		this.setState((prevState) => ({ click_toggle_on: !prevState.click_toggle_on }));
		action === 'delete_cart'
			? removeFromCart(id)
			: action === 'save_for_later'
				? saveForLater(id)
				: action === 'delete_SFL' ? removeFromSFL(id) : backToCart(id);
		updateLocalStorage();
	};

	displayDeleteButton = (id, action) => {
		return (
			<StyledTooltip title="Delete">
				<StyledDeleteButton
					onClick={() => {
						this.handleClick(id, action);
					}}
				>
					<img src={delete_logo} alt="delete logo" style={{ height: '30px' }} />
				</StyledDeleteButton>
			</StyledTooltip>
		);
	};

	initQuantityToggles = (num_items) => {
		let new_toggles = [];
		for (let i = 0; i < num_items; i++) new_toggles.push(true);
		return new_toggles;
	};

	toggleQuantity = (item, value) => {
		let new_toggles = this.state.quantity_toggles;
		new_toggles[item] = value;
		this.setState({ quantity_toggles: new_toggles });
	};

	handleQuantityChange = (e, id) => {
		const { value } = e.target;
		let numerical_value = value - 0;
		if (numerical_value > 0 && numerical_value % 1 === 0) {
			updateQuantity(id, numerical_value);
		}
	};

	quantityField = (id, index) => {
		return (
			<ClickAwayListener
				onClickAway={() => {
					this.toggleQuantity(index, true);
				}}
			><StyledTooltip title="Quantity should only contain integer numbers from 1-9999.">
				<Textfield
					onChange={(e) => {
						this.handleQuantityChange(e, id);
					}}
					onKeyPress={(e) => {e.key === "Enter" && this.toggleQuantity(index, true)}}
					pattern="[0-9]{1,4}"
					maxLength = "4"
					error="invalid input"
					label="..."
					style={{ width: '30px' }}
				/>
			</StyledTooltip></ClickAwayListener>
		);
	};

	createCart = () => {
		let items = cart.map((book, index) => ({
			cover_art: <StyledCoverArt src={img_url_prefix + book.img_link} alt={book.title + ' cover art'} />,
			booktitle: <StyledBookTitle>{book.title}</StyledBookTitle>,
			quantity: (
				<p1 onClick={() => this.toggleQuantity(index, false)}>
					{this.state.quantity_toggles[index] === false ? this.quantityField(book.id, index) : book.quantity}
				</p1>
			),
			price: '$' + book.price,
			delete: this.displayDeleteButton(book.id, 'delete_cart'),
			save_for_later: (
				<StyledActionButton onClick={() => this.handleClick(book.id, 'save_for_later')}>
					Save For Later
				</StyledActionButton>
			)
		}));
		let subtotal = {
			cover_art: '',
			booktitle: '',
			quantity: '',
			price: '',
			delete: getSubtotal(),
			save_for_later: <StyledSubtotal>Subtotal: </StyledSubtotal>
		};
		items.push(subtotal);

		return (
			<DataTable shadow={0} style={{ width: '800px', fontSize: '16px' }} rows={items}>
				<TableHeader name="cover_art" style={{ color: 'transparent' }}>
					Cover Art
				</TableHeader>
				<TableHeader name="booktitle" style={{ fontSize: '16px', minWidth: '350px' }}>
					Book Title
				</TableHeader>
				<TableHeader numeric name="quantity" style={{ fontSize: '16px' }}>
					Quantity
				</TableHeader>
				<TableHeader numeric name="price" style={{ fontSize: '16px' }}>
					Price
				</TableHeader>
				<TableHeader name="save_for_later" style={{ color: 'transparent' }}>
					SFL
				</TableHeader>
				<TableHeader name="delete" style={{ color: 'transparent' }}>
					Delete
				</TableHeader>
			</DataTable>
		);
	};

	createSFL = () => {
		return (
			<DataTable
				shadow={0}
				style={{ width: '650px', fontSize: '16px' }}
				rows={save_for_later.map((book, index) => ({
					cover_art: <StyledCoverArt src={img_url_prefix + book.img_link} alt={book.title + ' cover art'} />,
					booktitle: <StyledBookTitle>{book.title}</StyledBookTitle>,
					price: book.price,
					delete: this.displayDeleteButton(book.id, 'delete_SFL'),
					add_to_cart: (
						<StyledActionButton onClick={() => this.handleClick(book.id, 'back_to_cart')}>
							Add To Cart
						</StyledActionButton>
					)
				}))}
			>
				<TableHeader name="cover_art" style={{ color: 'transparent' }}>
					Cover Art
				</TableHeader>
				<TableHeader name="booktitle" style={{ fontSize: '16px', minWidth: '350px' }}>
					Book Title
				</TableHeader>
				<TableHeader numeric name="price" style={{ fontSize: '16px' }}>
					Price
				</TableHeader>
				<TableHeader name="add_to_cart" style={{ color: 'transparent' }}>
					BTC
				</TableHeader>
				<TableHeader name="delete" style={{ color: 'transparent' }}>
					Delete
				</TableHeader>
			</DataTable>
		);
	};

	render() {
		updateShoppingCart();
		updateSFL();
		return (
			<div style={{ padding: '5px 350px' }}>
				<StyledShoppingCartTitle>Shopping Cart</StyledShoppingCartTitle>
				{cart.length === 0 ? <p1 style={{ fontSize: '20px' }}>Your cart is empty.</p1> : <this.createCart />}
				{save_for_later.length > 0 && <StyledSFLTitle>Save For Later</StyledSFLTitle>}
				{save_for_later.length > 0 && <this.createSFL />}
				{cart.length > 0 && <StyledCheckoutButton>Checkout</StyledCheckoutButton>}
			</div>
		);
	}
}

export default ShoppingCart;
export { addToCart };
