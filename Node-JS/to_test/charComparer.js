const readline = require('readline')

//  Write a JavaScript function compareChars(value) that compares two arrays of chars lexicographically (letter by letter). 


module.exports = {

    compare : (firstArray, secondArray) => {

        try {
    
            if (firstArray.length == secondArray.length) {
                
                Object.keys(firstArray).forEach(key => {
                    if (firstArray[key] != secondArray[key]) {
                        return false
                    }
                })
                return true
            } else {
                return false
            }
        } catch (err) {
            console.error(err);
        }
    
    }

}
