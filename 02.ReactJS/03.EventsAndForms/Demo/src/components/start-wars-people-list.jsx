import React from 'react';
import isEqual from 'react-fast-compare';

class StarWarsPeopleList extends React.Component {
  state = {
    people: [],
    isLoading: true,
    error: false,
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //     const haveNextPropsChanged = (
  //         JSON.stringify(nextProps) !== JSON.stringify(this.props) ||
  //         Object.keys(nextProps).length !== Object.keys(this.props).length
  //     );

  //     const hasNextStateChanged = JSON.stringify(nextState) !== JSON.stringify(this.state);

  //     return (haveNextPropsChanged || hasNextStateChanged);
  // }

  shouldComponentUpdate(nextProps, nextState) {
    return !(isEqual(this.props, nextProps) && isEqual(this.state, nextState));
  }

  componentWillUnmount() {
    window.localStorage.setItem('swPages', JSON.stringify(this.state.people));
  }

  getStarWarsPeople = (page) => {
    return fetch(`https://swapi.co/api/people?page=${page}`)
      .then((res) => res.json())
      .then((data) => data.results)
      .then((people) =>
        this.setState((prevState) => ({
          people: [...prevState.people, ...people],
          isLoading: false,
        }))
      )
      .catch((error) => {
        console.error(error);
        this.setState({
          error: true,
        });
      });
  };

  render() {
    const { people, isLoading, error } = this.state;

    if (error) {
      return <span>Something went wrong, please reload</span>;
    }

    if (isLoading) {
      return <span>Loading ...</span>;
    }

    return (
      <ul>
        {people.map((person) => (
          <li>
            Name: {person.name}
            <br />
            Gender: {person.gender}
          </li>
        ))}
      </ul>
    );
  }

  componentDidMount() {
    const { page } = this.props;
    this.getStarWarsPeople(page);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page: currentPage } = this.props;
    const { page: lastPage } = prevProps;

    if (currentPage !== lastPage) {
      this.getStarWarsPeople(currentPage);
    }
  }
}

export default StarWarsPeopleList;
