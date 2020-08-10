import React, { Component } from 'react';

const Incrementor = ({ increment }) => <button onClick={increment}>+</button>;

const Decrementor = ({ decrement }) => <button onClick={decrement}>-</button>;

class Counter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      initialCount: 0,
    };

    this.increment = this.increment.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (
      state.count !== state.initialCount &&
      props.initialCount === state.initialCount
    ) {
      return {
        count: state.count,
      };
    }

    return {
      count: props.initialCount,
      initialCount: props.initialCount,
    };
  }

  increment() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  decrement = () => {
    this.setState((prevState) => ({ count: prevState.count - 1 }));
  };

  render() {
    const { count } = this.state;
    const { theme } = this.props;

    return (
      <div className={theme}>
        <span>{count}</span>
        <br />

        <Incrementor increment={this.increment} />
        <Decrementor decrement={this.decrement} />
      </div>
    );
  }

  componentDidMount() {
    console.log('Counter is ready');
  }
}
export { Incrementor, Decrementor };
export default Counter;
