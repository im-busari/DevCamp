const url = require('url');
const Cats = require('../controllers/CatController');
const Meows = require('../controllers/MeowController');

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
      let result;
      res.setHeader('Content-Type', 'application/json;charset=utf-8');
      switch (pathname) {
        case '/register':
          result = Cats.storeCats(data);
          if (result === 409) {
            res.statusCode = 409;
            res.end('Cat already exists');
          } else {
            res.end('You Posted: ' + JSON.stringify(result));
          }
          break;

        case '/meow':
          result = Meows.storeMeow(data);
          res.end('Your new meow_id: ' + JSON.stringify(result));
          break;

        default:
          console.log("Can't find path...");
          res.end("Can't find path...");
      }
    });
};
