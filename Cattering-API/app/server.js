const http = require('http');
const url = require('url');
const port = 8080;

//  Request Handlers
const handleGetReq = require('./handlers/handleGetReq');
const handlePostReq = require('./handlers/handlePostReq');
const handleDeleteReq = require('./handlers/handleDeleteReq');

const server = http.createServer((req, res) => {
  let urlParts = url.parse(req.url);
  console.log(req.url, urlParts);

  //  direct the request to appropriate function to be processed based on the url pathname
  if (req.method === 'GET') {
    return handleGetReq.get(req, res);
  } else if (req.method === 'POST') {
    return handlePostReq.post(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeleteReq.delete(req, res);
  } else if (req.method === 'PUT') {
    res.end('Not today!');
  }
});

// Our HTTP server that accepts requests to port 8080
server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}/`);
});
