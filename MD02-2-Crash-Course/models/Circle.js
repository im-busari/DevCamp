const Figure = require('./Figure').Figure;

class Circle extends Figure {

    constructor(id, type, coordinates) {
        super(id, type, coordinates);

        this.r = this.findRadius(coordinates[0].x, coordinates[0].y,
                                coordinates[1].x, coordinates[1].y);
        this.a = this.area();
        this.p = this.perimeter();
    }

    findRadius (x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    area () {
        
        const area = Math.PI * Math.pow(this.r, 2);
        return area;
    }
    
    perimeter () {
        const perimeter = 2 * Math.PI * this.r;        
        return perimeter;
    }
    
    addToRecord () { 
        return this.id, this.a, this.p;
    }
}

module.exports = {
    Circle: Circle
}