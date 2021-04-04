const { Schema, model } = require('mongoose');
const encryption = require('../util/encryption');

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  hashedPass: { type: String, required: true },
  salt: { type: String, required: true },
  roles: [{ type: String }],
  edits: [{ type: Schema.Types.ObjectId, ref: 'Edit' }],
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

User.seedAdminUser = async () => {
  try {
    let users = await User.find();
    if (users.length > 0) return;
    const salt = encryption.generateSalt();
    const hashedPass = encryption.generateHashedPassword(salt, '123');
    return User.create({
      email: 'admin@abv.bg',
      salt,
      hashedPass,
      roles: ['Admin'],
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = User;
