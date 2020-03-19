import React, { Component, useState } from 'react';
import {DataTable, TableHeader, Textfield} from 'react-mdl';
import styled from "styled-components";
import delete_logo from "./images/delete_bin.png"
import Tooltip from '@material-ui/core/Tooltip';

const StyledDiv = styled.div`
    margin-left: 400px;`;

const StyledCoverArt = styled.img`
    height: 150px;`;

const StyledDeleteButton = styled.button`
    background: transparent;
    border: none;`;

const StyledActionButton = styled.button`
    background: transparent;
    border-color: blue;
    border-width: thin;
    color: blue;
    text-decoration: underline;`;

const StyledBookTite = styled.text`
    white-space: normal;`;

const StyledShoppingCartTitle = styled.h3`
    font-variant: all-petite-caps;
    text-decoration: overline;
    color: dimgrey;
    font-size: 40px;
    font-weight: lighter;
    padding-top: 10px;`;

const StyledSFLTitle = styled.h3`
    font-variant: all-petite-caps;
    text-decoration: overline;
    color: dimgrey;
    font-size: 28px;
    font-weight: lighter;`;

const StyledSubtotal = styled.p`
    color: rgba(0, 0, 0, 0.54);
    font-size: 20px;
    text-transform: uppercase;
    margin: unset;`;

const cart = [];
const save_for_later = [];
const img_url_prefix = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/';

/* Add a book to the shopping cart */
const addToCart = book =>
{   
    //if (book == null){return;}
    let duplicate = findBookInCartByIndex(book._id);           // Find index of possible duplicate
    if (duplicate == -1)        // No duplicate present
    {
        cart.push({id: book._id, img_link: book.imageLink, title: book.title, quantity: 1, price: book.price});
    }
    else                        // Duplicate present
    {
        cart[duplicate].quantity++;
    }
    console.log(cart);
}

/* Calculate and update cart's subtotal */
const getSubtotal = () =>     
{
    let newTotal = 0;
    for (const [index, book] of cart.entries())
    {
        newTotal += (book.price * book.quantity);
    }
    return <StyledSubtotal>${newTotal.toFixed(2)}</StyledSubtotal>;
}

/* 
    Find book in cart by book id and return the book's index if the id is found.
    Otherwise, return -1
*/
const findBookInCartByIndex = id =>
{
    return cart.findIndex(book => book.id == id);
}

const findBookInSFLByIndex = id =>
{
    return save_for_later.findIndex(book => book.id == id);
}

const saveForLater = id =>
{
    let index = findBookInCartByIndex(id);
    if (index != -1)
    {
        save_for_later.push(cart[index]);
        cart.splice(index, 1);
    }
}

const removeFromCart = id =>
{
    let index = findBookInCartByIndex(id);
    if (index != -1)
    {
        cart.splice(index, 1);
    }
}

const removeFromSFL = id =>
{
    let index = findBookInSFLByIndex(id);
    if (index != -1)
    {
        save_for_later.splice(index, 1);
    }
}

const backToCart = id =>
{
    let sfl_index = findBookInSFLByIndex(id);
    if (sfl_index != -1)
    {
        let newBook = save_for_later[sfl_index];
        newBook.quantity = 1;
        save_for_later.splice(sfl_index, 1);

        let cart_index = findBookInCartByIndex(id);
        (cart_index != -1) ? cart[cart_index].quantity++ : cart.push(newBook);  
    }
}

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
        (action == "delete_cart") ? removeFromCart(id) : 
        (action == "save_for_later") ? saveForLater(id) : 
        (action == "delete_SFL") ? removeFromSFL(id) : backToCart(id);
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
                     booktitle: <StyledBookTite>{book.title}</StyledBookTite>, quantity: book.quantity, price: "$" + book.price, 
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
            booktitle: <StyledBookTite>{book.title}</StyledBookTite>, price: book.price, 
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
        {(cart.length == 0) ? <p1 style={{fontSize: "20px"}}>Your cart is empty.</p1> : <this.createCart/>}
        {(save_for_later.length > 0) && <StyledSFLTitle>Save For Later</StyledSFLTitle>}
        {(save_for_later.length > 0) && <this.createSFL/>}
        </div>
    )}
}

export default ShoppingCart;
export {addToCart};