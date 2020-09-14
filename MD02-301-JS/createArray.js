//  Write a JavaScript function createArray() that allocates array of 20 items and initializes each element by its index 
//  multiplied by 5

const createArray = (numOfItems) => {
    let outputArray = new Array(numOfItems)

    for(let i = 0; i < numOfItems; i++) {
        outputArray[i] = i * 5
    }
    return outputArray
}

console.log(createArray(20))