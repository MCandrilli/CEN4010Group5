import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Grid, Cell} from 'react-mdl';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import {Button} from 'reactstrap';
import WishlistDropMenu from './wishlistdropmenu';
import {Link} from 'react-router-dom';
import {addToCart} from './shoppingcart';
import StarRatings from 'react-star-ratings';



class LandingPage extends Component {
    
      constructor() {
          super();
          
          this.state = {
              'items': [],
              'wishlists': [],
              selected_genre : "",
              is_cart_toggle_on: true
          }
          this.handleClick = this.handleClick.bind(this);
      }
      const
      componentDidMount() {
        this.getItems();
        this.getWishLists();
      }
    
      getItems() {
          
          fetch('/books')
          .then(results => results.json())
          .then(results => this.setState({'items': results.data}));
    
      }

      getWishLists() {
          
        fetch('/wishlists')
        .then(results => results.json())
        .then(results => this.setState({'wishlists': results.data}));
  
    }

      handleClick(item) {
        this.setState(prevState => ({
            is_cart_toggle_on: !prevState.is_cart_toggle_on
        }));
        addToCart(item);
    }

    displayStarRating = rating => {
      return(
      <StarRatings rating={rating} starRatedColor="goldenrod" numberOfStars={5} name="rating" starDimension="20px" starSpacing="2px"/>);
    }

    sendToCart(item) {
        console.log("The helper function was called.");
        this.addToCart(item);
    }
    
    filterByRating(rating){
      let tempArray1 =[];
      let tempArray2 = [];
      tempArray1 = this.state.items;
      
        tempArray2 = tempArray1.filter(function(book){
          return book.rating >= rating;
        });
      this.setState({'items' : tempArray2})
      
    }
    filterByGenre(genre){
      let tempArray1 =[];
      let tempArray2 = [];
      tempArray1 = this.state.items;
      
        tempArray2 = tempArray1.filter(function(book){
          return book.genre == genre;
        });
      this.setState({'items' : tempArray2})
      
    }
    sortByBestSellers(){
      let tempArray1 =[];
      let tempArray2 = [];
      tempArray1 = this.state.items;
      
        tempArray2 = tempArray1.filter(function(book){
          return book.ratingCount >= 6;
        });
      this.setState({'items' : tempArray2})
      
    }

    sortByTitle(){
        let tempArray =[];
        tempArray = this.state.items;
        tempArray.sort(function(a,b){
          if (a.title >b.title){
            return 1;
          }
          if (b.title > a.title){
            return -1;
          }
          return 0
        });
        this.setState({'items' : tempArray})
      }
      sortByAuthor(){
        let tempArray =[];
        tempArray = this.state.items;
        tempArray.sort(function(a,b){
          if (a.author >b.author){
            return 1;
          }
          if (b.author > a.author){
            return -1;
          }
          return 0
        });
        this.setState({'items' : tempArray})
      }

      sortByPages(){
        let tempArray =[];
        tempArray = this.state.items;
        tempArray.sort(function(a,b){
          return parseInt(a.pages) - parseInt(b.pages)
        });
        this.setState({'items' : tempArray})
      }
      sortByYear(){
        let tempArray =[];
        tempArray = this.state.items;
        tempArray.sort(function(a,b){
          return parseInt(a.year) - parseInt(b.year)
        });
        this.setState({'items' : tempArray})
      }
    


    render() {
        
        return (
            
            <div style={{boxShadow: "0px 0px 5px 5px #ddd", backgroundColor: '#f0f0f0', width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px'}}>
                  <Button color="info" style={{margin: '5px'}} onClick = {this.sortByTitle.bind(this)}> Sort By Title </Button>
                  <Button color="info" style={{margin: '5px'}} onClick = {this.sortByAuthor.bind(this)}> Sort By Author </Button>
                  <Button color="info" style={{margin: '5px'}} onClick = {this.sortByPages.bind(this)}> Sort By Pages </Button>
                  <Button color="info" style={{margin: '5px'}} onClick = {this.sortByYear.bind(this)}> Sort By Year Published </Button>
                  <Button color="info" style={{margin: '5px'}} onClick = {this.sortByBestSellers.bind(this)}> Best Sellers </Button>
                  <DropdownButton variant = "info" style={{margin: '5px'}} id="dropdown-item-button" title="Select Genre">
                  <Dropdown.Item as="button" onClick = {this.filterByGenre.bind(this, "Historical")}>Historical</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByGenre.bind(this,"Childrens")}>Childrens</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByGenre.bind(this,"Fiction")}>Fiction</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByGenre.bind(this,"Thriller")}>Thriller</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByGenre.bind(this,"Biography")}>Biography</Dropdown.Item>
                  </DropdownButton>
                  <DropdownButton variant = "info" style={{margin: '5px'}} id="dropdown-item-button" title="Star Rating">
                  <Dropdown.Item as="button" onClick = {this.filterByRating.bind(this,1)}>One Star and Up</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByRating.bind(this,2)}>Two Star and Up</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByRating.bind(this,3)}>Three Star and Up</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByRating.bind(this,4)}>Four Star and Up</Dropdown.Item>
                  <Dropdown.Item as="button" onClick = {this.filterByRating.bind(this,5)}>Five Star</Dropdown.Item>
                  </DropdownButton>
                  <Grid className="demo-grid-1">
                    {this.state.items.map((item, index) => {
                    let imageUrl = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + item.imageLink;
                    let lists = this.state.wishlists;
            
                    return <Cell col={4}>
                        
                        <Card shadow={0} style={{ width: '360px', height: '720px', margin: '50px'}}>
                            
                        <CardTitle expand style={{ color: '#fff', background: 'url(' + imageUrl + ') center / cover rgb(207,217,226)'}}></CardTitle>

                        <CardText>
                            <p style={{lineHeight: '24px', fontSize: '24px', textAlign:"center"}}><strong>{item.title} </strong></p>
                            <p style={{lineHeight: '10px', textAlign:"center"}}><strong> by: {item.author} </strong></p>
                            <p style={{lineHeight: '10px', textAlign:"center"}}><strong>{this.displayStarRating(item.rating)} </strong></p>
                            <p style={{lineHeight: '10px', textAlign:"center"}}><strong> Rating Count: {item.ratingCount} </strong></p>
                            <p style={{lineHeight: '10px', textAlign:"center"}}><strong> Genre: {item.genre} </strong></p>
                        
                        </CardText>

                        <CardActions border>
                            <Link to={{
                                    pathname: "/bookdetails",
                                    aboutProps:{
                                    book: item
                                }
                            }} style={{textDecoration: 'none'}}>

                            <Button color="info" style={{marginLeft: '18%', paddingLeft: '60px', paddingRight: '60px', marginBottom: '5px'}}>View Book Details</Button>
                            </Link>
                            <br/>
                                
                            <div style={{marginLeft:'10%'}}>
                                <Button color="success" style={{float:'left', marginLeft:'20px'}} onClick = {() => this.handleClick(item)} >Add to Cart</Button>                            
                                <WishlistDropMenu style={{float: 'left', paddingLeft:'5px'}} booktitle={item.title} id={item._id} lists={lists} imageLink={item.imageLink} price={item.price}/>
                            </div>
                        </CardActions>
                    </Card>
                        
                    </Cell>
                }   
                 
                 )}
                 
                </Grid>
              
            </div>
        
        
       
        )
    
    }
    
}

export default LandingPage;