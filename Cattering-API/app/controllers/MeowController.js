const fs = require('fs');
const Cats = require('./CatController');

const findCat = (id, key) => {
  let cats = Cats.getCats();
  for (let i = 0; i < cats.length; i++) {
    if (cats[i].id === parseInt(id) && cats[i].key === key) {
      return true;
    }
  }
  return false;
};

const getMeows = (id) => {
  let meows = fs.readFileSync('meows.json', 'utf8');
  meows = JSON.parse(meows);
  if (typeof id === 'number') {
    for (let i = 0; i < meows.length; i++) {
      if (meows[i].id === id) {
        return meows[i];
      }
    }
    return "We can't find the MeoW MeoW...";
  } else {
    //  TODO: Should not show key
    return meows;
  }
};

const getMyMeows = (cat, key) => {
  let meows = getMeows();
  let myMeows = [];

  let catExists = findCat(cat, key);

  if (catExists) {
    for (let i = 0; i < meows.length; i++) {
      if (meows[i].createdBy === parseInt(cat)) {
        myMeows.push(meows[i]);
      }
    }
    if (myMeows.length === 0) {
      return "You don't have any meows...";
    } else {
      return myMeows;
    }
  } else {
    return 'Invalid ID';
  }
};

const storeMeow = (meow) => {
  let meows = getMeows();
  meow.id = meows.length + 1;

  //  Format Date
  let today = new Date();
  let dd = String(today.getDate());
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let hh = String(today.getHours()).padStart(2, '0');
  let min = String(today.getMinutes()).padStart(2, '0');

  today = `${dd}-${mm}-${yyyy} ${hh}:${min}`;

  //  Append to file
  meows.push({
    id: meow.id,
    createdBy: meow.createdBy,
    text: meow.text,
    createdAt: today,
  });
  meows = JSON.stringify(meows);

  fs.writeFile('meows.json', meows, (err) => {
    if (err) throw err;
    console.log(`We added your MeoW to the list.`);
  });

  return meow.id;
};

const deleteMeow = (id) => {
  let meows = getMeows();
  const meowsBeforeDelete = meows.length;
  if (typeof id === 'number') {
    meows = meows.filter((meow) => meow.id !== parseInt(id));
    if (meowsBeforeDelete !== meows.length) {
      meows = JSON.stringify(meows);
      fs.writeFile('meows.json', meows, (err) => {
        if (err) throw err;
        console.log(`Removed MeoW with id: ${id}.`);
      });
      return `Meow with id=${id} was removed`;
    }
  }
  return 403;
};

const MeowController = function () {};
MeowController.prototype.getMeows = getMeows;
MeowController.prototype.storeMeow = storeMeow;
MeowController.prototype.deleteMeow = deleteMeow;
MeowController.prototype.getMyMeows = getMyMeows;

module.exports = new MeowController();
