import React, { Component } from 'react';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleForm = this.handleForm.bind(this);
  }

  handleChange(evt) {
    const { value, id } = evt.target;

    this.setState({
      [id]: value,
    });
  }

  handleForm(evt) {
    evt.preventDefault();
    this.props.loginUser(this.state);
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleForm}>
          <h1>Login</h1>

          <label htmlFor={'username'}>Username</label>
          <input
            type={'text'}
            id={'username'}
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label htmlFor={'password'}>Password</label>
          <input
            type={'password'}
            id={'password'}
            value={this.state.password}
            onChange={this.handleChange}
          />

          <input type={'submit'} value={'LOGIN'} />
        </form>
      </div>
    );
  }
}

export default Login;
