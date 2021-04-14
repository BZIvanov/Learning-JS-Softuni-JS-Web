const { Schema, model } = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username was not provided'],
    unique: true,
  },
  hashedPass: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  salt: {
    type: String,
    required: [true, 'More salt please!'],
  },
  blockedUsers: [{ String }],
  roles: [{ type: String }],
});

userSchema.method({
  authenticate: function (password) {
    return (
      encryption.generateHashedPassword(this.salt, password) === this.hashedPass
    );
  },

  isInRole: function (role) {
    return this.roles.indexOf(role) !== -1;
  },
});

const User = model('User', userSchema);
// Create an admin at initialization here
User.seedAdminUser = async () => {
  try {
    const users = await User.find();

    if (users.length > 0) return;

    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
    return User.create({
      username: 'Admin',
      salt,
      hashedPass,
      roles: ['Admin'],
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = User;
