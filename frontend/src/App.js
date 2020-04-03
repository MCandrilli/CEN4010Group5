import React from 'react';
import Main from './components/main';
import './App.css';
import { Layout, Header, Navigation, Content } from 'react-mdl';
import { Link } from 'react-router-dom';

function App() {
	return (
		<div className="demo-big-content">
			<Layout>
				<Header
					title={
						<Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
							GeekText
						</Link>
					}
					scroll
				>
					<Navigation>
						<Link to="/">Home</Link>
						<Link to="/shoppingcart">Shopping Cart</Link>
						<Link to="/wishlist">My Wish List</Link>
						<Link to="/profile">My Profile</Link>
						<Link to="/login">login</Link>
					</Navigation>
				</Header>
				<Content>
					<div className="page-content" />
					<Main />
				</Content>
			</Layout>
		</div>
	);
}

export default App;
