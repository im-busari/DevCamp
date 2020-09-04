const express = require('express');
const bodyParser = require('body-parser');

//  Database
const db = require('./config/database');

// TEST DB connection
db.authenticate()
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('Error: ', err));

const server = express();
const PORT = process.env.PORT || 4000;

server.get('/', (req, res) => {
  res.send('Routing works');
});

server.use('/users', require('./routes/users'));

server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
