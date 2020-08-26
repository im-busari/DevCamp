const express = require('express');

const BookController = require('./app/controllers/BookController');

const routes = new express.Router();


//  Products
routes.get('/api/books', BookController.read);
routes.post('/api/books', BookController.store);
routes.delete('/api/books/:id', BookController.delete);
routes.put('/api/books/:id', BookController.update);

module.exports = routes;