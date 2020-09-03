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
      if (result === 403) {
        res.statusCode = 403;
        res.end(
          JSON.stringify(
            `Couldn't find cat with id:${id} or maybe you are not authorized to delete it.`
          )
        );
      } else {
        res.end(JSON.stringify(result));
      }
      break;
    default:
      return res.end("Can't access...");
  }
};
