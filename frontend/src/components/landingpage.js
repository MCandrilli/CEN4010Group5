import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Button, Grid, Cell} from 'react-mdl';
import SimpleMenu from './SimpleMenu'
import {Link} from 'react-router-dom';
var NumberFormat = require('react-number-format');


class LandingPage extends Component {
    
      constructor() {
          super();
          
          this.state = {
              'items': []
          }
      }
    
      componentDidMount() {
        this.getItems();
      }
    
      getItems() {
          
          fetch('/books')
          .then(results => results.json())
          .then(results => this.setState({'items': results.data}));
    
      }
    
    addToCart(){
        alert("Added to Cart!");
    }
    
    render() {
        
        return (
            
            <div style={{width: '80%', margin: 'auto'}}>
               
                <Grid className="demo-grid-1">
                     {this.state.items.map(function(item, index) {
                    let imageUrl = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + item.imageLink;
            
            
                    return <Cell col={4}>
                        
                        <Card shadow={0} style={{ width: '360px', height: '720px', margin: '50px'}}>
                            
                        <CardTitle expand style={{ color: '#fff', background: 'url(' + imageUrl + ') center / cover rgb(207,217,226)'}}></CardTitle>

                        <CardText>
                            <p style={{lineHeight: '24px', fontSize: '24px', textAlign:"center"}}><strong>{item.title} </strong></p>
                            <p style={{lineHeight: '10px', textAlign:"center"}}><strong> by: {item.author} </strong></p>
                        
                        </CardText>

                        <CardActions border>
                            <Link to={{
                                pathname: "/bookdetails",
                                aboutProps:{
                                    book: item
                                }
                            }} style={{textDecoration: 'none'}}> 
                            <Button colored style={{marginLeft:'30%'}}>Book Details</Button>
                            </Link><br/>
                                
                                <div style={{marginLeft:'10%'}}>
                            <Button colored style={{float:'left'}}>Add to Cart</Button>
                            
                            <SimpleMenu style={{float:'left'}} />
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