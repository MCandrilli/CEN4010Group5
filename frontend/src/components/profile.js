import React, { Component } from 'react';
import axios from 'axios';
import CreditCardInfo from './profileStuff/creditCardInfo';
import ShippingAddressInfo from './profileStuff/shippingAddress';

import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';

const SERVER_URL = 'http://localhost:5000';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: null,
      _id: null,
      passwordDisplay: null,
      confirmPassword: null,
      firstName: null,
      lastName: null,
      nickname: null,
      homeAddress: null,
      creditCards: null,
      shippingAddresses: null,
      emailAddresses: null,
      edit: false,
    }
  }

  async componentDidMount(){
    const { history } = this.props;
    const id = localStorage.getItem('id');

    if(!id){
      history.push('/login');
    }

    const { data: profileData }  = await axios.get(SERVER_URL + `/user?id=${ id }`);
    const { data: creditCardData } = await axios.get(SERVER_URL + `/card?id=${ id }`)
    const { data: shippingAddressData } = await axios.get(SERVER_URL + `/address?id=${ id }`);
    const profileInfo = profileData.data;
    const creditCardInfo = creditCardData.data;
    const shippingAddressInfo = shippingAddressData.data;

    let cardInd = 0;
    let cardArr = [];

    creditCardInfo.forEach(card => {
      cardArr.push({ ind: cardInd, card });
      cardInd++;
    });

    let shippingInd = 0;
    let shippingArr = [];

    shippingAddressInfo.forEach(address => {
      shippingArr.push({ ind: shippingInd, address });
      shippingInd++;
    });

    this.setState(profileInfo);
    this.setState({ creditCards: cardArr });
    this.setState({ shippingAddresses: shippingArr });
  }

  handleEdit = () => {
    const { edit } = this.state;
    this.setState({ edit: !edit });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSaveProfile = async () => {
    const { firstName, lastName, password, nickname, id, homeAddress, edit } = this.state;
    const fields = { firstName, lastName, nickname, id, homeAddress };

    await axios.put(SERVER_URL + '/user', { id, fields });
    this.setState({ edit: !edit });
  }

  handleChangePassword = async () => {
    const { passwordDisplay: password, confirmPassword, _id } = this.state;

    if(!password || !confirmPassword){
      alert('Please complete password forms');
      return;
    }

    if(password !== confirmPassword){
      alert('Passwords do not match');
      return;
    }

    await axios.put(SERVER_URL + '/user/password', { password, _id });
    alert('Password Updated')
    this.setState({ passwordDisplay: null, confirmPassword: null });
  }

  handlePressCreditCard = () => {
    const { creditCards } = this.state;
    let len = creditCards.length;
    creditCards.push({card: {}, ind: len});
    this.setState({ creditCards });
  }

  handlePressShippingAddress = () => {
    const { shippingAddresses } = this.state;
    let len = shippingAddresses.length;
    shippingAddresses.push({address: {}, ind: len});
    this.setState({ shippingAddresses });
  }

  handleDeleteCard = (ind) => {
    const { creditCards } = this.state;

    let copy = creditCards.slice();
    copy.splice(ind, 1);
    let newInd = -1;
    const arr = [];

    copy.forEach(creditCard => {
      newInd++;
      let { card } = creditCard;
      arr.push({ card, ind: newInd });
    });

    this.setState({ creditCards: arr });
  }

  handleDeleteAddress = (ind) => {
    const { shippingAddresses } = this.state;

    let copy = shippingAddresses.slice();
    copy.splice(ind, 1);
    let newInd = -1;
    const arr = [];

    copy.forEach(shippingAddress => {
      newInd++;
      let { address } = shippingAddress;
      arr.push({ address, ind: newInd });
    });

    this.setState({ shippingAddresses: arr });
  }

  handleSignOut = () => {
    const { history } = this.props;
    localStorage.clear();
    history.push('/login');
  }

  render() {
    const { edit, id, passwordDisplay, confirmPassword, homeAddress, firstName, lastName, nickname, creditCards, shippingAddresses } = this.state;
    return(
      id && creditCards && shippingAddresses ? 
      <div >
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>My Profile</CardTitle>
          <CardText>
              <Button raised onClick={ this.handleEdit }>
                Edit
              </Button>
              <Button raised colored disabled={ !edit } onClick={ this.handleSaveProfile } style={{ marginLeft: 20 }}>
                Save Changes
              </Button>
              <Button raised accent onClick={ this.handleSignOut } style={{ marginLeft: 20 }}>
                Sign Out
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
                name='nickname'
              />
          </CardText>
        </Card>
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Change Password</CardTitle>
          <CardText>
            <CardText>
              New Password
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                value={ passwordDisplay }
                name='passwordDisplay'
                type='password'
              />
          </CardText>
          <CardText>
            <CardText>
              Confirm Password
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                value={ confirmPassword }
                name='confirmPassword'
                type='password'
              />
          </CardText>
          <CardText>
              <Button raised colored onClick={ this.handleChangePassword }>
                Save Password
              </Button>
          </CardText>
        </Card>
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Credit Cards</CardTitle>
          { creditCards.map(card => {
            const { ind, card:cardInfo } = card;
            return(
            <CardText>
              <CreditCardInfo data={ cardInfo } ind={ ind } update={ this.handleDeleteCard }/>
            </CardText>)
          }) }
          <CardText>
            <FABButton mini onClick={ this.handlePressCreditCard }>
              <Icon name="add" />
            </FABButton>
          </CardText>
        </Card>
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Shipping Addresses</CardTitle>
          { shippingAddresses.map(address => {
            const { ind, address:addressInfo } = address;
            return(
            <CardText>
              <ShippingAddressInfo data={ addressInfo } ind={ ind } update={ this.handleDeleteAddress }/>
            </CardText>)
          }) }
          <CardText>
            <FABButton mini onClick={ this.handlePressShippingAddress }>
              <Icon name="add" />
            </FABButton>
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