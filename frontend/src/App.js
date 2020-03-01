import React from 'react';
import Main from './components/main';
import './App.css';
import { Layout, Header, Navigation, Drawer, Content, Textfield} from 'react-mdl';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="demo-big-content">
    <Layout>
        <Header title="GeekText" scroll>
                <Navigation>
                 <Textfield
                value=""
                onChange={() => {}}
                label="Search"
                expandable
                expandableIcon="search"
                    />
                    <Link to="/">Home</Link>
                    <Link to="/shoppingcart">Shopping Cart</Link>
                    <Link to="/wishlist">My Wish List</Link>
                    <Link to="/profile">My Profile</Link>
            </Navigation>
        </Header>
            <Drawer title="Main Menu">
                <Navigation>
                    <Link to="/searchforbooks">Search for books</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contact">Contact Us</Link>
            </Navigation>
        </Drawer>
        <Content>
            <div className="page-content" />
                <Main/>
        </Content>
    </Layout>
</div>
  );
}

export default App;
