function promiseOrder(msgOne, msgTwo) {
    let promiseArray = [msgOne(), msgTwo()]

    Promise.all(promiseArray).then(values => {
        values.forEach(value => {
            console.log(value)  // to console.log each value seperately in order
        })
    }).catch(error => {
        console.error(error)
    })
}

const logOne = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function() {
        resolve("one!");
      }, Math.random() * 3000)
    });
}

const logTwo = () => {
    return new Promise(function (resolve, reject) {
        setTimeout(function() {
        resolve("two!");
      }, Math.random() * 0)
    });
}

promiseOrder(logOne, logTwo)