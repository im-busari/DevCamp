const myText = "mentormate";


const toBinary = (myString) => {
    let result = ""
    for (let i = 0; i < myString.length; i++) {
        let oneChar = myString[i].charCodeAt().toString(2);
        result += Array(8 - oneChar.length + 1).join("0") + oneChar;
    }
    return result;
}

console.log(toBinary(myText));