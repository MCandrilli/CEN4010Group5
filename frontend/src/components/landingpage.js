import React, { Component } from 'react';
import { Card, CardTitle, CardText, CardActions, Button, Grid, Cell} from 'react-mdl';
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
    
    render() {
        return (
            
            <div style={{width: '80%', margin: 'auto'}}>
                
                <Grid className="demo-grid-1">
                     {this.state.items.map(function(item, index) {
                    let url = 'background: url(https://github.com/benoitvallon/100-best-books/blob/master/static/' + item.imageLink + ') bottom right 15% no-repeat #46B6AC';
            
            
                    return <Cell col={4}><Card shadow={0} style={{ width: '320px', height: '620px', margin: 'auto'}}>
                        <CardTitle expand style={{ color: '#fff', background: 'url(https://firstfreerockford.org/wp-content/uploads/2018/08/placeholder-book-cover-default.png) bottom right 15% no-repeat rgb(207,217,226)'}}>{item.title}</CardTitle>
                        <CardText>
                            <p><strong> Author: {item.author} </strong></p>
                            <p> Language: {item.language} </p>
                            <p> Pages: {item.pages} </p>
                            <p> Year: {item.pages} </p>
                        </CardText>
                        <CardActions border>
                            <Button colored>View Book</Button>
                        </CardActions>
                    </Card></Cell>
                }
                 
                 )}
                </Grid>
              
            </div>
        
        
       
        )
    
    }
    
}

export default LandingPage;