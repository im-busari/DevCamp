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
        if(this.type === "Fruit" || this.type === "Vegetable" || this.type === "Dessert") {
            return true
        } else {
            return false
        }
    }
}

module.exports = Food