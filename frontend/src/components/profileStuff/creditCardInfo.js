import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import moment from 'moment';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';
import { ButtonBW, ButtonBW3, ButtonRed3, TextfieldBW } from '../compStyles';

class CreditCardInfo extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			cardNumber: null,
			expirationDate: null,
			securityCode: null,
			name: null,
			edit: false,
			_id: null,
			newCard: true
		};
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'cardNumber' || name === 'securityCode') {
			const re = /^[0-9\b]+$/;
			if (value === '' || re.test(value)) {
				this.setState({ [name]: value });
			}
		} else {
			this.setState({ [name]: value });
		}
	};

	handleChangeDate = (e) => {
		const { value } = e.target;

		if (value.length <= 5) {
			this.setState({ expirationDate: value });
		}
	};

	handleEdit = () => {
		const { edit } = this.state;
		this.setState({ edit: !edit });
	};

	handleSave = async () => {
    const { _id, cardNumber, expirationDate, securityCode, name, newCard, edit } = this.state;
    const userId = localStorage.getItem('id');
    
    if(!cardNumber || !expirationDate || !securityCode || !name){
      alert('Fill out card fields');
      return;
    }

    const date = moment(expirationDate, 'MM-YY');

    if(!date.isValid()){
      alert('invalid date');
      return
    }

		if (!newCard) {
			const fields = { cardNumber, expirationDate, securityCode, name };
			await axios.put('http://localhost:5000/card', { _id, fields });
		} else {
			const fields = { cardNumber, expirationDate, securityCode, name, userId };
			await axios.post('http://localhost:5000/card', fields);
			this.setState({ newCard: false });
		}

		this.setState({ edit: !edit });
	};

	handleDelete = async () => {
		const { _id } = this.state;

		if (_id) {
			await axios.delete(`http://localhost:5000/card?_id=${_id}`);
		}

		this.props.update(this.props.ind);
	};

	componentDidMount() {
		const { data } = this.props;

		if (data._id) {
			this.setState(data);
			this.setState({ newCard: false });
		}
	}

	render() {
		const { edit, cardNumber, expirationDate, securityCode, name } = this.state;

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
					<CardText className="card-text">CardNumber</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChange}
						label=""
						disabled={!edit}
						value={cardNumber}
						name="cardNumber"
					/>
				</CardText>
				<CardText>
					<CardText className="card-text">Expiration Date</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChangeDate}
						label="Format: mm/yy"
						disabled={!edit}
						value={expirationDate}
						name="expirationDate"
					/>
				</CardText>
				<CardText>
					<CardText className="card-text">Security Code</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChange}
						label=""
						disabled={!edit}
						value={securityCode}
						name="securityCode"
					/>
				</CardText>
				<CardText>
					<CardText className="card-text">Cardholder Name</CardText>
					<TextfieldBW
						className="bw-text-field"
						onChange={this.handleChange}
						label=""
						disabled={!edit}
						value={name}
						name="name"
					/>
				</CardText>
			</div>
		);
	}
}

export default CreditCardInfo;
