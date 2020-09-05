/* Create Object Prototypes / Classes that model the input from Task No. 9 (food). Consider 
this task as a Playground and use JavaScript as a modeling clay. Use your imagination to add as much 
complexity as you are comfortable with. 
*/
const Food = require('./Food')
const HungryMan = require('./HungryMan')

inputData = ['{"type":"Fruit","name":"Apple","calories":95, "expiration": "2020-09-31T07:45:00Z"}',
    '{"type":"Fruit","name":"Avocado","calories":270, "expiration": "2019-12-31T07:45:00Z"}',
    '{"type":"Meat","name":"Beef","calories":351, "expiration": "2020-01-31T07:45:00Z"}',
    '{"type":"Meat","name":"Duck","calories":400, "expiration": "2020-12-31T07:45:00Z"}',
    '{"type":"Dessert","name":"Fried Ice Cream","calories":260, "expiration": "2020-12-31T07:45:00Z"}',
    '{"type":"Fruit","name":"Lemon","calories":6, "expiration": "2020-12-31T07:45:00Z"}',
    '{"type":"Vegetable","name":"Brussels Sprouts","calories":56, "expiration": "2020-10-31T07:45:00Z"}',
    '{"type":"Vegetable","name":"Rice (white)","calories":223, "expiration": "2020-01-31T07:45:00Z"}',
    '{"type": 104324,"name":"Chicken Breast (100g)","calories":75, "expiration": "2020-09-31T07:45:00Z"}'] // this line has invalid input

parsedData = []

//  Store data using Food class
inputData.map(item => {
    parsedItem = JSON.parse(item)

    if (typeof parsedItem.type === "string" && typeof parsedItem.name === "string" && typeof parsedItem.calories === "number") {
        parsedData.push(new Food(parsedItem.type, parsedItem.name, parsedItem.calories, parsedItem.expiration))
    }
});

//  function combineFood was implimented inside HungryMan class (cook())
//  function combineFood (productOne, productTwo) {}


console.log("\nCheck expiry date:\n");
parsedData.forEach(item => {
    if (!item.hasExpired()) {
        console.log(`${item.name} is still good to eat.`)
    } else {
        console.log(`${item.name} has expired.`)
    }
});

console.log("\nCheck if a given food is vegetarian-safe:\n");
parsedData.forEach(item => {
    if (item.isVegetarian()) {
        console.log(`${item.name} is vegetarian-safe.`)
    } else {
        console.log(`${item.name} is definately not for vegetarians.`)
    }
});

//  Hungry Man
let user = new HungryMan("John", 25)
console.log("\nCombine Food:");
parsedData.push(user.cook(parsedData[0], parsedData[1]))
//  TEST:     console.log(parsedData[parsedData.length - 1])

//  Let's try the whole menu
for (let i = 0; i < parsedData.length; i++) {
    user.eat(parsedData[i]);
}


