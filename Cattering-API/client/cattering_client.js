//  const yargs = require('yargs');

let myArgs = process.argv.slice(2);
console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
  case '--register':
    console.log('New cat name: ', myArgs[1].split('=')[1]);
    break;
  default:
    console.log('Sorry, that is not something I know how to do.');
}
