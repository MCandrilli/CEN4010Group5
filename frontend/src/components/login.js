import React, { Component } from 'react';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';
import { CardBW2, ButtonBW, TextfieldBW } from './compStyles';
import axios from 'axios';
const SERVER_URL = 'http://localhost:5000';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			password: null
		};
	}

	componentDidMount() {
		const { history } = this.props;
		const id = localStorage.getItem('id');

		if (id) {
			history.push('/profile');
		}
	}

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	handleLogin = async () => {
		const { id, password } = this.state;
		const { history } = this.props;

		if (!id || !password) {
			alert('please fill out information');
			return;
		}

		try {
			const success = await axios.post(SERVER_URL + '/user/login', { id, password });
			localStorage.setItem('id', id);
			history.push('/profile');
		} catch (e) {
			alert(e);
			return;
		}
	};

	handleSignUp = () => {
		const { history } = this.props;
		history.push('/signup');
	};

	render() {
		const { id, password } = this.state;

		return (
			<div>
				<CardBW2
					shadow={0}
					style={{
						width: '512px',
						margin: 'auto'
					}}
				>
					<CardTitle className="card-title">Login</CardTitle>
					<CardText>
						<CardText className="card-text">User ID</CardText>
						<TextfieldBW onChange={this.handleChange} label="" value={id} name="id" />
					</CardText>
					<CardText>
						<CardText className="card-text">Password</CardText>
						<TextfieldBW
							onChange={this.handleChange}
							label=""
							value={password}
							name="password"
							type="password"
						/>
					</CardText>
					<CardText>
						<ButtonBW onClick={this.handleLogin}>Login</ButtonBW>
						<ButtonBW onClick={this.handleSignUp} style={{ marginLeft: 20 }}>
							New Account
						</ButtonBW>
					</CardText>
				</CardBW2>
			</div>
		);
	}
}

export default Login;
