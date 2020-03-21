import React, { Component } from 'react';
import {Textfield, Button, Switch , CardText, Grid, Cell, Card} from 'react-mdl';
import Starrating from './starrating';
import Typography from '@material-ui/core/Typography';


class customerReview extends Component {

    constructor() {    
        super();          

        this.state = {
            'books': [],
            value: '',
            user: '',
            rating: 1,
            checked: false,
            isLoggedUser : true,
            bookIsPurchased : true

        }

        this.handleChange = this.handleChange.bind(this);       
        this.handleAnonyousSwitch = this.handleAnonyousSwitch.bind(this);
    }
      
    componentDidMount() {
      this.getItems();
    }
  
    getItems() {
        
        fetch('/comments')
        .then(results => results.json())
        .then(results => this.setState({'books': results.data}));
  
    }
   
    handleSubmit(bookName) {
        let userName = '';
        if (this.state.checked == true){
            userName = "Anonymous";
        } else {
            userName = "Generic User Name";
        }
 
        let submissiondata = {
 
            "title": bookName ,
            "Comments" :  "",
            "user" : userName,
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
     
    handleAnonyousSwitch()
    {
        this.setState({checked: !this.state.checked});
        console.log(this.state.checked)
    }

    render() {
        const isLoggedIn = this.state.isLoggedUser;
        const isPurchased = this.state.bookIsPurchased;
        const commentdisabled = !this.state.isLoggedUser || !this.state.bookIsPurchased;
        let errorMessage;

        let bookProps = this.props.location.aboutProps || {}    
        let imageUrl = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + bookProps.book.imageLink;
        

        if(isLoggedIn && isPurchased) errorMessage = null;
        else if (isLoggedIn && !isPurchased) errorMessage = <span style = {{color:'red'}}  > Purchase book to comment </span>
        else if (!isLoggedIn) errorMessage = <span style = {{color:'red'}}  > Log in to comment </span>

        return(          
            <div style={{width: '80%', margin: 'auto'}}>  
                <Grid>
                    <Cell style = {{width:'50%'}} align = 'middle'>
                        <img style={{ alignItems:'center'}}src={imageUrl}/>
                    </Cell>
                    <Cell align = 'middle'>
                        <br/>
                        <h2> {bookProps.book.title}</h2>
                        <strong> by: {bookProps.book.author}</strong>  
                    </Cell>                            
                </Grid>   
 
                <hr></hr>
                <h2>Book Reviews</h2>
                <div id = 'NewComment' style={{width: '80%', margin: 'auto'}}>
                    <form style={{margin: '10px'}} onSubmit= {this.handleSubmit(bookProps.book.title)} >
                        <Switch ripple id="Anonymous" onChange={this.handleAnonyousSwitch(this)} disabled = {commentdisabled}>Anonymous comment</Switch>
                        <div style={{width: '100%', margin: 'auto'}}>  
                            <Textfield  value= {this.state.value}
                                onChange={this.handleChange}                                
                                label="Book Comments"
                                style={{width: '100%'}}
                                rows={3}                                
                                maxLength = {'200'}
                                disabled = {commentdisabled}
                                />  
                            <Starrating style={{float:'left'}} disabled = {commentdisabled}/>  
                        </div>                
                            <Button 
                            //disable if 
                                disabled={commentdisabled} 
                                onClick = {this.handleSubmit.bind(this)} >Submit Comment
                            </Button>
                            {errorMessage}                           
                    </form>
                </div>   
                <hr></hr>
               
                <h4>Previous Comments</h4>
                <div>
                    {/* {loop through bookS} */}
                    {this.state.books.map(function(element){
                    
                    {/* {find correct book} */}
                        if(element.title === bookProps.book.title)
                        {
                            {/* {loop through nested array of user and comments} */}
                            return element.Comments.map(function(comm)
                            {
                                {/* {Create cards for each user and its comment} */}
                                return <Card shadow={0} key={comm.User} style={{ width: '80%', height: '10%', margin: '50px'}}>
                                <CardText>
                                    <p> <strong> {comm.User} : &nbsp; </strong> {comm.Comment} </p>
                                </CardText>
                                </Card>
                            })
                        }
                    })}           
                </div>
            </div>
        )
    }
   
}
export default customerReview;