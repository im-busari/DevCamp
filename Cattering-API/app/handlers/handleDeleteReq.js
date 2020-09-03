const qs = require('querystring');
const url = require('url');
const Meow = require('../controllers/MeowController');

module.exports.delete = (req, res) => {
  const { pathname } = url.parse(req.url);
  const id = parseInt(pathname.split('/')[2]); // MUST get ID from config.json
  const cat = pathname.split('/')[3];
  const key = pathname.split('/')[4];

  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  switch (pathname) {
    case `/meows/${id}/${cat}/${key}`:
      let result = Meow.deleteMeow(id, cat, key);

      switch (result) {
        case 403:
          res.statusCode = 403;
          res.end(
            JSON.stringify(
              `Couldn't find meow that belongs to you, with id:${id}`
            )
          );
          break;
        case 204:
          res.statusCode = 204;
          res.end(
            JSON.stringify(
              `Couldn't find meow that belongs to you, with id:${id}`
            )
          );
      }
      break;
    default:
      return res.end("Can't access...");
  }
};
