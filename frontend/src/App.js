import React from 'react';
import Main from './components/main';
import './App.css';
import { Layout, Header, Navigation, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import { getCartLength } from './components/ShoppingCart/shoppingCartStorage';
import { StyledTitle, StyledPageTitle } from './components/compStyles';

const App = () => {
	return (
		<div className="demo-big-content">
			<Layout>
				<Header
					title={<StyledTitle to="/">GeekText</StyledTitle>}
					scroll
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
				>
					<Navigation>
						<StyledPageTitle to="/">Home</StyledPageTitle>
						<StyledPageTitle to="/shoppingcart">Shopping Cart</StyledPageTitle>
						<StyledPageTitle to="/wishlist">My Wish List</StyledPageTitle>
						<StyledPageTitle to="/profile">My Profile</StyledPageTitle>
						<StyledPageTitle to="/login">login</StyledPageTitle>
					</Navigation>
				</Header>
				<Content>
					<div className="page-content" />
					<Main />
				</Content>
			</Layout>
		</div>
	);
};

export default App;
