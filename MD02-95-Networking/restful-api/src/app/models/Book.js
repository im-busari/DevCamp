const mongoose = require('mongoose');

//  TODO: Validation
const BookSchema = new mongoose.Schema({
    title: { type: String },
    author: { type: String  },
    publisher: { type: String },
    year: { type: Number },
});

module.exports = mongoose.model('Book', BookSchema);
