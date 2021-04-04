const { Schema, model } = require('mongoose');
const encryption = require('./../utilities/encryption');

let userSchema = Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    roles: [{ type: String }],
    salt: {
      type: String,
      required: true,
    },
    articles: [{ type: Schema.Types.ObjectId, ref: 'Article' }],
  },
  {
    usePushEach: true,
  }
);

userSchema.method({
  authenticate: function (password) {
    const inputPasswordHash = encryption.hashPassword(password, this.salt);
    return inputPasswordHash === this.passwordHash;
  },

  isAuthor: function (article) {
    if (!article) {
      return false;
    }

    return article.author.equals(this.id);
  },

  isInRole: function (role) {
    return this.roles.indexOf(role) !== -1;
  },
});

const User = model('User', userSchema);

module.exports = User;

User.seedAdmin = async () => {
  try {
    const users = await User.find();

    if (users.length > 0) return;

    const salt = encryption.generateSalt();
    const passwordHash = encryption.hashPassword('admin', salt);
    return User.create({
      salt,
      email: 'admin@admin.com',
      passwordHash,
      fullName: 'Admin Admin',
      roles: ['Admin'],
    });
  } catch (err) {
    console.log(err);
  }
};
