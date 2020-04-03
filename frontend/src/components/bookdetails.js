import React, { Component } from 'react';
import {Grid, Cell,Button} from 'react-mdl';
import {Card, CardText} from 'react-mdl';
import {addToCart} from "./shoppingcart";
import {Link} from 'react-router-dom'
import StarRatings from 'react-star-ratings';
import WishlistDropMenu from './wishlistdropmenu';

let data
class BookDetails extends Component {

    constructor(){
        super();
        this.state ={
            'wishlists': []
        };
    }

    setStrorage(){
        if(this.props.location.aboutProps){
        localStorage.setItem('state', JSON.stringify(this.props.location.aboutProps))
        }

    }

     getStorage(){
        return JSON.parse(localStorage.getItem('state') || '{}');
     }
    
    componentWillMount(){
        this.setStrorage()  //this make it change but saves when leaves!!
        data = this.getStorage()
        this.getWishLists();
    }

    getWishLists() {
		fetch('/wishlists')
			.then((results) => results.json())
            .then((results) => this.setState({ 'wishlists': results.data }));
            
        fetch('/wishlists').then((results) => results.json())
        .then((results) => this.setState({ wishlists: results.data
            .filter(function(element) {return element.owner === localStorage.getItem('id')}) }));

	}
    
    render() {
        let myData = data || {}      
       
        

        console.log(myData)          
        if (myData.book) {
            let imageUrl = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + myData.book.imageLink;
            
            return(
                <div> 
                    <Grid>
                        
                        <Cell style={{ width: '25%'}}>                        
                            
                        </Cell>
                        <Cell  style={{ width: '360px'}}>
                            <Card shadow={0} style={{ width: '360px', height: '720px',  background: 'url(' + imageUrl + ') center / cover rgb(207,217,226)'}}>
                            </Card> 
                            
                        </Cell >
                        <Cell>       
                            <Card style={{ width: '500px', height: 'auto'}}>
                                <CardText style = {{paddingTop:'5px'}}>
                                <h3 style = {{marginTop:'0px', marginBottom: '5px'}}>{myData.book.title}</h3>
                                <overline style ={{marginTop:'0px'}}>by: 
                                    <Link to={{pathname:"/bookByAuthor",
                                        aboutProps:{
                                            book: myData.book
                                        }
                                        }} 
                                        style = {{color: '#6fa3f7'}}>
                                        {myData.book.author}
                                    </Link></overline>
                                <h4>About author
                                    <p>{myData.book.aboutAuthor}</p>
                                </h4>
                                
                                <h4 style = {{backgroundColor: '#f0f0f0', padding: '10px'}}>Overview
                                <p>{myData.book.Overview}</p>
                                <p>
                                    Genre: {myData.book.genre}<br/>
                                    Language: {myData.book.language}<br/>
                                    Year: {myData.book.year}<br/>
                                    Pages: {myData.book.pages}
                                </p>
                                </h4>
                                <StarRatings rating={myData.book.rating} starRatedColor="goldenrod" numberOfStars={5} name="rating" starDimension="20px" starSpacing="2px"/>
                                <h5><strong>
                                    ${myData.book.price}
                                </strong></h5>
                                <Button style = {{float: 'left', height: '33px',backgroundColor: '#6fa3f7'}} onClick = {() => {(myData.book != null) && (addToCart(myData.book))}}>
                                    Add to Shopping Cart
                                </Button>
                                <WishlistDropMenu style={{paddingLeft:'5px'}} booktitle={myData.book.title} id={myData.book._id} lists={this.state.wishlists} imageLink={myData.book.imageLink} price={myData.book.price}/>
                                        
                                    <Link to={{pathname:"/customerReview" ,
                                        aboutProps:{
                                            book: myData.book
                                        }
                                        }}>
                                    <Button shadow={0} align = {'center'} style={{width: '100%', height: '50%'}}> Book Reviews </Button>
                                    </Link>       
                                
                                </CardText>
                            </Card>                     
                        </Cell>
                    </Grid>
                </div>   
            )
        }else{
            return( 
                <div></div>
            )
        }
    }    
}
export default BookDetails;