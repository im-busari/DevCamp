//  Write a JavaScript function countSubstringOccur(value) that accepts as parameter an array of 2 elements arr [keyword, text]. 

const countSubstringOccur = (arr) => {
    keyword = arr[0]
    text = arr[1]
    let keywordEx = new RegExp(keyword,"g")

    let countOcurr = ((text.toLowerCase()).match(keywordEx) || []).length;
    
    return countOcurr

}



console.log(countSubstringOccur(['in', 
"We are living in a yellow submarine. We don't have anything else. Inside the submarine is very tight. So we are drinking all the day. We will move out of it in 5 days."]))
