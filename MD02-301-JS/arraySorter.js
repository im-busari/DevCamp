//  Sort Array. Sorting an array means to arrange its elements in increasing order. Write a JavaScript 
//  function sortArray(value) to sort an array.

const sortArray = (inputArray) => {
    const len = inputArray.length;

    for (let i = 0; i < len; i++) {
        let min = i;

        for (let j = i + 1; j < len; j++) {
            if (inputArray[min] > inputArray[j]) {
                min = j;
            }
        }
        if (min !== i) {
            let tmp = inputArray[i];
            inputArray[i] = inputArray[min];
            inputArray[min] = tmp;
        }
    }
    return inputArray;
}

result = sortArray([3, 74, -1, -22, 1, 0, 17]);
console.log(result);