const readline = require('readline')

//  Write a JavaScript function compareChars(value) that compares two arrays of chars lexicographically (letter by letter). 
let BreakException = {}

const compareArrayChars = (firstArray, secondArray) => {

    try {

        if (firstArray.length == secondArray.length) {
            
            Object.keys(firstArray).forEach(key => {
                if (firstArray[key] != secondArray[key]) {
                    console.error("Not Equal")
                    throw BreakException; // break out of the loop
                }
            })
            console.error("Equal")
        } else {
            console.error("No chance to be equal.")
        }
    } catch (err) {
        if (err !== BreakException) console.error(err);
    }

}

let fArray = ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']	
let sArray = ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']

//  ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']
//  ['1', 'f', '1', 's', 'g', 'j', 'f', 'u', 's', 'q']


compareArrayChars(fArray, sArray)
