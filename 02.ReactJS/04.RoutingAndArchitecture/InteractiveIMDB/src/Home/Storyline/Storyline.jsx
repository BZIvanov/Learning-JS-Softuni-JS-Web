import React from 'react';

const Storyline = (props) => {
  return (
    <span>
      <h2>Story line of {props.title}</h2>
      <p>{props.storyline}</p>
    </span>
  );
};

export default Storyline;
