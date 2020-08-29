// //  Write a function called inOrder that accepts two callbacks and invokes them in order. 
// //  Implement inOrder using the callback pattern.


function timer(callback, msTime) {
    let timeout = setTimeout(callback, msTime);
 
   return { 
        msTime, 
        delay(time) {
            clearTimeout(timeout);
            msTime += time;
            start = +new Date;
            timeout = setTimeout(callback, msTime);
        }
  };
 }
  

function inOrder(msgOne, msgTwo) {

    if(msgOne.msTime > msgTwo.msTime) {
        msgTwo.delay(msgOne.msTime - msgTwo.msTime);
    }
    msgOne, msgTwo
}

const logOne = timer(() => {
    console.log("one!");
}, Math.random() * 0);

const logTwo = timer(() => {
    console.log("two!");
}, Math.random() * 1000);


inOrder(logOne, logTwo);