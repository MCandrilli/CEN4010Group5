import React, { Component } from 'react';
import { TableHeader, Textfield } from 'react-mdl';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
	ButtonBW2,
	ButtonBlue,
	DataTableBW_SFL,
	DataTableBW_Cart,
	QuantityStyle,
	TrashIcon,
	StyledDeleteButton,
	StyledSubtitleStatic
} from './compStyles';
import {
	StyledCoverArt,
	StyledBookTitle,
	StyledShoppingCartTitle,
	StyledSFLTitle,
	StyledSubtotal,
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

	/* Delete button component. */
	displayDeleteButton = (id, action) => {
		return (
			<StyledDeleteButton
				onClick={() => {
					this.handleClick(id, action);
				}}
			>
				<TrashIcon color="#fff" size={'30px'} />
			</StyledDeleteButton>
		);
	};

	/* Create toggles for the quantity fields for items.  */
	initQuantityToggles = (num_items) => {
		let new_toggles = [];
		for (let i = 0; i < num_items; i++) new_toggles.push(true);
		return new_toggles;
	};

	/* 	Toggle between displaying the current quantity and displaying a 
		field to change the quantity */
	toggleQuantity = (item, value) => {
		let new_toggles = this.state.quantity_toggles;
		new_toggles[item] = value;
		this.setState({ quantity_toggles: new_toggles });
	};

	/* Check for valid input and update quantity accordingly */
	handleQuantityChange = (e, id) => {
		const { value } = e.target;
		let numerical_value = value - 0;
		if (numerical_value > 0 && numerical_value % 1 === 0) {
			updateQuantity(id, numerical_value);
		}
	};

	/* Render quantity field */
	quantityField = (id, index) => {
		return (
			<ClickAwayListener
				onClickAway={() => {
					this.toggleQuantity(index, true);
				}}
			>
				<StyledTooltip title="Quantity should only contain integer numbers from 1-9999.">
					<Textfield
						className="bw-text-field"
						onChange={(e) => {
							this.handleQuantityChange(e, id);
						}}
						onKeyPress={(e) => {
							e.key === 'Enter' && this.toggleQuantity(index, true);
						}}
						pattern="[0-9]{1,4}"
						maxLength="4"
						error="invalid input"
						label="..."
						style={{ width: '30px', color: '#fff', borderBottomColor: '#fff' }}
					/>
				</StyledTooltip>
			</ClickAwayListener>
		);
	};

	/* Render shopping cart */
	createCart = () => {
		let items = cart.map((book, index) => ({
			cover_art: <StyledCoverArt src={img_url_prefix + book.img_link} alt={book.title + ' cover art'} />,
			booktitle: <StyledBookTitle>{book.title}</StyledBookTitle>,
			quantity: (
				<p1 onClick={() => this.toggleQuantity(index, false)}>
					{this.state.quantity_toggles[index] === false ? (
						this.quantityField(book.id, index)
					) : (
						<QuantityStyle>{book.quantity}</QuantityStyle>
					)}
				</p1>
			),
			price: '$' + book.price,
			delete: this.displayDeleteButton(book.id, 'delete_cart'),
			save_for_later: (
				<ButtonBW2 onClick={() => this.handleClick(book.id, 'save_for_later')}>Save For Later</ButtonBW2>
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
			<DataTableBW_Cart
				className="bw-data-table"
				shadow={0}
				style={{ width: '800px', width: 'fit-content' }}
				rows={items}
			>
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
			</DataTableBW_Cart>
		);
	};

	/* Render saved-for-later */
	createSFL = () => {
		return (
			<DataTableBW_SFL
				className="bw-data-table"
				shadow={0}
				style={{ width: '650px', width: 'fit-content' }}
				rows={save_for_later.map((book, index) => ({
					cover_art: <StyledCoverArt src={img_url_prefix + book.img_link} alt={book.title + ' cover art'} />,
					booktitle: <StyledBookTitle>{book.title}</StyledBookTitle>,
					price: book.price,
					delete: this.displayDeleteButton(book.id, 'delete_SFL'),
					add_to_cart: (
						<ButtonBW2 onClick={() => this.handleClick(book.id, 'back_to_cart')}>Add To Cart</ButtonBW2>
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
			</DataTableBW_SFL>
		);
	};

	render() {
		{
			/* Update shopping cart and saved-for-later with local storage. */
		}
		updateShoppingCart();
		updateSFL();
		{
			/* Render shopping cart page. */
		}
		return (
			<div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
				<div style={{ display: 'flex', flexFlow: 'column', width: 'fit-content' }}>
					<StyledShoppingCartTitle>Shopping Cart</StyledShoppingCartTitle>
					{cart.length === 0 ? (
						<StyledSubtitleStatic style={{ textAlign: 'center', fontSize: '28px' }}>
							Your cart is empty.
						</StyledSubtitleStatic>
					) : (
						<this.createCart />
					)}
					{save_for_later.length > 0 && <StyledSFLTitle>Save For Later</StyledSFLTitle>}
					{save_for_later.length > 0 && <this.createSFL />}
					{cart.length > 0 && (
						<ButtonBlue
							style={{
								width: 'fit-content',
								alignSelf: 'flex-end',
								marginRight: 'unset',
								fontSize: '30px',
								fontWeight: '200',
								boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)'
							}}
						>
							Checkout
						</ButtonBlue>
					)}
				</div>
			</div>
		);
	}
}

export default ShoppingCart;
export { addToCart };
