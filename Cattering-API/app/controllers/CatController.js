const Cat = require('../models/Cat');
let cats = [];

function getCats() {
  return cats;
}

function storeCats(cat) {
  cat.id = cats.length + 1;
  cats.push(new Cat(cat.id, cat.name));
}

//  TODO: Remove this function as it is not required
function deleteCats(id) {
  console.log('ID: ', id);
  console.log('Length: ', cats.length);
  const catsBeforeDelete = cats.length;
  cats = cats.filter((cat) => cat.id !== parseInt(id));
  return cats.length !== catsBeforeDelete;
}

const CatsController = function () {};
CatsController.prototype.getCats = getCats;
CatsController.prototype.storeCats = storeCats;
CatsController.prototype.deleteCats = deleteCats;

module.exports = new CatsController();
