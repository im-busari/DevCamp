const Figure = require('./Figure').Figure;

class Triangle extends Figure {

    constructor(id, type, coordinates) {
        super(id, type, coordinates);

        this.a = this.area(coordinates[0].x, coordinates[0].y, 
            coordinates[1].x, coordinates[1].y, 
            coordinates[2].x, coordinates[2].y);
        this.p = this.perimeter(coordinates[0].x, coordinates[0].y,
            coordinates[1].x, coordinates[1].y,
            coordinates[2].x, coordinates[2].y);
    }

    area (x1, y1, x2, y2, x3, y3) {
        const area = Math.abs(x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2;
        return area;
    }
    
    perimeter (x1, y1, x2, y2, x3, y3) {
        let L1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        let L2 = Math.sqrt(Math.pow(x3 - x2, 2) + Math.pow(y3 - y2, 2));
        let L3 = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));
        const perimeter = L1 + L2 + L3;
        return perimeter;
    }
    
    addToRecord () { 
        this.id   
        return this.id, this.a, this.p;
    }
}

module.exports = {
    Triangle: Triangle
}