import React, { Component, useState } from 'react';
import {DataTable, TableHeader, Textfield} from 'react-mdl';
import delete_logo from "./images/delete_bin.png"
import Tooltip from '@material-ui/core/Tooltip';
import {StyledCoverArt, StyledDeleteButton, StyledActionButton, StyledBookTitle,
    StyledShoppingCartTitle, StyledSFLTitle, StyledSubtotal} from "./ShoppingCart/shoppingCartStyles";
import {cart, save_for_later, img_url_prefix, addToCart, getSubtotal, saveForLater,
    removeFromCart, removeFromSFL, backToCart} from "./ShoppingCart/useShoppingCart";

class ShoppingCart extends Component
{
    constructor(){
        super();
        this.state = {
            delete_toggle_on: true,
            save_for_later_toggle_on: true
        }
    }

    handleClick = (id, action) =>
    {
        this.setState(prevState => ({delete_toggle_on: !prevState.delete_toggle_on}));
        (action === "delete_cart") ? removeFromCart(id) : 
        (action === "save_for_later") ? saveForLater(id) : 
        (action === "delete_SFL") ? removeFromSFL(id) : backToCart(id);
    }

    displayDeleteButton = (id, action) =>
    {
        return( 
            <Tooltip title="Delete">
                <StyledDeleteButton onClick={() => {this.handleClick(id, action)}}>
                    <img src={delete_logo} alt="delete logo" style={{height: "30px"}} />
                </StyledDeleteButton>
            </Tooltip>);
    }

    createCart = () => 
    {
        let items =  cart.map((book, index) => ({cover_art: <StyledCoverArt src = {img_url_prefix + book.img_link} alt = {book.title + " cover art"} />,
                     booktitle: <StyledBookTitle>{book.title}</StyledBookTitle>, quantity: book.quantity, price: "$" + book.price, 
                     delete: this.displayDeleteButton(book.id, "delete_cart"), 
                     save_for_later: <StyledActionButton onClick={() => this.handleClick(book.id, "save_for_later")}>Save For Later</StyledActionButton>}));
        let subtotal = {cover_art: "", booktitle: "", quantity: "", price: "", delete: getSubtotal(), save_for_later: <StyledSubtotal>Subtotal: </StyledSubtotal>};
        items.push(subtotal);

        return (
        <DataTable
            shadow={0}
            style={{width: '800px', fontSize: '16px'}}
            rows = {items}
        >
            <TableHeader name="cover_art" style={{color: "transparent"}}>Cover Art</TableHeader>
            <TableHeader name="booktitle" style={{fontSize: "16px", minWidth: "350px"}}>Book Title</TableHeader>
            <TableHeader numeric name="quantity" style={{fontSize: "16px"}}>Quantity</TableHeader>
            <TableHeader numeric name="price" style={{fontSize: "16px"}}>Price</TableHeader>
            <TableHeader name="save_for_later" style={{color: "transparent"}}>SFL</TableHeader>
            <TableHeader name="delete" style={{color: "transparent"}}>Delete</TableHeader>
        </DataTable>
        );
    }

    createSFL = () =>
    {
        return(
        <DataTable
            shadow={0}
            style={{width: '650px', fontSize: '16px'}}
            rows = {save_for_later.map((book, index) => ({cover_art: <StyledCoverArt src = {img_url_prefix + book.img_link} alt = {book.title + " cover art"} />,
            booktitle: <StyledBookTitle>{book.title}</StyledBookTitle>, price: book.price, 
            delete: this.displayDeleteButton(book.id, "delete_SFL"), 
            add_to_cart: <StyledActionButton onClick={() => this.handleClick(book.id, "back_to_cart")}>Add To Cart</StyledActionButton>}))}
        >
            <TableHeader name="cover_art" style={{color: "transparent"}}>Cover Art</TableHeader>
            <TableHeader name="booktitle" style={{fontSize: "16px", minWidth: "350px"}}>Book Title</TableHeader>
            <TableHeader numeric name="price" style={{fontSize: "16px"}}>Price</TableHeader>
            <TableHeader name="add_to_cart" style={{color: "transparent"}}>BTC</TableHeader>
            <TableHeader name="delete" style={{color: "transparent"}}>Delete</TableHeader>
        </DataTable>
        );
    }

    render() {
    return(
        <div style={{padding: '5px 350px'}}>
         <StyledShoppingCartTitle>Shopping Cart</StyledShoppingCartTitle>
        {(cart.length === 0) ? <p1 style={{fontSize: "20px"}}>Your cart is empty.</p1> : <this.createCart/>}
        {(save_for_later.length > 0) && <StyledSFLTitle>Save For Later</StyledSFLTitle>}
        {(save_for_later.length > 0) && <this.createSFL/>}
        </div>
    )}
}

export default ShoppingCart;
export {addToCart};