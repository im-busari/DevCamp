const url = require('url');
const Cats = require('../controllers/CatController');

module.exports.get = (req, res) => {
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
