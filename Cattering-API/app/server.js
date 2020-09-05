const http = require('http');
const url = require('url');
const port = 8080;

//  Request Handlers
const handleGetReq = require('./handlers/handleGetReq');
const handlePostReq = require('./handlers/handlePostReq');
const handleDeleteReq = require('./handlers/handleDeleteReq');

const server = http.createServer((req, res) => {
  //  direct the request to appropriate function to be processed based on the url pathname
  switch(req.method) {
    case 'GET':
      return handleGetReq.get(req, res);
    case 'POST':
      return handlePostReq.post(req, res);
    case 'DELETE':
      return handleDeleteReq.delete(req, res);
    default:
      return res.end(JSON.stringify(`I can't handle this type of operations.`))
  }
});


// server.listen(port, () => {
//   console.log(`Server listening on port http://localhost:${port}/`);
// })

module.exports= server;

