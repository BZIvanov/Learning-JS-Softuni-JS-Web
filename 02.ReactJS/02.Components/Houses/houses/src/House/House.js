import React from 'react';
import './House.css';

// DO NOT use this.props when props comes as function parameter
const House = function (props) {
  return (
    <div className="House" onMouseEnter={() => props.houseHoverEvent(props.id)}>
      <img alt="house" src={props.imageUrl}></img>
    </div>
  );
};

export default House;
