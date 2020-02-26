import React, { Component } from 'react';
import { DataTable, TableHeader, Grid, Cell} from 'react-mdl';


class Wishlist extends Component {
    render() {
         return(
             <div style={{width: '80%', margin: '5%'}}>
             <Grid className="demo-grid-1">
                     <Cell col={4}>
                        <h3> Wish List 1 </h3>
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
                        </Cell>

                        <Cell col={4}>
                        <h3> Wish List 2 </h3>
                            <DataTable
                                shadow={0}
                                rows={[
                                    {booktitle: 'The Odyssey', quantity: 1, price: 9.99},
                                    {booktitle: 'The Brothers Karamazov', quantity: 2, price: 19.99},
                                    {booktitle: 'Crime and Punishment', quantity: 1, price: 14.99},
                                ]}
                            >
                                <TableHeader name="booktitle" tooltip="The Book' title">Book Title</TableHeader>
                                <TableHeader numeric name="quantity" tooltip="Number of Books">Quantity</TableHeader>
                                <TableHeader numeric name="price" cellFormatter={(price) => `\$${price.toFixed(2)}`} tooltip="Price per Book">Price</TableHeader>
                            </DataTable>
                        </Cell>

                    <Cell col={4}>
                        <h3> Wish List 3 </h3>
                            <DataTable
                                shadow={0}
                                rows={[
                                    {booktitle: 'Madame Bovary', quantity: 1, price: 9.99},
                                    {booktitle: 'The Adventures of Huckleberry Finn', quantity: 2, price: 19.99},
                                    {booktitle: 'Alice\'s Adventures', quantity: 1, price: 14.99},
                                    {booktitle: 'Pride and Prejudicce', quantity: 1, price: 9.99},
                                    {booktitle: 'To the Lighthouse', quantity: 2, price: 19.99},
                                   
                                ]}
                            >
                                <TableHeader name="booktitle" tooltip="The Book' title">Book Title</TableHeader>
                                <TableHeader numeric name="quantity" tooltip="Number of Books">Quantity</TableHeader>
                                <TableHeader numeric name="price" cellFormatter={(price) => `\$${price.toFixed(2)}`} tooltip="Price per Book">Price</TableHeader>
                            </DataTable>
                        </Cell>
             </Grid>
             </div>
        )
    }
    
}

export default Wishlist;