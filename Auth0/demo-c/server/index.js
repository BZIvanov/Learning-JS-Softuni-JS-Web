require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const oAuth = require('./middleware/o-auth');

const app = express();

app.use(cors());
app.use(oAuth);

app.get('/cakes', async (req, res) => {
  try {
    const { access_token } = req.oauth;

    const response = await axios({
      method: 'get',
      url: process.env.CAKES_API_ENDPOINT,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port);
