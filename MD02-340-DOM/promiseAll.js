//  Should accept an array of promises and return an array of resolved values. 
//  If any of the promises are rejected, the function should catch them.


function logMsg(msg) {
    return new Promise(function (resolve, reject) {
        resolve(msg)
    })
}

//  I will get [DEP0018] if I don't catch it here as well.
function throwError(errorMsg) {
    return new Promise((resolve, reject) => {
        reject(new Error(errorMsg));
    }).catch(error => { 
        console.error(error.message)
    });
}

const funcList = [logMsg("promise All ---"), logMsg("interesting"), throwError("Failure")];

Promise.all(funcList)
.then(values => { 
    for (let i = 0; i < values.length; i++) {
        if (values[i] === undefined) values.splice(i, 1)
    }
    console.log(values)

}).catch(error => {
    console.error(error)
})
