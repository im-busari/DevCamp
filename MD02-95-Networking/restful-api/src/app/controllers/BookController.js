const Book = require('../models/Book');

class BookController {

    async read(req, res) {
        try {
            const books = await Book.find({});
            return res.json(books)
        } catch (err) {
            return res.status(500).json({ error: "Internal server error." })
        }
    }

    async store(req, res) {
        try {
            const book = new Book({
                title: req.body.title,
                author: req.body.author,
                publisher: req.body.publisher,
                year: req.body.year,
            });
    
            await book.save();
    
            return res.status(201).json(book);

        } catch (err) {
            return res.status(500).json({ error: 'Unable to create the record.' });
        }
    }

    async update(req, res) {
        try {
            //  Using $set to update only the changed values
            const book = await Book.findByIdAndUpdate({_id: req.params.id}, { $set: req.body })   
            return res.status(200).send(`Book item (${book.title}) updated successfully!`);

        } catch (err) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req, res) {
        try {
            await Book.findByIdAndRemove({_id: req.params.id});
            
            return res.send("Book was successfuly removed.");   
        } catch (err) {
            return res.status(400).json({ error: "Book not found."});
        }

    }
}

module.exports = new BookController();