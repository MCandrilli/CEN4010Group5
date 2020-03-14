import React, { Component } from 'react';
import {Textfield, Button, Switch} from 'react-mdl';
import Starrating from './starrating';
import { Card,  CardText} from 'react-mdl';


class customerReview extends Component {


    constructor() {    
        super();
        
        this.state = {
            'comments': [],
            value: '',
            user: '',
            checked: 'false'
        }

        this.handleChange = this.handleChange.bind(this);       
        // this.state = { checked: false };    
        this.handleAnonyousSwitch = this.handleAnonyousSwitch.bind(this);
        // this.state = {isLoggedIn: false};
    }
  
    componentDidMount() {
      this.getItems();
    }
  
    getItems() {
        
        fetch('/comments')
        .then(results => results.json())
        .then(results => this.setState({'comments': results.data}));
  
    }
    
    handleSubmit() {
        let submissiondata = {

            "title": "Book" ,
            "user" : "yousuck1",
            "comment" : this.state.value
        }
    
        fetch('/comments', {
            method: 'POST',
            body: JSON.stringify(submissiondata),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => console.log(data));  
    }

    handleChange(event) {
        console.log(event.target.value)
        this.setState({value: event.target.value});
      }
      
    handleAnonyousSwitch(checked)
    {

        console.log(checked)
        this.setState({ checked });
    }

    // defineuser (event)
    // {
    //     console.log("inside define user");
    //     console.log("the event switch is " , this.);


    // }
    
    render() {

        return(
            
            <div style={{width: '80%', margin: 'auto'}}>  
                {/*add book title and image */}              

                <hr></hr>

                <h2>Book Reviews</h2>

                <div id = 'NewComment' style={{width: '80%', margin: 'auto'}}> 
                      
                    <form style={{margin: '10px'}} onSubmit= {this.handleSubmit.bind(this)}>
                        {/* <Switch ripple id="Anonymous" onChange={this.handleAnonyousSwitch} checked={this.state.checked} >Anonymous comment</Switch> */}
                        <Switch ripple id="Anonymous" >Anonymous comment</Switch>
                        <div style={{width: '100%', margin: 'auto'}}>  
                            <Textfield  value= {this.state.value}
                                onChange={this.handleChange}                                
                                label="Book Comments"
                                // rows={3}
                                style={{width: '100%'}}
                                rows={3}                                
                                maxLength = {'200'}
                                />  
                            <Starrating style={{float:'left'}}/>   
                        </div>                 
                            <Button onClick = {this.handleSubmit.bind()} >Submit Comment</Button>
                    </form>
                </div>  

                <hr></hr>
                
                <h4>Previous Comments</h4>
                  <div>
                      
                {this.state.comments.map(function(element , index){
                    return <Card shadow={0} style={{ width: '80%', height: '10%', margin: '50px'}}>
                    <CardText>
                        <p> <strong> {element.user} : &nbsp; </strong> {element.comment} </p>
                    </CardText>
                    </Card>
                })}
                
                </div>
            </div>
        )
    }
    
}
export default customerReview;