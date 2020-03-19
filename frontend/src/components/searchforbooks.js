import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Grid, Cell} from 'react-mdl';
import {Button} from 'reactstrap';
import WishlistDropMenu from './wishlistdropmenu';
import {addToCart} from "./shoppingcart"
import {Link} from 'react-router-dom';



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
    
        getWishLists() {
          
          fetch('/wishlists')
          .then(results => results.json())
          .then(results => this.setState({'wishlists': results.data}));
    
      }

      handleClick(item) {
        this.setState(prevState => ({
            is_cart_toggle_on: !prevState.is_cart_toggle_on
        }));
        (item != null) && addToCart(item);
    }

    
    
    render() {
        
        return (
            
            <div style={{boxshadow: "0px 0px 5px #ddd", backgroundcolor: '#f0f0f0', width: '80%', margin: 'auto'}}>
              <Button color="success" onClick = {this.sortByTitle.bind(this)}> SORT BY TITLE </Button>
              <Button onClick = {this.sortByAuthor.bind(this)}> SORT BY AUTHOR </Button>
              <Button onClick = {this.sortByPages.bind(this)}> SORT BY PAGES </Button>
              <Button onClick = {this.sortByYear.bind(this)}> SORT BY YEAR PUBLISHED </Button>

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
                                        <p style={{lineHeight: '10px', textAlign:"center"}}><strong> Year Published: {item.year} </strong></p>

                                    </CardText>

                                 <CardActions border>
                                        <Link to="/bookdetails" style={{textDecoration: 'none'}}> 
                                        <Button colored style={{marginLeft:'25%'}} onclick="addtoCart()">View Book Details</Button>
                                        </Link><br/>

                                    <div style={{marginLeft:'10%'}}>
                                         <Button colored style={{float:'left'}} onClick = {() => this.handleClick(item)}>Add to Cart</Button>
                                        
                                        <WishlistDropMenu booktitle={item.title} id={item._id} lists={lists} style={{float:'left'}} imageLink={item.imageLink} price={item.price}/>
                                       
                                    </div>
                            </CardActions>
                            </Card>
                        
                    </Cell>
                }, this)}
                 
                </Grid>
              
            </div>
        
        
       
        )
    }

}

export default LandingPage;