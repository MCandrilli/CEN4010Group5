import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';



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
    
    return(
            //{this.props.id} = book id
         <div>
            {this.props.lists.map(function(list, index) {
                return <div><button onClick={this.handleClick.bind(this, this.props.booktitle, list._id)}>Add to {list.title}</button></div>
            }, this)}
            
        </div>
        )
    }
}

export default WishlistDropMenu;


