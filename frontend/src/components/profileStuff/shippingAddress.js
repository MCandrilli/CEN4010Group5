import React, { Component } from 'react';
import axios from 'axios';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';

const SERVER_URL = 'http://localhost:5000';

class ShippingAddress extends Component{
  constructor(props){
    super(props);

    this.state = {
      newAddress: true,
      _id: null,
      street: null,
      city: null,
      state: null,
      country: null,
      edit: false
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    console.log(value)
    this.setState({ [name]: value });
  }

  handleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit});
  }

  componentDidMount(){
    const { data } = this.props;

    if(data._id){
      this.setState(data);
      this.setState({ newAddress: false });
    }
  }

  handleSave = async () => {
    const { _id, street, city, state, country, newAddress, edit } = this.state;
    console.log(this.state);

    if(!newAddress){
      const fields = { street, city, state, country };
      await axios.put(SERVER_URL + '/address', { _id, fields });
    }

    else{
      const fields = { _id, street, city, state, country, userId: 'john123' };
      await axios.post(SERVER_URL + '/address', fields);
      this.setState({ newAddress: false });
    }

    this.setState({ edit: !edit });
  }

  handleDelete = async () => {
    const { _id } = this.state;

    if(_id){
      await axios.delete(`${SERVER_URL}/address?_id=${_id}`);
    }

    this.props.update(this.props.ind);
  }

  render(){
    const { street, city, country, state, edit } = this.state;

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
            Street
          </CardText>
            <Textfield
              onChange={this.handleChange}
              label=''
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ street }
              name='street'
            />
        </CardText>
        <CardText>
          <CardText>
            Country
          </CardText>
          <Textfield
              onChange={this.handleChange}
              label='Format: mm/yy'
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ country }
              name='country'
            />
        </CardText>
        <CardText>
          <CardText>
            City
          </CardText>
            <Textfield
              onChange={this.handleChange}
              label=''
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ city }
              name='city'
            />
        </CardText>
        <CardText>
          <CardText>
             State
          </CardText>
            <Textfield
              onChange={this.handleChange}
              label=''
              style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
              disabled={ !edit }
              value={ state }
              name='state'
            />
        </CardText>
      </div>
    )
  }
}

export default ShippingAddress;