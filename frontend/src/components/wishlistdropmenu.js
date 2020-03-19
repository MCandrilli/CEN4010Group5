import React, { Component } from 'react';
import {Menu, MenuItem, IconButton} from 'react-mdl';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';



class WishlistDropMenu extends Component {
    
   
    handleClick(title, listid){
        console.log(title, listid);
        
        let submissiondata = {
            "title": title,
            "belongsTo": listid
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
    }

    handleClose(){}

    
    render(){
        
     const list1 = this.props.lists.map(name => name.title);
     let createlist;
     if (this.props.lists.length < 3)
         createlist = <MenuItem><Link  to="/wishlist">Add a Wishlist</Link></MenuItem>;
        

    return(
        <div style={{position: 'relative', float: 'left', paddingLeft: '4px'}}>
          <Button color="success" id={this.props.booktitle} >ADD TO WISHLIST</Button>
            <Menu target={this.props.booktitle} valign="top" ripple>
            {this.props.lists.map(function(list, index) {
                return <div style={{float: 'left'}}><MenuItem onClick={this.handleClick.bind(this, this.props.booktitle, list._id)}>Add to Wishlist: {list.title}</MenuItem></div>
            }, this)}
            {createlist}
            </Menu>
        </div>
        
        )
    }
}

export default WishlistDropMenu;


