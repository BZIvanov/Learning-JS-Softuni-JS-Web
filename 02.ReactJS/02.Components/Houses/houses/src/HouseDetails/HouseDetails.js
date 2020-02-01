import React from 'react';
import './HouseDetails.css';

const HouseDetails = props => (
  <div className="HouseDetails">
    <h2>{props.type}</h2>
    <div className="image">
      <img alt="house-details" src={props.imageUrl}></img>
    </div>
    <p>Description: {props.description}</p>
    <p>Price: {props.price}$</p>
  </div>
);

export default HouseDetails;
