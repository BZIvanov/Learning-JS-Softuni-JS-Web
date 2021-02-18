const crypto = require('crypto');
const { Schema, model } = require('mongoose');

const propertyIsRequired = '{0} is required.';

const userSchema = Schema({
  username: {
    type: String,
    required: propertyIsRequired.replace('{0}', 'Username'),
    unique: true,
  },
  password: {
    type: String,
    required: propertyIsRequired.replace('{0}', 'Password'),
  },
  salt: { type: String },
  firstName: {
    type: String,
    required: propertyIsRequired.replace('{0}', 'First name'),
  },
  lastName: {
    type: String,
    required: propertyIsRequired.replace('{0}', 'Last name'),
  },
  age: {
    type: Number,
    min: [0, 'Age must be between 0 and 120'],
    max: [120, 'Age must be between 0 and 120'],
  },
  gender: {
    type: String,
    enum: {
      values: ['Male', 'Female'],
      message: 'Gender should be either "Male" or "Female".',
    },
  },
  roles: {
    type: [{ type: String, enum: ['Admin', 'User'] }],
    default: ['User'],
  },
  boughtProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdCategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
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
module.exports.User = User;

module.exports.seedAdminUser = async () => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      User.create({
        username: 'admin',
        firstName: 'admin',
        lastName: 'admin',
        password: 'admin',
        age: 19,
        gender: 'Male',
        roles: ['Admin'],
      });
    }
  } catch (err) {
    console.log(err);
  }
};

function generateHashedPassword(salt, password) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}
