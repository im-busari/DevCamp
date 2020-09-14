//  10. Create a function with no parameters. Perform the following operations...

//  The function should print the number of its arguments and each of the arguments' type.
const exploreFunc = (...params) => {
    console.log(`Arguments provided: ${params.length}`)
    params.forEach(arg => console.log(typeof(arg)))

    console.log(this.params)
}

exploreFunc("string", 98)
exploreFunc("Penka", false, "old", 98)


//  The function should print the this object. Compare the results when calling the function from Global Scope,
//  Function scope, over the object, use call and apply to call the function with parameters and without parameters
console.log(`\n\nNext question\n`)
//  Global case
console.log(`Global Scope: ${this}`);

//  Function case
function functionScope() {
    console.log(`Function Scope: ${this}`);
}

//  Object case
let objScope = {
    i: 10,
    b: () => console.log(`Object arrow function result: ${this.i}, ${this}`),
    c: function() {
      console.log(`Object function result: ${this.i}, ${this}`);
    }
}
let customObj = {
    attr: "custom object"
}

functionScope()  // 'this' is Global
functionScope.call(objScope)  //  'this' in the function is set to Object
functionScope.apply(objScope)  //  'this' in the function is set to obj

objScope.b(); // in arrow functions, 'this' retains the value of the enclosing lexical context's this
objScope.c(); // 'this' refers to properties inside the object
