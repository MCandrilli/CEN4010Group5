import React, { Component } from 'react';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';
import { CardBW2, ButtonBW, TextfieldBW } from './compStyles';
import axios from 'axios';
const SERVER_URL = 'http://localhost:5000';

class SignUp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			password: null,
			confirmPassword: null
		};
	}

	handleChange = (e) => {
		const { value, name } = e.target;
		this.setState({ [name]: value });
	};

	handleLogin = () => {
		const { history } = this.props;
		history.push('/login');
	};

	handleSignUp = async () => {
		const { id, password, confirmPassword } = this.state;
		const { history } = this.props;

		if (!id || !password || !confirmPassword) {
			alert('please fill out forms');
			return;
		} else if (password !== confirmPassword) {
			alert('passwords do not match');
			return;
		}

		try {
			await axios.post(SERVER_URL + '/user', { id, password });
			localStorage.setItem('id', id);
			history.push('/profile');
		} catch (e) {
			alert(e);
			return;
		}
	};

	render() {
		const { id, password, confirmPassword } = this.state;

		return (
			<div>
				<CardBW2 shadow={0} style={{ width: '512px', margin: 'auto' }}>
					<CardTitle className="card-title">Create Account</CardTitle>
					<CardText>
						<CardText className="card-text">User ID</CardText>
						<TextfieldBW onChange={this.handleChange} label="" value={id} name="id" />
					</CardText>
					<CardText>
						<CardText className="card-text">Password</CardText>
						<TextfieldBW
							className="bw-text-field"
							onChange={this.handleChange}
							label=""
							value={password}
							name="password"
							type="password"
						/>
					</CardText>
					<CardText>
						<CardText className="card-text">Confirm Password</CardText>
						<TextfieldBW
							className="bw-text-field"
							onChange={this.handleChange}
							label=""
							value={confirmPassword}
							name="confirmPassword"
							type="password"
						/>
					</CardText>
					<CardText>
						<ButtonBW onClick={this.handleSignUp}>Create Account</ButtonBW>
						<ButtonBW onClick={this.handleLogin} style={{ marginLeft: 20 }}>
							Already Have an Account
						</ButtonBW>
					</CardText>
				</CardBW2>
			</div>
		);
	}
}

export default SignUp;
