import React, { Component } from 'react';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';
import axios from 'axios';
const SERVER_URL = 'http://localhost:5000'

class SignUp extends Component{
  constructor(props){
    super(props);

    this.state = {
      id: null,
      password: null,
      confirmPassword: null
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin = () => {
    const { history } = this.props;
    history.push('/login')
  }

  handleSignUp = async () => {
    const { id, password, confirmPassword } = this.state;
    const { history } = this.props;

    if(!id || !password || !confirmPassword){
      alert('please fill out forms');
      return;
    }

    else if(password !== confirmPassword){
      alert('passwords do not match');
      return;
    }
    
    try{
      await axios.post(SERVER_URL + '/user', { id, password });
      localStorage.setItem('id', id);
      history.push('/profile');
    } catch (e) {
      alert(e);
      return;
    }
  }

  render(){
    const { id, password, confirmPassword } = this.state;

    return(
      <div>
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Create Account</CardTitle>
          <CardText>
            <CardText>
              User ID
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                value={ id }
                name='id'
              />
          </CardText>
          <CardText>
            <CardText>
              Password
            </CardText>
              <Textfield
                onChange={this.handleChange}
                label=""
                style={{width: '200px', marginTop: '-10px', marginBottom: '-20px'}}
                value={ password }
                name='password'
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
              <Button raised colored onClick={ this.handleSignUp }>
                Create Account
              </Button>
              <Button raised onClick={ this.handleLogin } style={{ marginLeft: 20 }}>
                Already Have an Account
              </Button>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default SignUp;