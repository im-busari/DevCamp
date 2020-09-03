// Tasks 9 - 10
//  Temperatures to and from Celsius, Fahrenheit

const getFahrenheit = (celsius) => {
  let fahrenheit = celsius * 9 / 5 + 32;
  console.info(`${celsius}\xB0C is ${fahrenheit} \xB0F.`);
  return fahrenheit
}

const getCelsius = (fahrenheit) => {
    let celsius = (fahrenheit - 32) * 5 / 9;
    console.info(`${fahrenheit}\xB0F is ${celsius} \xB0C.`);
    return celsius
}

getFahrenheit(60);
getCelsius(59);


//  mph to and from km/h
//  Good to know: 1 mph = 1.609344 km/h

const getKMH = (mph) => {
    let kmh = mph * 1.609344
    console.info(`${mph} mph are equal to ${kmh.toFixed(2)} km/h.`)
    return kmh
}

const getMPH = (kmh) => {
    let mph = kmh / 1.609344
    console.info(`${kmh} km/h are equal to ${mph.toFixed(2)} mph.`)
    return mph
}

getKMH(61)
getMPH(54)

//  Gallons to and from litres
//  Conversion factor 0.264172
const getGallons = (litres) => {
    gallons = litres * 0.264172
    console.info(`${litres}L = ${gallons.toFixed(4)} gallons.`)
    return litres * 0.264172
}
const getLitres = (gallons) => {
    litres = gallons / 0.264172
    console.info(`${gallons} gallons = ${litres.toFixed(4)}L.`)
    return litres
}
getGallons(115)
getLitres(21)


//  Write a JavaScript program to check from two given integers, whether one is positive and another one is negative.
const positiveInt = 4
const negativeInt = -3
if (negativeInt < 0 < positiveInt || positiveInt < 0 < negativeInt) {
    console.log("One of the integers is positive and another one is negative.")
} else {
    console.error("You did not meet the requirements")
}

