const Cat = require('../models/Cat');
const crypto = require('crypto');
let cats = [];
const uuid = require('uuid');

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
  cat.id = cats.length + 1;
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].cat === cat.cat) {
      return 409;
    }
  }
  cats.push(new Cat(cat.id, cat.cat));
  // TODO: Move 'secret' to env file
  const secret = 'meowCat21';
  const key = '_' + cat.id + Math.random().toString(36).substr(2, 9);
  console.log(key);
  return key;
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
