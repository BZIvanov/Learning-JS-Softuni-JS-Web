import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = (props) => {
  return (
    <header>
      <Link to="#default" className="logo">
        Interactive IMDB
      </Link>
      <div className="header-right">
        <Link to="/">Home</Link>
        {props.username ? (
          <span>
            <Link to="#">Welcome {props.username}!</Link>
            {props.isAdmin ? (
              <span>
                <Link to="/create">Create</Link>
              </span>
            ) : null}
            <Link to="#" onClick={props.logoutUser}>
              Logout
            </Link>
          </span>
        ) : (
          <span>
            <Link to="/user/register">Register</Link>
            <Link to="/user/login">Login</Link>
          </span>
        )}
      </div>
    </header>
  );
};

export default NavBar;
