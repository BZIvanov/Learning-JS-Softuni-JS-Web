const { join } = require('path');
const app = require('express')();

// main.path will give us the starting module of the application
const filePath = join(require.main.path, 'views', 'index.html');

app.get('/', (req, res) => {
  res.sendFile(filePath);
});

app.listen(3000, () => console.log('Listening on port 3000'));
