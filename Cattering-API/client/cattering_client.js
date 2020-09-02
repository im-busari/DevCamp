const fs = require('fs');
let config = require('./config.json');
let argv = require('minimist')(process.argv.slice(2));
const CatApi = require('./CatApi');
let myArgs = process.argv.slice(2);

const api = new CatApi({
  api_url: config.api_url,
});

function updateConfigFile(cat, key) {
  let data = {
    api_url: config.api_url,
    cat: cat,
    key: key,
  };
  const jsonString = JSON.stringify(data);
  fs.writeFile('./config.json', jsonString, (err) => {
    if (err) {
      console.log('Error writing file', err);
    } else {
      console.log('Successfully updated config file.');
    }
  });
}

switch (myArgs[0]) {
  case '--register':
    if (argv['cat']) {
      api
        .createCat({ cat: argv['cat'] })
        .then((res) => {
          console.log(res.headers.get('key'));
          if (res.status === 200) {
            updateConfigFile(argv['cat'], res.headers.get('key'));
            console.log('Done');
          } else {
            throw new Error('An error occurred..');
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      console.log('Please try to provide --cat');
    }
    break;
  case '--getall':
    //  Return all meows in JSON format
    break;
  case '--getself':
    //  Get my meows
    break;
  case '--create':
  //  This call requires cat and key from config.json file
  //  Create new meow with --message...
  case '--delete':
    //  This call requires cat and key from config.json file
    //  Should delete a meow with given --meowid...
    break;

  default:
    console.log('Sorry, this is not something I know how to do.');
}
