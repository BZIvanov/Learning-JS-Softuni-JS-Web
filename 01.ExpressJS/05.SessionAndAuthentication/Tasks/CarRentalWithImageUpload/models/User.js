const crypto = require('crypto');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  salt: { type: String },
  roles: {
    type: [{ type: String, enum: ['user', 'admin'] }],
    default: ['user'],
  },
});

userSchema.pre('save', function () {
  const salt = crypto.randomBytes(64).toString('base64');
  this.salt = salt;
  this.password = generateHashedPassword(salt, this.password);
});

userSchema.method({
  isPasswordCorrect: function (incomingPassword) {
    return (
      generateHashedPassword(this.salt, incomingPassword) === this.password
    );
  },
});

const User = model('User', userSchema);

User.seedAdminUser = async () => {
  try {
    const user = await User.find();
    if (user.length > 0) {
      return;
    }

    return User.create({
      username: 'admin',
      password: 'admin',
      roles: ['admin'],
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = User;

function generateHashedPassword(salt, password) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}
