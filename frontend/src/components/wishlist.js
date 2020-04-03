import React, { Component } from 'react';
import { DataTable, TableHeader, Grid, Cell, Textfield } from 'react-mdl';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import styled from 'styled-components';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Button } from 'reactstrap';
import { addToCart } from './shoppingcart';

const StyledWishListTitle = styled.h3`
	font-variant: all-petite-caps;
	text-decoration: overline;
	color: dimgrey;
	font-size: 40px;
	font-weight: lighter;
	padding-top: 10px;
	padding-left: 300px;
`;

const StyledCreateWishlist = styled.h3`
	font-variant: all-petite-caps;
	text-decoration: overline;
	color: dimgrey;
	font-size: 24px;
	font-weight: lighter;
	margin-bottom: 0px;
	padding-bottom: 0px;
	margin-left: 25%;
	padding-top: 25px;
`;

class Wishlist extends Component {
	constructor() {
		super();

		this.state = {
			items: [],
			wishLists: [],
			listItems: [],
			value: '',
			errorMessage: '',
			loaded: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.deleteSubmit = this.deleteSubmit.bind(this);
	}

	componentDidMount() {
		this.getItems();
		this.getListItems();
	}

	getItems() {
		fetch('/wishlists').then((results) => results.json()).then((results) =>
			this.setState({
				items: results.data.filter(function(element) {
					return element.owner === localStorage.getItem('id');
				})
			})
		);
	}

	getListItems() {
		fetch('/wishlistItems')
			.then((results) => results.json())
			.then((results) => this.setState({ listItems: results.data }));
	}

	handleSubmit() {
		let submissiondata = {
			owner: localStorage.getItem('id'),
			title: this.state.value
		};

		if (this.state.items.length < 3) {
			fetch('/wishlists', {
				method: 'POST',
				body: JSON.stringify(submissiondata),
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
			this.getItems();
		} else {
			this.setState({ errorMessage: 'Too many lists!' });
		}
	}

	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	deleteSubmit(_id) {
		axios.delete(`http://localhost:5000/wishlists/delete/` + _id).then((res) => {
			console.log(res);
			console.log(res.data);
		});

		this.setState({ items: this.state.items.filter((item) => item._id !== _id) });
	}

	deleteItem(_id) {
		axios.delete(`http://localhost:5000/wishlistItems/delete/` + _id).then((res) => {
			console.log(res);
			console.log(res.data);
		});

		this.setState({ items: this.state.items.filter((item) => item._id !== _id) });
	}

	moveItem(id, title, listID, imageLink, price, itemId) {
		axios.delete(`http://localhost:5000/wishlistItems/delete/` + id).then((res) => {
			console.log(res);
			console.log(res.data);
		});

		let submissiondata = {
			title: title,
			belongsTo: listID,
			imageLink: imageLink,
			price: price,
			id: itemId
		};

		fetch('/wishlistItems', {
			method: 'POST',
			body: JSON.stringify(submissiondata),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((data) => console.log(data));

		window.location.reload();
	}

	moveListDropdown(listTitle, listID, listItem, itemID, itemImageLink, itemPrice, element) {
		if (this.state.items.length === 1) {
			return (
				<div>
					{' '}
					<DropdownButton id="dropdown-basic-button" title="Move">
						<Dropdown.Item
							onClick={() =>
								element != null &&
								addToCart({
									_id: element.id,
									imageLink: element.imageLink,
									title: element.title,
									price: element.price
								})}
						>
							Add to Cart.
						</Dropdown.Item>
						<Dropdown.Item>No other lists available.</Dropdown.Item>
					</DropdownButton>
				</div>
			);
		} else
			return (
				<div>
					<DropdownButton id="dropdown-basic-button" title="Move">
						<Dropdown.Item
							onClick={() =>
								element != null &&
								addToCart({
									_id: element.id,
									imageLink: element.imageLink,
									title: element.title,
									price: element.price
								})}
						>
							Add to Cart.
						</Dropdown.Item>
						{this.state.items.map(function(item, index) {
							if (item.title !== listTitle)
								return (
									<Dropdown.Item
										onClick={this.moveItem.bind(
											this,
											itemID,
											listItem,
											item._id,
											itemImageLink,
											itemPrice,
											element.id
										)}
									>
										{item.title}
									</Dropdown.Item>
								);
						}, this)}
					</DropdownButton>
				</div>
			);
	}

	render() {
		const user = localStorage.getItem('id');

		if (user === null) {
			return (
				<div>
					<h2>Please sign in to use wishlists!</h2>
				</div>
			);
		}

		return (
			<div style={{ width: '95%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }}>
				<StyledWishListTitle>Wishlist</StyledWishListTitle>
				<div style={{ width: '25%', margin: 'auto', boxShadow: '0px 0px 3px 3px #ccc' }}>
					<StyledCreateWishlist>Create a Wishlist</StyledCreateWishlist>
					<form style={{ margin: '10px' }} onSubmit={this.handleSubmit}>
						<label style={{ marginLeft: '15%', marginTop: '10px' }}>
							<Textfield
								value={this.state.value}
								onChange={this.handleChange}
								label="Type Name for Wishlist..."
								style={{ width: '200px' }}
							/>
						</label>
						<Button color="primary" style={{ marginLeft: '10px' }} type="submit" value="Create">
							Create
						</Button>
					</form>
				</div>

				<Grid className="demo-grid-1">
					{this.state.items.map(function(item, index) {
						let wishListItems = [];
						this.state.listItems.forEach((element) => {
							if (element.belongsTo === item._id)
								wishListItems.push({
									booktitle: element.title,
									delete: (
										<Button
											outline
											color="danger"
											onClick={() => {
												axios
													.delete(`http://localhost:5000/wishlistItems/delete/` + element._id)
													.then((res) => {
														console.log(res);
														console.log(res.data);
													});

												window.location.reload();
											}}
										>
											X
										</Button>
									),
									moveTo: this.moveListDropdown(
										item.title,
										item._id,
										element.title,
										element._id,
										element.imageLink,
										element.price,
										element
									)
								});
							{
								//console.log(element);
							}
						});

						if (wishListItems.length === 0) {
							wishListItems.push({ booktitle: 'Empty List' });
						}

						if (item.owner === localStorage.getItem('id')) {
							return (
								<Cell col={4} key={item._id}>
									<h3 style={{ display: 'flex', justifyContent: 'center' }}>{item.title}</h3>

									<DataTable style={{ width: '30%' }} shadow={0} rows={wishListItems}>
										<TableHeader name="booktitle" tooltip="The Book' title">
											Book Title
										</TableHeader>
										<TableHeader name="delete" tooltip="Delete">
											{' '}
										</TableHeader>
										<TableHeader name="moveTo" tooltip="1">
											{' '}
										</TableHeader>
										<TableHeader name="toCart" tooltip="" />
									</DataTable>

									<Button
										style={{ marginLeft: '30px', marginTop: '10px' }}
										color="danger"
										key={item._id}
										onClick={() => {
											this.deleteSubmit(item._id);
										}}
									>
										Delete List
									</Button>
								</Cell>
							);
						}
					}, this)}
				</Grid>
			</div>
		);
	}
}

export default Wishlist;
