//  check the result => htmlView.html

inputData = ['{"type":"Fruit","name":"Apple","calories":95}',
    '{"type":"Fruit","name":"Avocado","calories":270}',
    '{"type":"Fruit","name":"Coconut","calories":351}',
    '{"type":"Fruit","name":"Lemon","calories":6}',
    '{"type":"Vegetable","name":"Brussels Sprouts","calories":56}',
    '{"type":"Vegetable","name":"Rice (white)","calories":223}',
    '{"type":"Vegetable","name":"Zucchini","calories":22}',
    '{"type":"Vegetable","name":"Cabbage","calories":31}',
    '{"type":"Meat","name":"Beef (steak)","calories":229}',
    '{"type":"Poultry","name":"Chicken Breast (100g)","calories":75}']

parsedData = []

inputData.forEach(item => {
    parsedData.push(JSON.parse(item))
})

const createHtmlTable = (selector) => {
    let columns = addTableHeader(parsedData, selector);

    for (let i = 0; i < parsedData.length; i++) {
        let row$ = $('<tr/>');

        for (let colIndex = 0; colIndex < columns.length; colIndex++) {
            let cellValue = parsedData[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(selector).append(row$);
    }
}

const addTableHeader = (parsedData, selector) => {
    let columnSet = [];
    let headerTr$ = $('<tr/>');

    for (let i = 0; i < parsedData.length; i++) {
        let rowHash = parsedData[i];

        for (let key in rowHash) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(selector).append(headerTr$);

    return columnSet;
}