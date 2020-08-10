import React from 'react';
import StarWarsPeopleList from './start-wars-people-list';
import RandomList from './random-list';

class StarWarsPeopleListAndRandomList extends React.Component {
  state = {
    randomList: [1, 2, 3, 4],
    page: 1,
    isLoading: false,
  };

  setNextPage = (event) => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { randomList, page, isLoading } = this.state;

    if (isLoading) {
      return <span>Loading...</span>;
    }

    return (
      <React.Fragment>
        <button onClick={this.setNextPage}>Load next page</button>
        <StarWarsPeopleList page={page} />
        {/* <RandomList randomList={randomList} /> */}
      </React.Fragment>
    );
  }

  componentDidMount() {
    // this.setState((prevState) => ({
    //   randomList: [...prevState.randomList, 5]
    // }));
    // setTimeout(() => {
    //     this.setState({
    //         isLoading: true,
    //     });
    // }, 2000);
  }
}

export default StarWarsPeopleListAndRandomList;
