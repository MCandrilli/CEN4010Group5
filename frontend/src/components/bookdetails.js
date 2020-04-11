import React, { Component } from 'react';
import { Grid, Cell, Button} from 'react-mdl';
import { Card, CardText } from 'react-mdl';
import { addToCart } from './shoppingcart';
import { Link } from 'react-router-dom';
import {ButtonBlue, ButtonBW, ImgAction} from './compStyles';
import StarRatings from 'react-star-ratings';
import WishlistDropMenu from './wishlistdropmenu';


let data;
class BookDetails extends Component {
	constructor() {
		super();
		this.state = {
			wishlists: []
		};
	}

	setStrorage() {
		if (this.props.location.aboutProps) {
			localStorage.setItem('state', JSON.stringify(this.props.location.aboutProps));
		}
	}

	getStorage() {
		return JSON.parse(localStorage.getItem('state') || '{}');
	}

	componentWillMount() {
		this.setStrorage(); //this make it change but saves when leaves!!
		data = this.getStorage();
		this.getWishLists();
	}

	getWishLists() {
		fetch('/wishlists').then((results) => results.json()).then((results) =>
			this.setState({
				wishlists: results.data.filter(function(element) {
					return element.owner === localStorage.getItem('id');
				})
			})
		);
	}


	render() {
		let myData = data || {};

		console.log(myData);
		if (myData.book) {
			let imageUrl =
				'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + myData.book.imageLink;

			return (
				<div>
					<Grid>
						<Cell style={{ width: '20%' }} />
						<Cell style={{ width: '360px' }}>
							<ImgAction 
							style = {{paddingTop: '10%',
									  height: '720px',
									  width: '360px'
									}}
							src = {imageUrl}/>
						</Cell>
						<Cell>
							<Card
								style={{
									top: '5%',
									left: '5%',
									width: '750px',
									height: 'auto',
									background: 'rgba(0, 0 , 0, 0.5)',
									border: '#fff groove thin',
									boxShadow: '0 10px 4px 0 rgba(0, 0, 0, 0.3)'
								}}
							>
								<CardText style={{ paddingTop: '5px', color: '#fff' }}>
									<h3
										style={{
											marginTop: '0px',
											marginBottom: '5px',
											fontVariant: 'all-petite-caps'
										}}
									>
										{myData.book.title}
									</h3>
									<overline style={{ marginTop: '0px' }}>
										by:
										<Link
											to={{
												pathname: '/bookByAuthor',
												aboutProps: {
													book: myData.book
												}
											}}
											style={{ color: '#6fa3f7' }}
										>
											{' ' + myData.book.author}
										</Link>
									</overline>
									<h4>
										About author
										<p>{myData.book.aboutAuthor}</p>
									</h4>

									<h4
										style={{
											backgroundColor: 'rgba(240, 240, 240, 0.2)',
											padding: '10px',
											border: 'black solid thin'
										}}
									>
										Overview
										<p>
											{myData.book.Overview}</p>
										<p style = {{marginBottom: '0px'}}>
											Genre: {myData.book.genre}
											<br />
											Language: {myData.book.language}
											<br />
											Year: {myData.book.year}
											<br />
											Pages: {myData.book.pages}
										</p>
									</h4>
									<StarRatings
										rating={myData.book.rating}
										starRatedColor="goldenrod"
										starEmptyColor="white"
										numberOfStars={5}
										name="rating"
										starDimension="20px"
										starSpacing="2px"
									/>
									<h5>
										<strong>${myData.book.price}</strong>
									</h5>
									<ButtonBlue
										style={{
											float: 'left',
											height: '33px'
										}}
										onClick={() => {
											myData.book != null && addToCart(myData.book);
										}}
									>
										Add to Shopping Cart
									</ButtonBlue>
									<WishlistDropMenu
										style={{ paddingLeft: '5px' }}
										booktitle={myData.book.title}
										id={myData.book._id}
										lists={this.state.wishlists}
										imageLink={myData.book.imageLink}
										price={myData.book.price}
									/>

									<Link
										to={{
											pathname: '/customerReview',
											aboutProps: {
												book: myData.book
											}
										}}
									>
										<ButtonBW
											shadow={0}
											align={'center'}
											style={{ width: '100%', height: '50%', fontSize: '18px' }}
										>
											{' '}
											Book Reviews{' '}
										</ButtonBW>
									</Link>
								</CardText>
							</Card>
						</Cell>
					</Grid>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
export default BookDetails;
