import React, { Component } from 'react';
import { Menu, MenuItem } from 'react-mdl';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ButtonRed } from './compStyles';

class WishlistDropMenu extends Component {
	handleClick(title, listid, imageLink, price, itemId) {
		console.log(title, listid, itemId);

		let submissiondata = {
			title: title,
			belongsTo: listid,
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
	}

	handleClose() {}

	render() {
		const user = localStorage.getItem('id');

		let createlist;
		if (this.props.lists.length < 3)
			createlist = (
				<MenuItem>
					<Link to="/wishlist">Add a Wishlist</Link>
				</MenuItem>
			);

		if (user === null) {
			return (
				<div style={{ position: 'relative', float: 'left', paddingLeft: '4px' }}>
					<ButtonRed color="success" id={this.props.booktitle}>
						ADD TO WISHLIST
					</ButtonRed>
					<Menu target={this.props.booktitle} valign="top" ripple>
						<div style={{ float: 'left' }}>
							<MenuItem>
								<Link to="/profile">Sign in to use</Link>
							</MenuItem>
						</div>
					</Menu>
				</div>
			);
		}
		return (
			<div style={{ position: 'relative', float: 'left', paddingLeft: '4px' }}>
				<ButtonRed id={this.props.booktitle}>ADD TO WISHLIST</ButtonRed>
				<Menu target={this.props.booktitle} valign="top" ripple>
					{this.props.lists.map(function(list, index) {
						return (
							<div style={{ float: 'left' }}>
								<MenuItem
									onClick={this.handleClick.bind(
										this,
										this.props.booktitle,
										list._id,
										this.props.imageLink,
										this.props.price,
										this.props.id
									)}
								>
									Add to Wishlist: {list.title}
								</MenuItem>
							</div>
						);
					}, this)}
					{createlist}
				</Menu>
			</div>
		);
	}
}

export default WishlistDropMenu;
