import React from 'react';
import ReactDOM from 'react-dom';

const camelCased = (myString) =>
  myString.replace(/-([a-z])/g, (g) => g[1].toUpperCase());

class RegistrationForm extends React.Component {
  state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    errorMessages: [],
  };

  handleRegister = (event) => {
    event.preventDefault();
    console.dir(this.state);
  };

  handleFormElementChange = (event) => {
    const { value, id } = event.target;
    const parsedId = camelCased(id);

    this.setState({
      [parsedId]: value,
    });
  };

  checkValidity = (event) => {
    const { target } = event;

    if (!target.checkValidity()) {
      this.setState(({ errorMessages }) => ({
        errorMessages: [...errorMessages, target.validationMessage],
      }));
    }
  };

  render() {
    const { email, firstName, lastName, password, errorMessages } = this.state;

    return (
      <form onSubmit={this.handleRegister}>
        {errorMessages.length ? (
          <ul>
            {errorMessages.map((message) => (
              <li>{message}</li>
            ))}
          </ul>
        ) : null}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={this.handleFormElementChange}
          onBlur={this.checkValidity}
          required
        />
        <br />

        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          name="firstName"
          id="first-name"
          value={firstName}
          onChange={this.handleFormElementChange}
          pattern="[A-Za-z]{1,32}"
          required
        />
        <br />

        <label htmlFor="first-name">Last Name:</label>
        <input
          type="text"
          name="lastName"
          id="last-name"
          pattern="[A-Za-z]{1,32}"
          value={lastName}
          onChange={this.handleFormElementChange}
          required
        />
        <br />

        <label htmlFor="first-name">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength="6"
          value={password}
          onChange={this.handleFormElementChange}
          required
        />
        <br />

        <button type="submit">Register</button>
      </form>
    );
  }
}

ReactDOM.render(<RegistrationForm />, document.getElementById('root'));
