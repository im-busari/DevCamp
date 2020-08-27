// 3. Create sample expressions, using all possible JavaScript operators
const x = 8
const y = 4
let z = 0
let nullVar = null
let undefinedVar
let welcomeMsg = "Welcome, "

console.log(`Arithmetic operations: ${x * y}, ${x - y}, ${ x ** y}`)
console.log(`Compare 2 variables: ${ nullVar == undefinedVar}`);
console.log(`Compare 2 variables & and check the data type: ${ nullVar === undefinedVar}`);

welcomeMsg += "Emmy"
console.log(welcomeMsg);

comparison = x >= y ? true : false
console.log(`comparison: ${comparison}`)
