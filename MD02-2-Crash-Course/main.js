const fs = require('fs');
const Triangle = require('./models/Triangle').Triangle;
const Rectangle = require('./models/Rectangle').Rectangle;
const Circle = require('./models/Circle').Circle;

console.log("\nGive me a moment, please.\n")

const items = JSON.parse(fs.readFileSync('crash-course-task-input.json'));

let myResult = {
    figures: []
}

items.figures.map( function(figure) {
    if (figure.type == "triangle") {

        let obj = new Triangle(figure.id, figure.type, figure.coordinates);
        myResult.figures.push({id: obj.id, area: obj.a, perimeter: obj.p });

    } else if (figure.type == "rectangle") {

        let obj = new Rectangle(figure.id, figure.type, figure.coordinates);
        myResult.figures.push({id: obj.id, area: obj.a, perimeter: obj.p });
    
    } else if (figure.type == "circle") {

        let obj = new Circle(figure.id, figure.type, figure.coordinates);
        myResult.figures.push({id: obj.id, area: obj.a, perimeter: obj.p });

    } else {
        console.log("Can't help you mate... ")
    }
    
});

//fs.writeFile('recordFile.json', JSON.stringify(myResult), 'utf8');
fs.writeFile('recordFile.json', JSON.stringify(myResult), function (err) {
    if (err) {
      return console.log(err);
    }
});

console.log('\nLook at recordFile.json\n')



