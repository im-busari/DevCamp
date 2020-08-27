//  Tasks 5 to 7

//  Display current date and time (5)
let daysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

let timestamp = new Date;

let am_pm = timestamp.getHours() >= 12 ? 'PM' : 'AM';
formatHours = timestamp.getHours() % 12;
formatHours = formatHours ? formatHours : 12;

let currentTime = `${formatHours} ${am_pm} : ${timestamp.getMinutes()} : ${timestamp.getSeconds()}`

console.log(`Today is ${ daysName[timestamp.getDay()] }`)
console.log(`Current time is: ${ currentTime }`)


//  Count the number of workdays and holidays by the end of the year

//  For startDate we will use the timestamp from the previous exercise 
const endDate = new Date("2020-12-31T07:45:00Z");

const getWorkingDays = (startDate, endDate) => {
    
    if(endDate < startDate){
        console.error("Invalid start date.")
    }
    
    
    let numOfWorkingDays = 0;
    
    while(startDate < endDate) {

        startDate.setDate(startDate.getDate() + 1);
        let currentDay = startDate.getDay();

        // If current day is not Saturday or Sunday increase the number of Working days.
        if(currentDay != 0 && currentDay!= 6) {
            numOfWorkingDays++
        }
    }
    return numOfWorkingDays;
}
workingDays = getWorkingDays(startDate, endDate) - 5 // Christmas Holiday 2020's part
console.log(`From today (${timestamp.getDate()}/${timestamp.getMonth()}/${timestamp.getFullYear()}) until 31st of December you have ${workingDays} working days.`)


//  When your birthday is on Friday between 2020 and 2050
console.log('My Birthday will be on Friday in the following years:');
for (let year = 2020; year <= 2050; year++) {

    let birthday = new Date(year, 5, 2);

    if ( birthday.getDay() === 5 ) console.log(`BD in Friday: ${year}`);
}