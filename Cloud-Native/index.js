const express = require('express');
const multer = require('multer');
const path = require('path');
const server = express();
const port = 3000;


server.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
server.use(bodyParser.json());
server.use(express.static(__dirname + '/public'));

server.get('/', (req, res) => {
    res.send('Routing works');
});

server.post('/upload', (req, res) => {

});


server.listen(3000, () => {
    console.log(`Server started on http://localhost:${3000}`);
});

