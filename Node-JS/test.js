const arraySorter = require('./to_test/arraySorter')
const compareChar = require('./to_test/charComparer')
const subSearch = require('./to_test/substringSearch');

const assert = require('assert').strict;

console.log("Testing...")

//  Sort array
let arrResult = arraySorter.sort([3, 74, -1, -22, 1, 0, 17]);

assert.deepStrictEqual(arrResult, [-22, -1, 0, 1, 3, 17, 74]);
assert.notDeepStrictEqual(arrResult, [-22, 14]);


//  Compare characters
let fArray = ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q'];
let sArray = ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q'];

let compareResult = compareChar.compare(fArray, sArray);  // modified the program to return true or false
assert.deepStrictEqual(compareResult, true);

compareResult = compareChar.compare(fArray, ['a', 'b']);
assert.deepStrictEqual(compareResult, false);



//  Count substring 
test_input = ['your', 'No one heard a single word you said. They should have seen it in your eyes. What was going around your head.'];
let countResult = subSearch.count(test_input);

assert.deepStrictEqual(countResult, 2);  // will pass
assert.notDeepStrictEqual(countResult, "2"); // will pass


console.log("Finished testing...")