import React, { Component } from 'react';

class BindingForm extends Component {
  handleChange(e) {
    console.log(`${e.target.name} => ${e.target.value}`);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    return (
      <form onSubmit={(e) => this.props.onSubmit(e, this.state)}>
        {React.Children.map(this.props.children, (child) => {
          // this if is to avoid cloning elements which are not input element
          if (child.type === 'input') {
            return React.cloneElement(child, {
              onChange: this.handleChange.bind(this),
              ...child.props,
            });
          }
          return child;
        })}

        <input type='submit' value='Register' />
      </form>
    );
  }
}

export default BindingForm;
