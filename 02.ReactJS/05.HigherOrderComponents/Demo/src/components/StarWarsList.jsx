import React from 'react';
import StarWarsService from '../services/star-wars-service';
import withDataFromService from './hocs/with-data-from-service';

const StarWarsList = ({ data: characters, foo, pesho }) => {
  if (!characters.length) {
    return null;
  }

  return (
    <ul>
      {characters.map((character) => (
        <li key={character.url}>Name: {character.name}</li>
      ))}
    </ul>
  );
};

export default withDataFromService(
  StarWarsList,
  [],
  new StarWarsService().getStarWarsCharacters
);
