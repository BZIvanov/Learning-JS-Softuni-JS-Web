import React from 'react';
import ReactPlayer from 'react-player';
import './Trailer.css';

const Trailer = (props) => {
  return (
    <span>
      <h2>Trailer of {props.title}</h2>
      <div className="trailer">
        <div className="player">
          <ReactPlayer url={props.trailerUrl} playing controls />
        </div>
      </div>
    </span>
  );
};

export default Trailer;
