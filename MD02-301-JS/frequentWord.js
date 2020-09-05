//  Write a JavaScript function findMostFreqWord(value) that finds the most frequent word in a text and prints it, as well as 
//  how many times it appears in format "word -> count". 

const findMostFreqWord = (inputString) => {
    inputString = inputString.toLowerCase().replace(/[ ,.]/g, " ").replace(/\r?\n|\r/g, " ").split(" ").filter(Boolean);
    
    let counter = {}
    let maxCount = 1
    let maxElements = {}

    for(let i = 0; i < inputString.length; i++)
    {

        let word = inputString[i];

        if(counter[word] == null)
            counter[word] = 1;
        else
            counter[word] += 1;

        if(counter[word] > maxCount)
        {
            maxElements = {}
            maxElements[word] = counter[word];
            maxCount = counter[word];
        } else if (counter[word] == maxCount) {
            maxElements[word] = counter[word];
        }
    }

    return maxElements
}

console.log(findMostFreqWord(`Huh, because I'm happy
Clap along if you feel like a room without a roof
Because I'm happy
Clap along if you feel like happiness is the truth
Because I'm happy
Clap along if you know what happiness is to you
Because I'm happy
Clap along if you feel like that's what you wanna do`
))