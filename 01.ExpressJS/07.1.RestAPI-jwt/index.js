require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const usersRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const actorsRoutes = require('./routes/actors');
const moviesRoutes = require('./routes/movies');

const app = express();

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log('Connected to mongoDB'))
  .catch((err) => console.log(err));

app.use(express.json());
app.use('/api/users', usersRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/actors', actorsRoutes);
app.use('/api/movies', moviesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
