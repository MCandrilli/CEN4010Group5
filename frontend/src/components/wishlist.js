import React, { Component } from 'react';
import { DataTable, Button, TableHeader, Grid, Cell, Textfield} from 'react-mdl';
import {Link} from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components";
import {Dropdown, DropdownButton } from 'react-bootstrap';
import {addToCart} from './shoppingcart'

class Wishlist extends Component {

    constructor() {
        super();
        
        this.state = {
            'items': [],
            'listItems': [],
            value: '',
            errorMessage: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteSubmit = this.deleteSubmit.bind(this);

    }
  
    componentDidMount() {
      this.getItems();
      this.getListItems();
    }
  
    getItems() {
        
        fetch('/wishlists')
        .then(results => results.json())
        .then(results => this.setState({'items': results.data}));
  
    }
    
    getListItems(){
        fetch('/wishlistItems')
        .then(results => results.json())
        .then(results => this.setState({'listItems': results.data}));
       
    }
    
    handleSubmit() {
        let submissiondata = {
            "title": this.state.value
        }
    
        if (this.state.items.length < 3){
            fetch('/wishlists', {
                method: 'POST',
                body: JSON.stringify(submissiondata),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(res => res.json())
            .then(data => console.log(data));    
        } else {
            this.setState({errorMessage: "Too many lists!"});
        }
        
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
    

    deleteSubmit(_id) {
        
        axios.delete(`http://localhost:5000/wishlists/delete/` + _id)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
        
       this.setState({items: this.state.items.filter(item => item._id !== _id)});
    }
    
    
    deleteItem(_id) {
        
        axios.delete(`http://localhost:5000/wishlistItems/delete/` + _id)
      .then(res => {
        console.log(res);
        console.log(res.data);
      });
        
       this.setState({items: this.state.items.filter(item => item._id !== _id)});
    }

    moveItem(id, title, listID, imageLink, price){
        axios.delete(`http://localhost:5000/wishlistItems/delete/` + id)
        .then(res => {
          console.log(res);
          console.log(res.data);
        });

        let submissiondata = {
            "title": title,
            "belongsTo": listID,
            "imageLink": imageLink,
            "price" : price
        }

        fetch('/wishlistItems', {
            method: 'POST',
            body: JSON.stringify(submissiondata),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(data => console.log(data)); 

        window.location.reload();

    }


    
    moveListDropdown(listTitle, listID, listItem, itemID, itemImageLink, itemPrice, element) {

        if (this.state.items.length === 1) {
            return  <div>   <DropdownButton id="dropdown-basic-button" title="Move">
                                <Dropdown.Item onClick = {() => (element != null) && addToCart(element)}>Add to Cart.</Dropdown.Item>
                                <Dropdown.Item>No other lists available.</Dropdown.Item>
                            </DropdownButton>
                    </div>
                   
        }
        else return (
            <div>
            <DropdownButton id="dropdown-basic-button" title="Move">
            <Dropdown.Item onClick = {() => (element != null) && addToCart(element)}>Add to Cart.</Dropdown.Item>
                 {this.state.items.map(function(item, index){
                    if (item.title !== listTitle)
                        return <Dropdown.Item onClick={this.moveItem.bind(this, itemID, listItem, item._id, itemImageLink, itemPrice)}>{item.title}</Dropdown.Item>
                        
                 }, this)}
                
            </DropdownButton>
            </div>
        );
    }

    render() {
        
    
        
         return(
             <div style={{width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px'}}>
                <div style={{width: '25%', margin: 'auto', boxShadow: "0px 0px 3px 3px #ccc"}}>
                <p style={{marginLeft: '25%', paddingTop: '25px', fontSize: '24px'}}>Create a wishlist</p>
                    <form style={{margin: '10px'}}onSubmit= {this.handleSubmit}>
                        <label style={{marginLeft:'15%', marginTop: '10px'}}>  
                            <Textfield value={this.state.value}
                                onChange={this.handleChange}
                                label="Type Name for Wishlist..."
                                style={{width: '200px'}}
                            />  
                        </label>
                        <Button  type="submit" value="Create">Create</Button>
                    </form>
                </div>
                
                    
                <Grid className="demo-grid-1">
                    {this.state.items.map(function(item, index) {
                    
                    
                    let wishListItems = []; 
                    this.state.listItems.forEach(element => {
                        if (element.belongsTo === item._id)
                            wishListItems.push({booktitle: element.title, delete: <Button outline color="danger" onClick={()=>{
                                                axios.delete(`http://localhost:5000/wishlistItems/delete/` + element._id)
                                  .then(res => {
                                    console.log(res);
                                    console.log(res.data);
                                  });
                            
                                    window.location.reload();
                            }}>X</Button>, 
                            moveTo: this.moveListDropdown(item.title, item._id, element.title, element._id, element.imageLink, element.price, element)});
                       
                    });
                    
                    if (wishListItems.length === 0){
                        wishListItems.push({booktitle: "Empty List"});           
                    };
             
                  
             
             
                        
                    return <Cell col={4} key={item._id} >
                        <h3 style={{display: 'flex', justifyContent: 'center'}}>{item.title}</h3>
                    
                            <DataTable style={{width: '30%'}}
                                shadow={0}
                                
                                rows={
                                    wishListItems
                                }
                            >
                                    
                                    
                                    
                                <TableHeader name="booktitle" tooltip="The Book' title">Book Title</TableHeader>
                                 <TableHeader name="delete" tooltip="Delete"> </TableHeader>
                                 <TableHeader name="moveTo" tooltip="1"> </TableHeader>
                                 <TableHeader name="toCart" tooltip=""></TableHeader>
                                 
        
        
                                
                            </DataTable>
                           <Button key={item._id} onClick={()=> {this.deleteSubmit(item._id)}}>Delete</Button>
                        </Cell>
                    }, this)}
                </Grid>
             </div>
        )
    }
    
}

export default Wishlist;