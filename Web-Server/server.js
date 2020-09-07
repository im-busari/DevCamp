const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 4000;

const server = express();
server.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
server.use(bodyParser.json());
console.log(`Your SERVER: ${process.env.NODE_ENV}`);

server.get('/', (req, res) => {
  res.send('Routing works');
});

server.use('/users', require('./routes/users'));
server.use('/posts', require('./routes/posts'));
server.use('/comments', require('./routes/comments'));

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

const startGracefulShutdown = () => {
  console.log('Starting to shutdown...');
  server.close(() => {
    console.log('Http server closed.');
  });
};
process.on('SIGTERM', startGracefulShutdown);
process.on('SIGINT', startGracefulShutdown);
