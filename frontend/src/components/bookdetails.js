import React, { Component } from 'react';
import {Textfield, Button, Switch} from 'react-mdl';
import Starrating from './starrating';

class BookDetails extends Component {
    render() {
        return(
            
            <div style={{width: '80%', margin: 'auto'}}>  
                <h1>book details!</h1>

                <div id = 'NewComment' style={{width: '80%', margin: 'auto'}}>       
                    <Switch ripple id="Anonymous" defaultChecked>Anonymous comment</Switch>

                    <Textfield
                    // onChange={() => {}}
                    label="Book Comments"
                    rows={3}
                    style={{width: '100%'}}
                    maxLength = {'200'}
                    />
                    <div>
                        <Starrating style={{float:'left'}}/>                    
                        <Button border colored style={{float:'left'}}>Submit Comment</Button>
                    </div>
                </div>        
            </div>
        )
    }
    
}
export default BookDetails;