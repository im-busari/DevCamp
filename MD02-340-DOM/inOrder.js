// In Order using Callback

function inOrder(msgOne, callback) {
    msgOne(callback);
}


function logOne(callback) {
    return setTimeout(() => {
        console.log("one!");
        callback();
    }, Math.random() * 2000);
}

function logTwo() {
    return setTimeout(() => {
        console.log("two!");
    }, Math.random() * 0);
}

inOrder(logOne, logTwo);