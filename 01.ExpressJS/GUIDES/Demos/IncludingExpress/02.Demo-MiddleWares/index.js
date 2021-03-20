const express = require('express');
const app = express();

// Middleware functions have third argument next() except the last callback. We can build logic with middlewares because if something is not satisified we can call another callback with req, res
app.get(
  '/',
  (req, res, next) => {
    if (3 < 3) {
      res.send('I am middleware as internal function');
    } else {
      console.log('This condition is not true and I will call next middleware');
      next();
    }
  },
  middleWareAsFunction,
  (req, res) => {
    console.log('All before me were false and I am the last to finish!');
    res.send('The last middleware can not have next argument');
  }
);

function middleWareAsFunction(req, res, next) {
  if (5 > 10) {
    res.send('I am middleware as external function');
  } else {
    console.log(
      'This condition is not true as well and I will call next middleware'
    );
    next();
  }
}

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
