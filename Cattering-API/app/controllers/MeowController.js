const Meow = require('../models/Meow');
let meows = [];

function getMeows(id) {
  if (typeof id === 'number') {
    for (let i = 0; i < meows.length; i++) {
      if (meows[i].id === id) {
        return meows[i];
      }
    }
    return `Meow meow ${id} NOT FOUND...`;
  } else {
    return meows;
  }
}

function storeMeow(meow) {
  // TODO: expects KEY
  meow.id = meows.length + 1;
  meows.push(new Meow(meow.id, meow.createdBy, meow.text));
  return meow.id;
}

function deleteMeow(id) {
  const meowsBeforeDelete = meows.length;
  if (typeof id === 'number') {
    meows = meows.filter((meow) => meow.id !== parseInt(id));
    if (meowsBeforeDelete !== meows.length) {
      return `Meow with id=${id} was removed`;
    }
  }
  return 403;
}

const MeowController = function () {};
MeowController.prototype.getMeows = getMeows;
MeowController.prototype.storeMeow = storeMeow;
MeowController.prototype.deleteMeow = deleteMeow;

module.exports = new MeowController();
