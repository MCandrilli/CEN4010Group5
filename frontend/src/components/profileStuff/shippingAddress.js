import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';
import { ButtonBW, ButtonBW3, ButtonRed3, TextfieldBW } from '../compStyles';

const SERVER_URL = 'http://localhost:5000';

class ShippingAddress extends Component {
	constructor(props) {
		super(props);

		this.state = {
			newAddress: true,
			_id: null,
			street: null,
			city: null,
			state: null,
			country: null,
			edit: false
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	handleEdit = () => {
		const { edit } = this.state;
		this.setState({ edit: !edit });
	};

	componentDidMount() {
		const { data } = this.props;

		if (data._id) {
			this.setState(data);
			this.setState({ newAddress: false });
		}
	}

	handleSave = async () => {
    const { _id, street, city, state, country, newAddress, edit } = this.state;
    const userId = localStorage.getItem('id');
    
    if(!street || !city || !state || !country){
      alert('Please fill out address fields');
      return;
    }

		if (!newAddress) {
			const fields = { street, city, state, country };
			await axios.put(SERVER_URL + '/address', { _id, fields });
		} else {
			const fields = { _id, street, city, state, country, userId };
			await axios.post(SERVER_URL + '/address', fields);
			this.setState({ newAddress: false });
		}

		this.setState({ edit: !edit });
	};

	handleDelete = async () => {
		const { _id } = this.state;

		if (_id) {
			await axios.delete(`${SERVER_URL}/address?_id=${_id}`);
		}

		this.props.update(this.props.ind);
	};

	render() {
		const { street, city, country, state, edit } = this.state;

		return (
			<div>
				<ButtonBW onClick={this.handleEdit}>Edit</ButtonBW>
				<ButtonBW3 disabled={!edit} onClick={this.handleSave} style={{ marginLeft: 20 }}>
					Save Changes
				</ButtonBW3>
				<ButtonRed3 disabled={!edit} onClick={this.handleDelete} style={{ marginLeft: 20 }}>
					Delete
				</ButtonRed3>
				<CardText>
					<CardText className="card-text">Street</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChange}
						label=""
						disabled={!edit}
						value={street}
						name="street"
					/>
				</CardText>
				<CardText>
					<CardText className="card-text">Country</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChange}
						label=""
						disabled={!edit}
						value={country}
						name="country"
					/>
				</CardText>
				<CardText>
					<CardText className="card-text">City</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChange}
						label=""
						disabled={!edit}
						value={city}
						name="city"
					/>
				</CardText>
				<CardText>
					<CardText className="card-text">State</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChange}
						label=""
						disabled={!edit}
						value={state}
						name="state"
					/>
				</CardText>
			</div>
		);
	}
}

export default ShippingAddress;
