const checkUpperCase = (inputString) =>
{
   regexp = /^[A-Z]/;
   if (regexp.test(inputString))
    {
      console.log("First character is uppercase");
    } 
    else
    {
      console.log("First character is not uppercase");
    }
}

checkUpperCase('Abcd');
checkUpperCase('abcD');