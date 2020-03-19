import React from 'react';
import {StyledSubtotal} from "./shoppingCartStyles";

const cart = [];
const save_for_later = [];
const img_url_prefix = 'https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/';

/* Add a book to the shopping cart */
const addToCart = book =>
{   
    //if (book == null){return;}
    let duplicate = findBookInCartByIndex(book._id);           // Find index of possible duplicate
    if (duplicate === -1)        // No duplicate present
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
    return cart.findIndex(book => book.id === id);
}

const findBookInSFLByIndex = id =>
{
    return save_for_later.findIndex(book => book.id === id);
}

const saveForLater = id =>
{
    let index = findBookInCartByIndex(id);
    if (index !== -1)
    {
        save_for_later.push(cart[index]);
        cart.splice(index, 1);
    }
}

const removeFromCart = id =>
{
    let index = findBookInCartByIndex(id);
    if (index !== -1)
    {
        cart.splice(index, 1);
    }
}

const removeFromSFL = id =>
{
    let index = findBookInSFLByIndex(id);
    if (index !== -1)
    {
        save_for_later.splice(index, 1);
    }
}

const backToCart = id =>
{
    let sfl_index = findBookInSFLByIndex(id);
    if (sfl_index !== -1)
    {
        let newBook = save_for_later[sfl_index];
        newBook.quantity = 1;
        save_for_later.splice(sfl_index, 1);

        let cart_index = findBookInCartByIndex(id);
        (cart_index !== -1) ? cart[cart_index].quantity++ : cart.push(newBook);  
    }
}

export {cart, save_for_later, img_url_prefix, addToCart, getSubtotal, saveForLater,
        removeFromCart, removeFromSFL, backToCart};