import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';

class CreditCardInfo extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      cardNumber: null,
      expirationDate: null,
      securityCode: null,
      name: null,
      edit: false,
      _id: null,
      newCard: true
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    if(name === 'cardNumber' || name === 'securityCode'){
      const re = /^[0-9\b]+$/;
      if(value === '' || re.test(value)){
        this.setState({ [name]: value })
      }
    } 
    else{
      this.setState({ [name]: value });
    }
  }

  handleChangeDate = e => {
    const { value } = e.target;

    if(value.length <= 5){
      this.setState({ expirationDate: value });
    }
  };

  handleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit});
  }

  handleSave = async () => {
    const { _id, cardNumber, expirationDate, securityCode, name, newCard, edit } = this.state;

    try{
      const [day, month] = expirationDate.split('/');
      console.log(day)
      console.log(month);
      if(typeof(day) !== 'number' || typeof(month) !=='number'){
        throw new Error();
      }

      if(day > 31 || day < 1){
        throw new Error();
      }
      
    } catch(e) {
      alert('Please enter a valid date')
    }
    
    if(!newCard){
      const fields = { cardNumber, expirationDate, securityCode, name };
      await axios.put('http://localhost:5000/card', { _id, fields });
    }

    else{
      const fields = { cardNumber, expirationDate, securityCode, name, userId: 'john123' };
      await axios.post('http://localhost:5000/card', fields);
      this.setState({ newCard: false })
    }

    this.setState({ edit: !edit })
  }

  handleDelete = async () => {
    const { _id } = this.state;

    if(_id){
      await axios.delete(`http://localhost:5000/card?_id=${_id}`);
    }

    this.props.update(this.props.ind);
  }

  componentDidMount(){
    const { data } = this.props;

    if(data._id){
      this.setState(data);
      this.setState({ newCard: false });
    }
  }

  render(){
    const { edit, cardNumber, expirationDate, securityCode, name } = this.state;

    return(
      <div>
        <Button raised onClick={ this.handleEdit }>
          Edit
        </Button>
        <Button raised colored disabled={ !edit } onClick={ this.handleSave } style={{ marginLeft: 20 }}>
          Save Changes
        </Button>
        <Button raised accent disabled={ !edit } onClick={ this.handleDelete } style={{ marginLeft: 20 }}>
          Delete
        </Button>
        <CardText>
          <CardText>
            CardNumber
          </CardText>
            <Textfield
              onChange={this.handleChange}
              label=''
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ cardNumber }
              name='cardNumber'
            />
        </CardText>
        <CardText>
          <CardText>
            ExpirationDate
          </CardText>
          <Textfield
              onChange={this.handleChangeDate}
              label='Format: mm/yy'
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ expirationDate }
              name='expirationDate'
            />
        </CardText>
        <CardText>
          <CardText>
            Security Code
          </CardText>
            <Textfield
              onChange={this.handleChange}
              label=''
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ securityCode }
              name='securityCode'
            />
        </CardText>
        <CardText>
          <CardText>
            Cardholder Name
          </CardText>
            <Textfield
              onChange={this.handleChange}
              label=''
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ name }
              name='name'
            />
        </CardText>
      </div>
    )
  }
}

export default CreditCardInfo;