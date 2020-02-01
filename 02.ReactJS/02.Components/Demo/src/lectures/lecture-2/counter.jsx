import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    const { identifier } = this.props;

    this.state = {
      count: Number(window.localStorage.getItem(`${identifier}-count`)) || 0,
    };

    this.updateCounter = this.updateCounter.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
  }

  updateCounter() {
    const { identifier } = this.props;
    const oldCount = this.state.count;

    this.setState({
      count: oldCount + 1,
    }, () => {
      const updatedCount = this.state.count;
      
      window.localStorage.setItem(`${identifier}-count`, `${updatedCount}`);
    });
  };

  resetCounter() {
    this.setState({
      count: 0
    });
  }

  render() {
    const { count } = this.state;

    return (
      <div>
        <span>{count}</span>
        <br />
        <button onClick={this.updateCounter}>+</button>
        <button onClick={this.resetCounter}>Reset</button>
      </div>
    );
  }
}

export default Counter;