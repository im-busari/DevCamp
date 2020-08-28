class Food {
  
    constructor(type, name, calories, expiration){
      this.type = type;
      this.name = name;
      this.calories = calories;
      this.expiration = new Date(expiration)
    }

    hasExpired() {
        if (this.expiration < new Date()) {
            return true
        } else {
            return false
        }
    }

    isVegetarian() {
        if(this.type === "Fruit" || this.type === "Vegetable") {
            return true
        } else {
            return false
        }
    }

    combineFood(anotherFood) {
        /* Create some functions that work with the instances of Food. Mix a salad and calculate how many calories is the 
        total of the meal ;) Validate that the passed object is really eatable (e.g it’s an instance of Food).
        */
    }
}

module.exports = Food