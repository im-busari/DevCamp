const http = require('http');
const url = require('url');
const port = 8080;
const qs = require('querystring');
const host = 'localhost';
const Cats = require('./controllers/CatController');

const server = http.createServer((req, res) => {
  let urlParts = url.parse(req.url);
  console.log(req.url, urlParts);

  //  direct the request to appropriate function to be processed based on the url pathname
  if (req.method === 'GET') {
    return handleGetReq(req, res);
  } else if (req.method === 'POST') {
    return handlePostReq(req, res);
  } else if (req.method === 'DELETE') {
    return handleDeleteReq(req, res);
  } else if (req.method === 'PUT') {
    return handlePutReq(req, res);
  }
});

//  TODO: Export Request handlers in a separate file
//  Handle all GET req here
const handleGetReq = (req, res) => {
  const { pathname } = url.parse(req.url);
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  switch (pathname) {
    case '/cats':
      return res.end(JSON.stringify(Cats.getCats()));
    case `/meows/:id`:
      return res.end(JSON.stringify(Cats.getCats()));
    default:
      return res.end("Can't access...");
  }
};

//  Handle POST requests
const handlePostReq = (req, res) => {
  const size = parseInt(req.headers['content-length'], 10);
  const buffer = Buffer.allocUnsafe(size);
  const { pathname } = url.parse(req.url);
  let pos = 0;

  req
    .on('data', (chunk) => {
      const offset = pos + chunk.length;
      if (offset > size) {
        reject(413, 'Too Large', res);
        return;
      }
      chunk.copy(buffer, pos);
      pos = offset;
    })
    .on('end', () => {
      if (pos !== size) {
        reject(400, 'Bad Request', res);
        return;
      }
      const data = JSON.parse(buffer.toString());
      switch (pathname) {
        case '/register':
          Cats.storeCats(data);
          console.log('New Cat: ', data);
          res.setHeader('Content-Type', 'application/json;charset=utf-8');
          res.end('You Posted: ' + JSON.stringify(data));
          break;
        case '/meow':
          Cats.storeCats(data);
          console.log('New Cat: ', data);
          res.setHeader('Content-Type', 'application/json;charset=utf-8');
          res.end('You Posted: ' + JSON.stringify(data));
          break;
        default:
          console.log("Can't find path...");
          res.end("Can't find path...");
      }
    });
};

//  Handle DELETE requests
function handleDeleteReq(req, res) {
  const { pathname, query } = url.parse(req.url);
  const { id } = qs.parse(query);
  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  switch (pathname) {
    case '/cats':
      // JUST TEST IF IT WORKS -- REMOVE LATER
      let result = Cats.deleteCats(id);
      if (result) {
        res.end(`I deleted cat with id:${id}`);
      } else {
        res.end(`Couldn't find cat with id:${id}`);
      }
      break;
    default:
      return res.end("Can't access...");
  }
}

// Our HTTP server that accepts requests to port 8080
server.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}/`);
});
