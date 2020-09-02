const qs = require('querystring');
const url = require('url');
const Meow = require('../controllers/MeowController');

module.exports.delete = (req, res) => {
  const { pathname } = url.parse(req.url);
  const id = parseInt(pathname.split('/')[2]); // MUST get ID from config.json

  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  switch (pathname) {
    case `/meow/${id}`:
      let result = Meow.deleteMeow(id);
      if (result === 403) {
        res.statusCode = 403;
        res.end(`Couldn't find cat with id:${id}`);
      } else {
        res.end(`Removed meow with meow_id:${id}`);
      }
      break;
    default:
      return res.end("Can't access...");
  }
};
