import React, { Component } from 'react';
import './Home.css';
import Storyline from './Storyline/Storyline';
import Trailer from './Trailer/Trailer';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      play: false,
      title: null,
      storyline: null,
      trailerUrl: null,
    };

    this.showStoryline = this.showStoryline.bind(this);
  }

  showStoryline(id) {
    const movie = this.props.movies.filter((m) => m._id === id).pop();
    const { title, storyline } = movie;

    this.setState({
      show: true,
      play: false,
      title,
      storyline,
    });
  }

  playTrailer(id) {
    const movie = this.props.movies.filter((m) => m._id === id).pop();
    const { title, trailerUrl } = movie;

    this.setState({
      show: false,
      play: true,
      title,
      trailerUrl,
    });
  }

  render() {
    const { movies } = this.props;

    return (
      <div className="Home">
        <h1>All movies</h1>
        {this.state.show ? (
          <Storyline
            title={this.state.title}
            storyline={this.state.storyline}
          />
        ) : null}
        {this.state.play ? (
          <Trailer
            title={this.state.title}
            trailerUrl={this.state.trailerUrl}
          />
        ) : null}
        <ul className="movies">
          {movies.map((movie) => (
            <li className="movie" key={movie._id}>
              <h2>{movie.title}</h2>
              <img src={movie.posterUrl} alt="" />
              {this.props.username ? (
                <span>
                  <button onClick={(evt) => this.playTrailer(movie._id)}>
                    View Trailer
                  </button>
                  <button onClick={(evt) => this.showStoryline(movie._id)}>
                    View Story Line
                  </button>
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
