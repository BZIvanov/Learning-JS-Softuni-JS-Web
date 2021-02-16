// General error handling. This middleware MUST be defined last because we will get to it if error occures in controllers and there we will call this middleware
module.exports = (error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message });

  next();
};
