import React, { Component } from 'react';
import {Textfield} from 'react-mdl';
import { Card, CardTitle, CardText, CardActions, Button, Grid, Cell} from 'react-mdl';
import SimpleMenu from './SimpleMenu'
import {Link} from 'react-router-dom';
var NumberFormat = require('react-number-format');
//var sortTitle = false;

class Searchforbooks extends Component {
    state ={}
   
        constructor() {
            super()
            this.state = {
                //posts: [{
                'items': [],
                //selected : false,
                //},{
                //'sortTitle' : [], 
                //selected : false
               // }]
            }
            //this.state = {
            //    'sorteditems': []
            //}
            //this.handleSortTitleClick = this.handleSortTitleClick.bind(this);
            //this.state = {sortByTitle: false};
            
        }
        //handleSortTitleClick = (e) =>{
        //    const {posts} = this.state;
        //    const {id} = e.target;
        //    posts[id].selected =!this.state.posts[id].selected
        //    this.setState({posts})
         //   if (sortByTitle){
         //       this.setState({sortByTitle: true});
          //  }
          //  else {
              //  this.setState({sortByTitle: false});  
            //}
        //}
        
     
        componentDidMount() {
            //const sortByTitle = this.state.sortByTitle;
           // if(sortByTitle){
             //   this.getItems();
            //}
            //else{
                this.getItems()
            //}
        }
       // componetDidUpdate(){
         //   this.sortBooks();
        //}
        parseData(response){
            if(this.state.sortTitle){
                response.data.sort((a,b) => a.title.localeCompare(b.title))
            }
            
            return response.data;
        }
        onLoad = (data) => {
            this.setState({
                data: this.parseData(data) 
            });
            //if(this.state.sortTitle){
              //  this.setState({
                //    data: this.parseData(data) 
            //});
        //}
            //this.setState({sortTitle : false});

        } 
        componentDidUpdate(){
        }
        sortBooks(item){
            //if(sortTitle){
            //sortTitle = true;
            //this.setState({sortTitle : true});
           // }
            //else{
            //    sortTitle = true;
            //}
            item.data.sort((a,b) => a.title.localeCompare(b.title))
            //this.componentDidUpdate()
            
            //fetch('/books')
            //.then((results) => results.json())
            //.then(results =>
            //this.setState((state)=>{
            //var obj = [this.state.data]
            //obj.sort((a,b) => a.title.localeCompare(b.title));
            //return {'items':obj.data}
            //});
            //this.setState({'items': obj.data});
            //.then(this.setState({'items':(results => {results.data.sort((a,b) => a.title.localeCompare(b.title))})}));
            //.then(results => this.setState({'items': results.data}));
            }
        
        getItems() {
            //const sortByTitle = this.state.sortByTitle;
            //if(sortByTitle){
                fetch('/books')
                .then(results => results.json())
                .then(this.onLoad);
            //}
            //else{
            //    fetch('/books')
            //    .then((result) => result.json())
            //    .then(this.setState({'sorteditems':(result => {result.data.sort((a,b) => a.title.localeCompare(b.title))})}));
                //.then(results => this.setState({'items': results.data}));
           // }
        }
       //componentDidUpdate(){
         //  this.sortBooks();
       //}
        
    
    
          
          
      
      addToCart(){
          alert("Added to Cart!");
      }
      render(){
        const{data} = this.state;
        return data ?
            this.renderData(data) :
            this.renderLoading()

      }
    renderData(data) {
        if(data && data.length){
            return(
            <div style={{width: '90%', margin: '2%', border: '1px solid #888', borderRadius: '15px'}}>
                            <Textfield
                    onChange={() => {}}
                    label="Enter Title of Book to Search..."
                    style={{margin: '20px',width: '95%', justifyContent:'center', alignItems:'center'}}
                    />
                    
                    <Button colored style={{marginLeft:'25%'}} onclick  ={() => this.sortBooks(data)} >Sort by Title</Button>   
                                    
        
                    <Grid className="demo-grid-1">
                        {this.props.data.map(item => (
                            <div key = {item.id}>                 
                             
                         <Cell col={4}>
                            
                            <Card shadow={0} style={{ width: '360px', height: '720px', margin: '50px'}}>
                                
                            <CardTitle expand style={{ color: '#fff', background: 'url(' + 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/' + item.imageLink + ') center / cover rgb(207,217,226)'}}></CardTitle>

                            <CardText>
                                <p style={{lineHeight: '24px', fontSize: '24px', textAlign:"center"}}><strong>{item.title} </strong></p>
                                <p style={{lineHeight: '10px', textAlign:"center"}}><strong> by: {item.author} </strong></p>
                            
                            </CardText>

                            <CardActions border>
                                <Link to="/bookdetails" style={{textDecoration: 'none'}}> 
                                <Button colored style={{marginLeft:'25%'}} onclick="addtoCart()">View Book Details</Button>
                                </Link><br/>
                                    
                                    <div style={{marginLeft:'10%'}}>
                                <Button colored style={{float:'left'}}>Add to Cart</Button>
                                
                                <SimpleMenu style={{float:'left'}} />
                                    </div>
    </CardActions>
                        </Card>
                            
                        </Cell>
                        
                    
                        }
                    /</div>
                        ))
                    } 
                    
                    </Grid>
                
                </div>
            
            
        
            )
        }
    
    
        else{
            return <div> No Items found</div>
        }
    }
    renderLoading(){
        return <div>Loading...</div>
    }
    
}

export default Searchforbooks;