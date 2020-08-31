const events = require('events');
const { clearInterval, setImmediate } = require('timers');

let income = 0.0;
let coffee = new events.EventEmitter();
let working = true;

//  Our menu
coffee.on('espresso', function () {
    setTimeout(function(){ 
        income += 1;
    }, 500);
});

coffee.on('cappuccino', function () {
    setTimeout(function(){ 
        income += 3.5;
    }, 1000);
});
coffee.on('latte', function () {
    setTimeout(function(){ 
        income += 4.3;
    }, 1500);
});
coffee.on('americano', function () {
    setTimeout(function(){ 
        income += 1.5;
    }, 700);
});


//  Timeout for break
setTimeout(function(){
    working = !working
    console.log("--- On a break, back in 5 sec...");
    setTimeout(function(){
        console.log("--- We are back!");
        working = !working
    }, 5000)
}, 12000)

//  Stop the shop and show the income
setTimeout(function() {
    clearInterval(shop);
    console.log("WE are CLOSED. See you tomorrow! ;)");
    setImmediate(() => {
        console.log("Today's income: ", income.toFixed(2))
    });
}, 30000)


console.log("We are OPEN. Welcome ^-^")
//  The running business
var shop = setInterval(function() {

    if (working === true ){
        
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
