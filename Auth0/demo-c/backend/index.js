require('dotenv').config();
const express = require('express');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const guard = require('express-jwt-permissions')();

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-179yrcre.eu.auth0.com/.well-known/jwks.json',
  }),
  audience: 'https://www.cakes-api.com',
  issuer: 'https://dev-179yrcre.eu.auth0.com/',
  algorithms: ['RS256'],
});

const app = express();

app.use(jwtCheck);

app.get('/cakes', guard.check(['read:cakes']), (req, res) => {
  res.json({ cake1: 'Chocolate cake' });
});

const port = process.env.PORT || 3001;
app.listen(port);
