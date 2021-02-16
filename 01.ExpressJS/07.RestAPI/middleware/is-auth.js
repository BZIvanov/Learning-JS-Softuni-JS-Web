const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeaders = req.get('Authorization');
  if (!authHeaders) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const token = authHeaders.split(' ')[1];
  try {
    // verify function is from jsonwebtoken and with it we will decode the token to extract the id from it
    // we know, that we will have userId field in the token, because we use that field, when creating the token in the sign function provided by jwt
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken) {
      return res.status(401).json({ message: 'Not authenticated.' });
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid.', error });
  }
};
