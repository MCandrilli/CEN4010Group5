import React, { Component } from 'react';
import {Textfield, Button, Switch} from 'react-mdl';
import Starrating from './starrating';
import {Link} from 'react-router-dom';

class BookDetails extends Component {
    render() {
        return(
            
            <div style={{width: '80%', margin: 'auto'}}>  
                <h1>book details!</h1>

                <div id = 'NewComment' style={{width: '80%', margin: 'auto'}}>       
                
                <Link to={{pathname:"/customerReview" }}>
                {/* // , state: {bookname: item.title}}}> */}
                    <Button style={{width: '80%', height: '50%'}}> Book Reviews </Button>
                </Link>
                </div>        
            </div>
        )
    }
    
}
export default BookDetails;