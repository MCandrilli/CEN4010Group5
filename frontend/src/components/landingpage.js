import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Grid, Cell } from 'react-mdl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Pagination from "react-js-pagination";
import { Button } from 'reactstrap';
import WishlistDropMenu from './wishlistdropmenu';
import { Link } from 'react-router-dom';
import { addToCart } from './shoppingcart';
import StarRatings from 'react-star-ratings';
import { CardBW, ButtonBW, ButtonBlue, DropdownBW } from './compStyles';
import styled from 'styled-components';

class LandingPage extends Component {
	constructor() {
		super();

		this.state = {
      items: [],
      items2: [],
			wishlists: [],
			selected_genre: '',
			is_cart_toggle_on: true
		};
		this.handleClick = this.handleClick.bind(this);
  }

	componentDidMount() {
		this.getItems();
		this.getWishLists();
	}

	getItems() {
    fetch('/books').then((results) => results.json()).then((results) => this.setState({ items: results.data }));
    fetch('/books').then((results) => results.json()).then((results) => this.setState({ items2: results.data }));
	}

	getWishLists() {
		fetch('/wishlists')
			.then((results) => results.json())
			.then((results) => this.setState({ wishlists: results.data }));
	}

	handleClick(item) {
		this.setState((prevState) => ({
			is_cart_toggle_on: !prevState.is_cart_toggle_on
		}));
		addToCart(item);
	}

	displayStarRating = (rating) => {
		return (
			<StarRatings
				rating={rating}
				starRatedColor="goldenrod"
				starEmptyColor="darkslategrey"
				numberOfStars={5}
				name="rating"
				starDimension="20px"
				starSpacing="2px"
			/>
		);
	};
	sendToCart(item) {
		console.log('The helper function was called.');
		this.addToCart(item);
	}
	filterByRating(rating) {
		let tempArray1 = [];
		let tempArray2 = [];
		tempArray1 = this.state.items;

		tempArray2 = tempArray1.filter(function(book) {
			return book.rating >= rating;
		});
		this.setState({ items: tempArray2 });
	}
	filterByGenre(genre) {
		
    let tempArray1 = this.state.items2;
    let tempArray2 = [];
    this.setState({items : tempArray1})
		tempArray1 = this.state.items;

		tempArray2 = tempArray1.filter(function(book) {
			return book.genre == genre;
		});
    this.setState({ items: tempArray2 });
	}
	sortByBestSellers() {
		
    let tempArray1 = this.state.items2;
    let tempArray2 = [];
    this.setState({items : tempArray1})
		tempArray1 = this.state.items;

		tempArray2 = tempArray1.filter(function(book) {
			return book.ratingCount >= 6;
		});
    this.setState({ items: tempArray2 });
	}



sortByTitle(){
    let tempArray =[];
    tempArray = this.state.items;
    if(!(this.state.reverse_sort)){
      tempArray.sort(function(a,b){
      if (a.title >b.title){
        return 1;
      }
      if (b.title > a.title){
        return -1;
      }
      return 0
    });
    this.setState({reverse_sort:true});
    }
    if(this.state.reverse_sort){
      tempArray.sort(function(a,b){
        if (b.title >a.title){
          return 1;
        }
        if (a.title > b.title){
          return -1;
        }
        return 0
      });
      this.setState({reverse_sort:false});
    }
    this.setState({'items' : tempArray})
  }
  sortByAuthor(){
    let tempArray =[];
    tempArray = this.state.items;
    if(!(this.state.reverse_sort)){
      tempArray.sort(function(a,b){
        if (a.author >b.author){
          return 1;
        }
        if (b.author > a.author){
          return -1;
        }
      return 0
      });
      this.setState({reverse_sort:true});
    }
    if(this.state.reverse_sort){
      tempArray.sort(function(a,b){
        if (b.author > a.author){
          return 1;
        }
        if (a.author > b.author){
          return -1;
        }
      return 0
      });
      this.setState({reverse_sort:false});
    }
      this.setState({'items' : tempArray})
    }

  sortByPages(){
    let tempArray =[];
    tempArray = this.state.items;
    if(!(this.state.reverse_sort)){
      tempArray.sort(function(a,b){
        return parseInt(a.pages) - parseInt(b.pages)
      });
      this.setState({reverse_sort:true});
    }
    if(this.state.reverse_sort){
      tempArray.sort(function(a,b){
        return parseInt(b.pages) - parseInt(a.pages)
      });
      this.setState({reverse_sort:false});
    }
    this.setState({'items' : tempArray})
  }
  sortByYear(){
    let tempArray =[];
    tempArray = this.state.items;
    if(!(this.state.reverse_sort)){
      tempArray.sort(function(a,b){
        return parseInt(a.year) - parseInt(b.year)
      });
      this.setState({reverse_sort:true});
    }
    if(this.state.reverse_sort){
      tempArray.sort(function(a,b){
        return parseInt(b.year) - parseInt(a.year)
      });
      this.setState({reverse_sort:false});
    }
    this.setState({'items' : tempArray})
  }

