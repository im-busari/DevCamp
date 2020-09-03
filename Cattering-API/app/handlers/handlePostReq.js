const url = require('url');
const Cats = require('../controllers/CatController');
const Meows = require('../controllers/MeowController');

module.exports.post = (req, res) => {
  const size = parseInt(req.headers['content-length'], 10);
  const buffer = Buffer.allocUnsafe(size);
  const { pathname } = url.parse(req.url);
  const cat = pathname.split('/')[2];
  const key = pathname.split('/')[3];
  console.log(cat, key);
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
            res.setHeader('key', result);
            res.statusCode = 201;
            res.end();
          }
          break;

        case `/meows/${cat}/${key}`:
          result = Meows.storeMeow(data, cat, key);
          res.statusCode = 201;
          res.end(JSON.stringify(result));
          break;

        default:
          console.log("Can't find path...");
          res.end("Can't find path...");
      }
    });
};
