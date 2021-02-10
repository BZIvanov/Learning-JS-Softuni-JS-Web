const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User, validateUser } = require('../models/user');

router.post('/', async (req, res) => {
  const error = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const { name, email, password } = req.body;

  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).send('User already exists.');
  }

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);
  user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = user.generateAuthToken();

  res.header('Authorization', `Bearer ${token}`).send({
    id: user._id,
    name: user.name,
    email: user.email,
  });
});

module.exports = router;
