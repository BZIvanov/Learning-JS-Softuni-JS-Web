const crypto = require('crypto');

// generate salt is function which will be applied on the password to make it hard to guess
function generateSalt() {
  // randomBytes specifies how long to be the returned salt. We can use values like: 16, 32, 64, 512 etc
  return crypto.randomBytes(128).toString('base64');
}

// with the salt we generated and password we can use this function to create our hashed password
function generateHash(salt, password) {
  let hmac = crypto.createHmac('sha1', salt);
  return hmac.update(password).digest('hex');
}

const salt = generateSalt();
const password = '123';

// if we use the same salt for the same password we will always get the same value. And different salt value leads to completely different result for equal passwords
const hashed = generateHash(salt, password);

console.log(hashed);
