const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;
const db = require('./models/index');

const server = express();
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());
console.log(`Your SERVER: ${process.env.NODE_ENV}`);
// TEST DB connection
// db.sequelize
//   .authenticate()
//   .then(() => console.log('DB connected'))
//   .catch((err) => console.log('Error: ', err));

server.get('/', (req, res) => {
  res.send('Routing works');
});

server.use('/users', require('./routes/users'));
server.use('/posts', require('./routes/posts'));

switch (process.env.NODE_ENV) {
  case 'test':
    module.exports = server;
    break;
  case 'development':
    server.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
    break;
  default:
    server.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
    });
    break;
}
