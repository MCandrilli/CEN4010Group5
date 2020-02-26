import React, { Component } from 'react';
import {DataTable, TableHeader} from 'react-mdl';

class Shoppingcart extends Component {
    render() {
         return(
            <div style={{width: '512px', margin: 'auto'}}>
             <h2>Shopping Cart!</h2>
            <DataTable
                shadow={0}
                rows={[
                    {booktitle: 'The Catcher in the Rye', quantity: 1, price: 9.99},
                    {booktitle: 'The Divine Comedy: Dante\'s Inferno', quantity: 2, price: 19.99},
                    {booktitle: 'The Great Gatsby', quantity: 1, price: 14.99},
                    {booktitle: 'One Hundred Years of Solitude', quantity: 1, price: 9.99},
                    {booktitle: 'The Art of War', quantity: 2, price: 19.99},
                    {booktitle: 'Hamlet', quantity: 1, price: 14.99}
                ]}
            >
                <TableHeader name="booktitle" tooltip="The Book' title">Book Title</TableHeader>
                <TableHeader numeric name="quantity" tooltip="Number of Books">Quantity</TableHeader>
                <TableHeader numeric name="price" cellFormatter={(price) => `\$${price.toFixed(2)}`} tooltip="Price per Book">Price</TableHeader>
            </DataTable>
            </div>
        )
    }
    
}

export default Shoppingcart;