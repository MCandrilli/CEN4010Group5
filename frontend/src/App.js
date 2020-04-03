import React from 'react';
import Main from './components/main';
import './App.css';
import { Layout, Header, Navigation, Content } from 'react-mdl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledTitle = styled(Link)`
font-size: 32px;
font-variant: petite-caps;
font-family: monospace;
text-decoration: overline;
padding-top: 15px;
padding-left: 10px;
color: #fff;
&:hover{
	text-decoration: overline;
	color: #fff;
}`;

const StyledPageTitle = styled(Link)`
color: darkslategrey;    
font-size: 28px;
font-variant: all-petite-caps;
font-family: monospace;`;

function App() {
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
}

export default App;
