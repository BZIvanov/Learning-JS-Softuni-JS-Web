const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeaders = req.get('Authorization');
  if (!authHeaders) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    // verify function is from jsonwebtoken and with it we will decode the token to extract the id from it
    // we know, that we will have userId field in the token, because we use that field, when creating the token in the sign function provided by jwt
    decodedToken = jwt.verify(token, 'somesupersecret');
  } catch (error) {
    return res.status(401).json({ message: 'Token is invalid.', error });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: 'Not authenticated.' });
  }

  req.userId = decodedToken.userId;
  next();
};
