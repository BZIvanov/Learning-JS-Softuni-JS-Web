import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getPeople } from './services/star-wars-service';

class StarWarsPeopleList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
      isLoading: true,
    };
  }

  render() {
    const { people, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading ...</div>
    }

    return (
      <ul>
        {people.map(person => <li>{person.name}</li> )}
      </ul>
    );
  }

  componentDidMount() {
    getPeople()
      .then((people) => {
        this.setState({ people, isLoading: false });
      });
  }
}

ReactDOM.render(<StarWarsPeopleList />, document.getElementById('root'));
