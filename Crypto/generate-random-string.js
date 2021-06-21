const crypto = require('crypto');

const generateHexString = (len = 12) => {
  const hexTransformed = len / 2;
  return crypto.randomBytes(hexTransformed).toString('hex');
};

console.log(generateHexString());
