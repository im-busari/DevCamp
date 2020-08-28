const findPalindromes = (inputString) => {
    inputString = inputString.toLowerCase().replace(/[ ,.]/g, " ").split(" ").filter(Boolean);
    outputString = []
    
    for (let i = 0; i < inputString.length; i ++) {
        let reverseString = inputString[i].split("").reverse().join("")
        
        
        if (inputString[i] === reverseString) {
            outputString.push(inputString[i])
        }
    }
    return outputString
}

console.log(findPalindromes('There is a man, his name was Bob.'))