//  The tasks 11 - 12

//  11. Write a JavaScript function to calculate the tax (20%) of a given price.
const getTax = (price) => {
    return (price / 100) * 20
}

const tax = getTax(240);
console.log(`20% of 240 is ${tax}`)

//  Write a JavaScript function to round a number to a given decimal places.
const roundDecimal = (num, places) => {
    let decimalPlaces = parseInt(`1` + `${"0".repeat(places)}`)
    return Math.round(num * decimalPlaces) / decimalPlaces
}

console.log(roundDecimal(12.375,2));
console.log(roundDecimal(12.37499,2));
console.log(roundDecimal(-10.3079499, 3));

