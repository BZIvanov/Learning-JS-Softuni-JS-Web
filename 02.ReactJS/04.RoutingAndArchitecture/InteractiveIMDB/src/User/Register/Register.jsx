import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      username: '',
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
    this.props.registerUser(this.state);
  }

  render() {
    return (
      <div className="Register">
        <form onSubmit={this.handleForm}>
          <h1>Register</h1>

          <label htmlFor={'email'}>Email</label>
          <input
            type={'text'}
            id={'email'}
            value={this.state.email}
            onChange={this.handleChange}
          />

          <label htmlFor={'username'}>Username</label>
          <input
            type={'text'}
            id={'username'}
            value={this.state.username}
            onChange={this.handleChange}
          />

          <label htmlFor={'password'}>Password</label>
          <input
            type={'password'}
            id={'password'}
            value={this.state.password}
            onChange={this.handleChange}
          />

          <input type={'submit'} value={'REGISTER'} />
        </form>
      </div>
    );
  }
}

export default Register;
