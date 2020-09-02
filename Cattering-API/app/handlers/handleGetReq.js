const url = require('url');
const Cats = require('../controllers/CatController');
const Meows = require('../controllers/MeowController');

module.exports.get = (req, res) => {
  const { pathname } = url.parse(req.url);
  const id = parseInt(pathname.split('/')[2]); // get ID

  res.setHeader('Content-Type', 'application/json;charset=utf-8');
  switch (pathname) {
    case `/cats`:
      return res.end(JSON.stringify(Cats.getCats()));
    case `/cats/${id}`:
      return res.end(JSON.stringify(Cats.getCats(id)));
    case `/meows`:
      return res.end(JSON.stringify(Meows.getMeows()));
    case `/meows/${id}`:
      return res.end(JSON.stringify(Meows.getMeows(id)));
    default:
      return res.end("Can't access...");
  }
};
