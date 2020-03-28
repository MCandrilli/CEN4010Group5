import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import About from './aboutus';
import Contact from './contact';
import Profile from './profile';
import Login from './login';
import SignUp from './signup';
import Searchforbooks from './searchforbooks';
import Shoppingcart from './shoppingcart';
import Wishlist from './wishlist';
import BookDetails from './bookdetails';
import customerReview from './customerReview';
import bookByAuthor from './bookByAuthor';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/aboutus" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/searchforbooks" component={Searchforbooks} />
            <Route path="/shoppingcart" component={Shoppingcart} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/bookdetails" component={BookDetails} />
            <Route path="/customerReview" component={customerReview} />
            <Route path="/bookByAuthor" component={bookByAuthor} />
            
        </Switch>
    )
    
}

export default Main;