import { useState, useEffect } from 'react';
import queryString from 'query-string';

const Cakes = ({ location }) => {
  const { code } = queryString.parse(location.search);

  const [cakes, setCakes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/cakes?code=${code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => setCakes(data));
  }, [code]);

  return (
    <div>
      <h3>Cakes</h3>
      <div>
        <div>{JSON.stringify(cakes)}</div>
      </div>
    </div>
  );
};

export default Cakes;
