const axios = require('axios');

module.exports = async (req, res, next) => {
  const code = req.query.code;

  if (!code) {
    res.status(401).json({ message: 'Missing Authorization code' });
  }

  try {
    const result = await axios({
      method: 'post',
      url: process.env.TOKEN_ENDPOINT,
      headers: { 'content-type': 'application/json' },
      data: {
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
      },
    });

    req.oauth = result.data;

    next();
  } catch (err) {
    console.log(err);
    res.status(403).json(err);
  }
};
