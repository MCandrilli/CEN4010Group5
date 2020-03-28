import React, { Component } from 'react';
import axios from 'axios';
import {Textfield, Switch , CardText, Grid, Cell, Card} from 'react-mdl';
import Starrating from './starrating';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';
import StarRatings from 'react-star-ratings';
import 'bootstrap/dist/css/bootstrap.min.css';

class customerReview extends Component {

    constructor() {    
        super();          

        this.state = {
            'books': [],
            value: '',
            user: '',
            
            nickname: null,
            rating: 1,
            checked: false,
            isLoggedUser : false,
            bookIsPurchased : true,
            checked: false,

            
            userSelectedStarValue: 1,
        }

        this.handleChange = this.handleChange.bind(this);       
        this.handleAnonyousSwitch = this.handleAnonyousSwitch.bind(this);
        this.displayStarRating = this.displayStarRating.bind(this);
    }
      
    async componentDidMount() {
        
        const { data: profileData }  = await axios.get('http://localhost:5000' + '/user?id=john123');
        const profileInfo = profileData.data;
        console.log(profileInfo);

        this.getItems();
        this.setState({checked: false});
        if(profileInfo !== null) 
        {
            this.setState({isLoggedUser : true});
        }


        this.setState(profileInfo);
    }
  
    getItems() {
        
        fetch('/comments')
        .then(results => results.json())
        .then(results => this.setState({'books': results.data}));
  
    }
   
    handleSubmit(book) {

        let userName = '';
        if (this.state.checked === true){
            userName = "Anonymous";
        } else {
            userName = this.state.nickname;
        }
        console.log(this.props.location.aboutProps.book.title);

        let submissiondata = {
                 
            "title": this.props.location.aboutProps.book.title,
            "Comments" :
            [
                {
                    "User" : userName,
                    "Comment" : this.state.value,                    
                    "Rating" : this.state.userSelectedStarValue
                }
            ]
        }
        console.log(submissiondata);
        fetch('/comments', {
            method: 'POST',
            body: JSON.stringify(submissiondata),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => console.log(data));  


        
        
        let newRating = (book.rating*book.ratingCount + this.state.userSelectedStarValue)/(book.ratingCount+1);
        let newCount = (book.ratingCount+1);
       
        
        let commentUpdateData = {
            "rating": newRating,
            "ratingCount": newCount
        };

        fetch('/books/' + book._id, {
            method: 'PUT',
            body: JSON.stringify(commentUpdateData),
            headers: {
                'Content-Type': 'application/json'
            }
            })
            
            .then((response) => response.json())
            .then((result) => {
            console.log('Success:', result);
            })
            .catch((error) => {
            console.error('Error:', error);
            });
    }
 
    handleChange(event) {
        console.log(event.target.value)
        this.setState({value: event.target.value});
      }
    handleAnonyousSwitch()
    {
        this.setState({checked: !this.state.checked});
        console.log(this.state.checked)
    };

    updateStarValue(value){
        this.setState({userSelectedStarValue: value});
        console.log(this.state.userSelectedStarValue);
    }
 
 
    changeRating( newRating, name ) {
        this.setState({
          userSelectedStarValue: newRating
        })
        console.log(newRating);
    }; 

    displayStarRating = rating => {
        return(
        <StarRatings rating={rating} starRatedColor="goldenrod" numberOfStars={5} name="rating" starDimension="20px" starSpacing="2px"/>);
      }


    render() {
        const isLoggedIn = this.state.isLoggedUser;
        const isPurchased = this.state.bookIsPurchased;
        const commentdisabled = !this.state.isLoggedUser || !this.state.bookIsPurchased;
        let errorMessage;

        console.log(this.state.nickname)
        console.log('logged in user set to: ' + isLoggedIn)

        if(isLoggedIn && isPurchased) errorMessage = null;
        else if (isLoggedIn && !isPurchased) errorMessage = <span style = {{color:'red'}}  > Purchase book to comment </span>
        else if (!isLoggedIn) errorMessage = <span style = {{color:'red'}}  > Log in to comment </span>

        let bookProps = this.props.location.aboutProps || {}    
        {/*if props is not empty, load the page*/}
        if(bookProps.book)
        { 
           let imageUrl = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + bookProps.book.imageLink;
        
            return(          
                <div style={{width: '80%', margin: 'auto'}}>  
                
                <Link to={{pathname: "/bookdetails" , aboutProps:{book: bookProps.book}}} style={{textDecoration: 'none'}}> 
                    <Button color="info" style={{margin: '5px'}}> Back : {bookProps.book.title}</Button>
                </Link><br/>                
                <Link to={{pathname: "/"}} style={{textDecoration: 'none'}}> 
                    <Button color="info" style={{margin: '5px'}}>Back to Home Page</Button>
                </Link><br/>
                    <Grid>
                        <Cell style = {{width:'50%'}} align = 'middle'>
                            <img style={{ alignItems:'center'}}src={imageUrl}/>
                        </Cell>
                        <Cell align = 'middle'>
                            <br/>
                            <h2> {bookProps.book.title}</h2>
                            <StarRatings rating={bookProps.book.rating} starRatedColor="goldenrod" numberOfStars={5} name="rating" starDimension="20px" starSpacing="2px"/>
                            <strong> by: {bookProps.book.author}</strong>  
                        </Cell>                            
                    </Grid>   
    
                    <hr></hr>
                    <h2>Book Reviews</h2>
                    <div id = 'NewComment' style={{width: '80%', margin: 'auto'}}>
                        <form style={{margin: '10px'}} onSubmit= {this.handleSubmit.bind(this)} >
                            <Switch ripple id="Anonymous" onChange={this.handleAnonyousSwitch.bind(this)} disabled = {commentdisabled}>Anonymous comment</Switch>
                            <div style={{width: '100%', margin: 'auto'}}>  
                                <Textfield  value= {this.state.value}
                                    onChange={this.handleChange}                                
                                    label="Book Comments"
                                    style={{width: '100%'}}
                                    rows={3}                                
                                    maxLength = {'200'}
                                    disabled = {commentdisabled}
                                    />  
                                <StarRatings
                                       
                                       rating={this.state.userSelectedStarValue}
                                       starRatedColor="gold"
                                       changeRating={this.changeRating.bind(this)}
                                       numberOfStars={5}
                                       name='rating'
                                       starDimension="20px"
                                       starSpacing="2px"
                                       />
                            </div>   

                            <Link to={{pathname:"/customerReview" , aboutProps:{ book: bookProps.book}}}>                            
                                <Button 
                                //disable if 
                                    disabled={commentdisabled} 
                                    onClick = {this.handleSubmit.bind(this, bookProps.book)} >Submit Comment
                                </Button>
                                {errorMessage}  
                            </Link>                            
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
                                        {console.log(comm.Rating)}
                                        <StarRatings rating={comm.Rating} starRatedColor="goldenrod" numberOfStars={5} name="rating" starDimension="20px" starSpacing="2px"/>
                            
                            {/* <p style={{lineHeight: '10px', textAlign:"center"}}><strong>{displayStarRating(comm.Rating)} </strong></p> */}
                                    </CardText>
                                    </Card>
                                })
                            }
                        })}           
                    </div>
                </div>
            )

        }
        else{return <div>
            <h2>NO BOOK PROPS :(</h2>
                <Link to={{pathname: "/"}} style={{textDecoration: 'none'}}> 
                    <Button colored style={{marginLeft:'25%'}}>Back to Home Page</Button>
                </Link><br/>
            </div>}       
    }
}
export default customerReview;