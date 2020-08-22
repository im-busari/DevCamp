const Figure = require('./Figure').Figure;

class Rectangle extends Figure {

    constructor(id, type, coordinates) {
        super(id, type, coordinates);
        this.side_a = Math.sqrt(Math.pow(coordinates[1].x - coordinates[0].x, 2) + Math.pow(coordinates[1].y - coordinates[0].y, 2));
        this.side_b = Math.sqrt(Math.pow(coordinates[3].x - coordinates[0].x, 2) + Math.pow(coordinates[3].y - coordinates[0].y, 2));
        
        this.a = this.area();
        this.p = this.perimeter();
    }

    area () {
        return this.side_a * this.side_b;
    }
    
    perimeter () {
        return 2 * (this.side_a + this.side_b)
    }
    
    addToRecord () {
            
        console.log("Rectangle area: ", this.area())
        console.log("Rectangle Perimeter: ", this.perimeter())     
    }
}

module.exports = {
    Rectangle: Rectangle
}