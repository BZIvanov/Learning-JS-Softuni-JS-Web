const { Schema, model } = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /[a-z]+@[a-z]+\.[a-z]+/,
  },
  hashedPassword: { type: String, required: true },
  name: { type: String, required: true },
  salt: { type: String, required: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
});

userSchema.method({
  authenticate: function (password) {
    const currentHashedPass = encryption.generateHashedPassword(
      this.salt,
      password
    );

    return currentHashedPass === this.hashedPassword;
  },
});

module.exports = model('User', userSchema);
