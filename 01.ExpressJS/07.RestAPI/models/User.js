const crypto = require('crypto');
const { Schema, model } = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    match: /[a-z0-9]+@[a-z]+\.[a-z]+/,
  },
  password: { type: String, required: true },
  salt: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

userSchema.pre('save', function () {
  const salt = crypto.randomBytes(64).toString('base64');
  this.salt = salt;
  this.password = generateHashedPassword(salt, this.password);
});

userSchema.method({
  authenticate: function (incomingPassword) {
    return (
      generateHashedPassword(this.salt, incomingPassword) === this.password
    );
  },
  generateAuthToken: function () {
    return jwt.sign(
      { userId: this._id.toString(), name: this.name, email: this.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  },
});

module.exports = model('User', userSchema);

function generateHashedPassword(salt, password) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}
