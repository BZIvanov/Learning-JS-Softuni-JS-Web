const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

app.use(cors);
app.use(express.json());

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/todos', async (req, res) => {
  console.log('here');
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 5000');
});
