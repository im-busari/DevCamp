const url = require('url');
const Cats = require('../controllers/CatController');

module.exports.post = (req, res) => {
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
