import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Button, Grid, Cell} from 'react-mdl';
import SimpleMenu from './SimpleMenu'
import WishlistDropMenu from './wishlistdropmenu';
import {Link} from 'react-router-dom';
import {addToCart} from './shoppingcart';
var NumberFormat = require('react-number-format');


class LandingPage extends Component {
    
      constructor() {
          super();
          
          this.state = {
              'items': [],
              'wishlists': [],
              is_cart_toggle_on: true
          }
      }
    
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

    sendToCart(item) {
        console.log("The helper function was called.");
        this.addToCart(item);
    }
    
    render() {
        
        return (
            
            <div style={{boxShadow: "0px 0px 5px 5px #ddd", backgroundColor: '#f0f0f0', width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px'}}>
               
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
                            <p style={{lineHeight: '10px', textAlign:"center"}}><strong> Rating: {item.rating} </strong></p>
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
                            <Button colored style={{marginLeft:'25%'}}>View Book Details</Button>
                            </Link><br/>
                                
                                <div style={{marginLeft:'10%'}}>
                            <Button colored style={{float:'left'}} onClick = {() => this.handleClick(item)} >Add to Cart</Button>
                            
                            <WishlistDropMenu style={{float: 'left'}} booktitle={item.title} id={item._id} lists={lists} imageLink={item.imageLink} price={item.price}/>
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