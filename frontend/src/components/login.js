import React, { Component } from 'react';
import { Card, CardText, CardTitle, Button, Textfield, FABButton, Icon } from 'react-mdl';
import axios from 'axios';
const SERVER_URL = 'http://localhost:5000'

class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      id: null,
      password: null
    }
  }

  componentDidMount(){
    const { history } = this.props;
    const id = localStorage.getItem('id');

    if(id){
      history.push('/profile');
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  handleLogin = async () => {
    const { id, password } = this.state;
    const { history } = this.props;

    if(!id || !password){
      alert('please fill out information');
      return;
    }

    try{
      const success = await axios.post(SERVER_URL + '/user/login', { id, password });
      localStorage.setItem('id', id);
      history.push('/profile');
    } catch (e) {
      alert(e);
      return;
    }
  }

  handleSignUp = () => {
    const { history } = this.props;
    history.push('/signup');
  }

  render(){
    const { id, password } = this.state;

    return(
      <div>
        <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
          <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>Login</CardTitle>
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
              <Button raised colored onClick={ this.handleLogin }>
                Login
              </Button>
              <Button raised onClick={ this.handleSignUp } style={{ marginLeft: 20 }}>
                New Account
              </Button>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Login;