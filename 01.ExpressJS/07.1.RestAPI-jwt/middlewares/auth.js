const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const tokenHeader = req.header('Authorization');
  if (!tokenHeader) {
    return res.status(401).send('Access denied. No token provided');
  }

  const token = tokenHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};