	render() {
		return (
			<div
				style={{
					backgroundColor: 'transparent',
					width: '85%',
					marginLeft: 'auto',
					marginRight: 'auto',
					marginTop: '50px'
				}}
			>
				<div style={{ display: 'flex' }}>
					<ButtonBW onClick={this.sortByTitle.bind(this)}> Sort By Title </ButtonBW>
					<ButtonBW onClick={this.sortByAuthor.bind(this)}> Sort By Author </ButtonBW>
					<ButtonBW onClick={this.sortByPages.bind(this)}> Sort By Pages </ButtonBW>
					<ButtonBW onClick={this.sortByYear.bind(this)}> Sort By Year Published </ButtonBW>
					<ButtonBW onClick={this.sortByBestSellers.bind(this)}> Best Sellers </ButtonBW>
					<DropdownBW id="dropdown-item-button" title="Select Genre">
						<Dropdown.Item as="button" onClick={this.filterByGenre.bind(this, 'Historical')}>
							Historical
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByGenre.bind(this, 'Childrens')}>
							Childrens
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByGenre.bind(this, 'Fiction')}>
							Fiction
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByGenre.bind(this, 'Thriller')}>
							Thriller
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByGenre.bind(this, 'Biography')}>
							Biography
						</Dropdown.Item>
					</DropdownBW>
					<DropdownBW id="dropdown-item-button" title="Star Rating">
						<Dropdown.Item as="button" onClick={this.filterByRating.bind(this, 1)}>
							One Star and Up
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByRating.bind(this, 2)}>
							Two Star and Up
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByRating.bind(this, 3)}>
							Three Star and Up
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByRating.bind(this, 4)}>
							Four Star and Up
						</Dropdown.Item>
						<Dropdown.Item as="button" onClick={this.filterByRating.bind(this, 5)}>
							Five Star
						</Dropdown.Item>
					</DropdownBW>
				</div>
				<Grid className="demo-grid-1">
					{this.state.items.map((item, index) => {
						let imageUrl =
							'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' +
							item.imageLink;
						let lists = this.state.wishlists;

						var usersLists = lists.filter(function(element) {
							return element.owner === localStorage.getItem('id');
						});

						return (
							<Cell col={3}>
								<CardBW shadow={6}>
									<Link
										to={{
											pathname: '/bookdetails',
											aboutProps: {
												book: item,
												lists: usersLists
											}
										}}
										style={{ textDecoration: 'none', color: 'inherit' }}
									>
										<CardTitle
											expand
											style={{
												color: '#fff',
												background: 'url(' + imageUrl + ') center / cover rgb(207,217,226)',
												borderBottom: 'thin groove white',
												minHeight: '455px'
											}}
										/>
									</Link>
									<CardText style={{ textAlign: 'center' }}>
										<Link
											to={{
												pathname: '/bookdetails',
												aboutProps: {
													book: item,
													lists: usersLists
												}
											}}
											style={{ textDecoration: 'none', color: 'inherit' }}
										>
											<p
												style={{
													lineHeight: '24px',
													fontSize: '30px',
													fontFamily: 'monospace',
													fontVariant: 'all-petite-caps'
												}}
											>
												<strong>{item.title} </strong>
											</p>
										</Link>

										<p style={{ lineHeight: '10px' }}>
											<strong> by: {item.author} </strong>
										</p>
										<p style={{ lineHeight: '10px' }}>
											<strong>{this.displayStarRating(item.rating)} </strong>
										</p>
										<p style={{ lineHeight: '10px' }}>
											<strong> Rating Count: {item.ratingCount} </strong>
										</p>
										<p style={{ lineHeight: '10px' }}>
											<strong> Genre: {item.genre} </strong>
										</p>
									</CardText>

									<CardActions border>
										<div>
											<ButtonBlue
												style={{ float: 'left', marginLeft: '20px' }}
												onClick={() => this.handleClick(item)}
											>
												Add to Cart
											</ButtonBlue>

											<WishlistDropMenu
												style={{ float: 'left', paddingLeft: '5px' }}
												booktitle={item.title}
												id={item._id}
												lists={usersLists}
												imageLink={item.imageLink}
												price={item.price}
											/>
										</div>
									</CardActions>
								</CardBW>
							</Cell>
						);
					})}
				</Grid>
			</div>
		);
	}
}

export default LandingPage;
