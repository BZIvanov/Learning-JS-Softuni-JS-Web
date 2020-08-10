import React from 'react';

const RandomList = ({ randomList = [] }) => (
  <ul>
    {randomList.map((thing) => (
      <li>{thing}</li>
    ))}
  </ul>
);

export default RandomList;
