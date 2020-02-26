import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LandingPage from './landingpage';
import About from './aboutus';
import Contact from './contact';
import Profile from './profile';
import Searchforbooks from './searchforbooks';
import Shoppingcart from './shoppingcart';
import Wishlist from './wishlist';
import BookDetails from './bookdetails';

const Main = () => {
    return (
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/aboutus" component={About} />
            <Route path="/contact" component={Contact} />
            <Route path="/profile" component={Profile} />
            <Route path="/searchforbooks" component={Searchforbooks} />
            <Route path="/shoppingcart" component={Shoppingcart} />
            <Route path="/wishlist" component={Wishlist} />
            <Route path="/bookdetails" component={BookDetails} />
            
        
        </Switch>
    )
    
}

export default Main;