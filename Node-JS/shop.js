const events = require('events');
const { clearInterval, setImmediate } = require('timers');

let income = 0.0;
let coffee = new events.EventEmitter();
let working = true;

let generateCoffee = (price, time) => {
    setTimeout(() => { 
        income += price;
    }, time);
}
//  Our menu
coffee.on('espresso', () => {
    generateCoffee(1, 500)
});
coffee.on('cappuccino', () => {
    generateCoffee(3.5, 1000)
});
coffee.on('latte', () => {
    generateCoffee(4.3, 1500)
});
coffee.on('americano', () => {
    generateCoffee(1.5, 700)
});


//  Timeout for break
setTimeout(() => {
    working = false
    console.log("--- On a break, back in 5 sec...");
    setTimeout(() => {
        console.log("--- We are back!");
        working = true
    }, 5000)
}, 12000)

//  Stop the shop and show the income
setTimeout(() => {
    clearInterval(shop);
    console.log("WE are CLOSED. See you tomorrow! ;)");
    setImmediate(() => {
        console.log("Today's income: ", income.toFixed(2))
    });
}, 30000)


console.log("We are OPEN. Welcome ^-^")
//  The running business
var shop = setInterval(() => {

    if (working){
        
        let choice = Math.floor(Math.random() * 4) + 1 
        switch(choice) {
            case 1:
                coffee.emit('espresso');
                break;
            case 2:
                coffee.emit('cappuccino');
                break;
            case 3:
                coffee.emit('latte');
                break;
            case 4:
                coffee.emit('americano');
                break;
            default:
                console.log("no money for ya");
        }
    }

}, (Math.floor(Math.random() * 4) + 1) * 1000)
