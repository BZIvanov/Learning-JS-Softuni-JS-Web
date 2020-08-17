const mongoose = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: [true, 'Username was not provided'],
    unique: true,
  },
  hashedPass: { type: mongoose.Schema.Types.String, required: true },
  firstName: { type: mongoose.Schema.Types.String },
  lastName: { type: mongoose.Schema.Types.String },
  salt: {
    type: mongoose.Schema.Types.String,
    required: [true, 'More salt please!'],
  },
  blockedUsers: [{ type: mongoose.Schema.Types.String }],
  roles: [{ type: mongoose.Schema.Types.String }],
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

const User = mongoose.model('User', userSchema);
// Create an admin at initialization here
User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, 'Admin');
    return User.create({
      username: 'Admin',
      salt,
      hashedPass,
      roles: ['Admin'],
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;
