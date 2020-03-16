import React, { Component } from 'react';
import axios from 'axios';
import {List, ListItem, ListItemContent, ListItemAction, Icon} from 'react-mdl';
import {Card, CardActions, CardMenu, CardText, CardTitle, Button, IconButton, Textfield} from 'react-mdl';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      password: null,
      firstName: null,
      lastName: null,
      nickname: null,
      homeAddress: null,
      nickname: null,
      creditCards: null,
      shippingAddresses: null,
      emailAddresses: null,
      edit: false
    }
  }

  async componentDidMount(){
    const { data }  = await axios.get('http://localhost:5000/user?id=john123');
    const userInfo = data.data;
    console.log(userInfo);
    this.setState(userInfo);
  }

  handleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  render() {
    const { edit, id, password, homeAddress, firstName, lastName, nickname } = this.state;
    return(
      id ? 
      <div >
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>My Profile</CardTitle>
          <CardText>
              <Button raised onClick={ this.handleEdit }>
                Edit
              </Button>
              <Button raised colored disabled={ !edit } onClick={ this.handleEdit } style={{ marginLeft: 20 }}>
                Save Changes
              </Button>
          </CardText>
          <CardText>
            <CardText>
              id
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=''
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                disabled={ !edit }
                value={ id }
                name='id'
              />
          </CardText>
          <CardText>
            <CardText>
              password
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                disabled={ !edit }
                value={ password }
                name='password'
              />
          </CardText>
          <CardText>
            <CardText>
              Home Address
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                disabled={ !edit }
                value={ homeAddress }
                name='homeAddress'
              />
          </CardText>
          <CardText>
            <CardText>
              First Name
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                disabled={ !edit }
                value={ firstName }
                name='firstName'
              />
          </CardText>
          <CardText>
            <CardText>
              Last Name
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                disabled={ !edit }
                value={ lastName }
                name='lastName'
              />
          </CardText>
          <CardText>
            <CardText>
              Nickname
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                disabled={ !edit }
                value={ nickname }
                name='nickName'
              />
          </CardText>
        </Card>
      </div>
      :
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
}
export default Profile;