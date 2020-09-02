const qs = require('querystring');
const url = require('url');
const Cats = require('../controllers/CatController');

module.exports.delete = (req, res) => {
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
};
