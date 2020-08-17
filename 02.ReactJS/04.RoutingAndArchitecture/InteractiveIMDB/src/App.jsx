import React, { Component, Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from './NavBar/NavBar';
import Home from './Home/Home';
import User from './User/User';
import Create from './Create/Create';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      isAdmin: false,
      movies: [],
    };

    this.registerUser = this.registerUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.createMovie = this.createMovie.bind(this);
  }

  registerUser(user) {
    fetch('http://localhost:9999/auth/signup', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          toast.success(data.message);
          this.loginUser(user);
        } else {
          toast.error(data.message);

          if (data.errors) {
            data.errors.forEach((err) => toast.error(err.msg));
          }
        }
      })
      .catch((err) => toast.error(err));
  }

  loginUser(user) {
    fetch('http://localhost:9999/auth/signin', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.username) {
          sessionStorage.setItem('token', data.token);
          sessionStorage.setItem('username', data.username);
          sessionStorage.setItem('isAdmin', data.isAdmin);

          toast.success(data.message);

          this.setState({
            username: data.username,
            isAdmin: data.isAdmin,
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err));
  }

  logoutUser(evt) {
    evt.preventDefault();

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAdmin');

    toast.success('Logged out successfully');

    this.setState({
      username: null,
      isAdmin: false,
    });
  }

  createMovie(movie) {
    fetch('http://localhost:9999/feed/movie/create', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(movie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.movie) {
          toast.success(data.message);

          this.setState((prevState) => ({
            movies: [...prevState.movies, data.movie],
          }));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err));
  }

  componentWillMount() {
    const token = sessionStorage.getItem('token');

    if (token) {
      this.setState({
        username: sessionStorage.getItem('username'),
        isAdmin: !!sessionStorage.getItem('isAdmin'),
      });
    } else {
      this.setState({
        username: null,
        isAdmin: false,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Fragment>
            <ToastContainer />
            <NavBar
              username={this.state.username}
              isAdmin={this.state.isAdmin}
              logoutUser={this.logoutUser}
            />
            <Switch>
              <Route
                path="/"
                render={() => (
                  <Home
                    movies={this.state.movies}
                    username={this.state.username}
                  />
                )}
                exact
              />
              <Route
                path="/user"
                render={(props) =>
                  this.state.username ? (
                    <Redirect to="/" />
                  ) : (
                    <User
                      {...props}
                      registerUser={this.registerUser}
                      loginUser={this.loginUser}
                    />
                  )
                }
              />
              <Route
                path="/create"
                render={() =>
                  this.state.isAdmin ? (
                    <Create createMovie={this.createMovie} />
                  ) : (
                    <Redirect to="/" />
                  )
                }
              />
            </Switch>
          </Fragment>
        </Router>
      </div>
    );
  }

  componentDidMount() {
    fetch('http://localhost:9999/feed/movies')
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          movies: data.movies,
        });
      })
      .catch((err) => toast.error(err));
  }
}

export default App;
