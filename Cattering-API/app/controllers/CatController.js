const Cat = require('../models/Cat');
let cats = [];

function getCats(id) {
  if (typeof id === 'number') {
    for (let i = 0; i < cats.length; i++) {
      if (cats[i].id === id) {
        return cats[i];
      }
    }
    return "We can't find this cat...";
  } else {
    return cats;
  }
}

function storeCats(cat) {
  //returns a key for that cat.
  cat.id = cats.length + 1;
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].name === cat.name) {
      return 409;
    }
  }
  cats.push(new Cat(cat.id, cat.name));
  // generate unique key for the cat
  return '_' + Math.random().toString(36).substr(2, 9);
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
