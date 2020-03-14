import react, {Component} from "react"
import ShoppingCart from "./shoppingcart"

class ObjectManager extends Component
{
    constructor(){ 
        super();
        this.state =  {shopping_cart: null}
    }

    initCart = () =>
    {
        (this.state.shopping_cart == null) && this.setState ({shopping_cart : new ShoppingCart});
    }

    getCart = () =>
    {
        console.log("We made it to object manager");
        this.initCart();
        return this.state.shopping_cart;
    }

    updateCart = (newCart) =>
    {
        this.setState({shopping_cart: newCart});
    }
}

export default ObjectManager;