import React, { Component } from 'react';
import './Create.css';

class Create extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      storyline: '',
      trailerUrl: '',
      posterUrl: '',
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
    this.props.createMovie(this.state);

    this.setState({
      title: '',
      storyline: '',
      trailerUrl: '',
      posterUrl: '',
    });
  }

  render() {
    return (
      <div className="Create">
        <h1>Create Movie</h1>
        <form onSubmit={this.handleForm}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <label htmlFor="storyline">Story Line</label>
          <input
            type="text"
            id="storyline"
            value={this.state.storyline}
            onChange={this.handleChange}
          />

          <label htmlFor="trailerUrl">Trailer Url</label>
          <input
            type="text"
            id="trailerUrl"
            value={this.state.trailerUrl}
            onChange={this.handleChange}
          />

          <label htmlFor="posterUrl">Movie Poster</label>
          <input
            type="text"
            id="posterUrl"
            value={this.state.posterUrl}
            onChange={this.handleChange}
          />

          <input type="submit" value="Create" />
        </form>
      </div>
    );
  }
}

export default Create;
