import React, { Component } from 'react';
import { DataTable, TableHeader, Grid, Cell} from 'react-mdl';
import axios from 'axios';


class Wishlist extends Component {

    constructor() {
        super();
        
        this.state = {
            'items': [],
            'listItems': [],
            'list1': [],
            'list2': [],
            'list3': [],
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
        
       this.setState({items: this.state.items.filter(item => item._id != _id)});
    }
    
    
    render() {
         return(
             <div style={{width: '80%', margin: '5%'}}>
                 <form onSubmit= {this.handleSubmit}>
                    <label>
                        Create a WishList:   
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Create" />
                </form>
            
                
             <Grid className="demo-grid-1">
                {this.state.items.map(function(item, index) {
                    return <Cell col={4} key={item._id} >
                        <h3>{item.title}</h3>
                            <DataTable style={{width: '30%'}}
                                shadow={0}
                                
                                rows={[
                                    
                                    {booktitle: 'Book name goes here, need to adjust formatting width'}
                                      
                                      
                                
                                ]}
                            >
                                    
                                    
                                    
                                <TableHeader name="booktitle" tooltip="The Book' title">Book Title</TableHeader>
                                        
                                <button key={item._id} onClick={()=> {this.deleteSubmit(item._id)}}>Delete</button>
                            </DataTable>
                            {this.state.listItems.map(function(element, index) {
                                if (element.belongsTo == item._id)
                                return <div>{element.title}</div>
                            },this)}
                        </Cell>
                    }, this)}
             </Grid>
             </div>
        )
    }
    
}

export default Wishlist;