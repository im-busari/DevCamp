const Food = require('./Food')

class HungryMan {
  
    constructor(firstname, age){
      this.firstname = firstname;
      this.age = age;
      this.calories = 0; // how many calories has he/she taken 
    }

    cook(productOne, productTwo) {
        let newName = `${productOne.name}-${productTwo.name}`;
        let newCalories = productOne.calories + productTwo.calories;

        if (productOne.expiration < productTwo.expiration) {
            return new Food("Salad", newName, newCalories, productTwo.expiration)
        } else {
            return new Food("Salad", newName, newCalories, productOne.expiration)
        }
    }

    eat(item) {
        if (this.calories > 700) {
            console.log('I am full... Give me a break.')
        } else {
            if(item.expiration < new Date()){
                console.log("Seriously, I can't eat this...")
            } else {
                this.calories += item.calories;
                console.log("Yummy...", this.calories)
            }
        }
    }

}

module.exports = HungryMan