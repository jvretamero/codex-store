const { validationResult } = require("express-validator");
const BookService = require("../services/book-service");
const db = require("../services/database");
const views = require("../views");

const listBooks = (_req, res) => {
    const bookService = new BookService(db);
    bookService.list()
        .then(books =>
            res.marko(
                views.books.listing,
                { books }));
};

const createBook = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.marko(
            views.books.detail,
            {
                book: req.body,
                validations: errors.array()
            });
    }

    const bookService = new BookService(db);
    bookService.add(req.body)
        .then(() => res.redirect("/books"));
};

const updateBook = (req, res) => {
    const bookService = new BookService(db);
    bookService.update(req.body)
        .then(() => res.redirect("/books"));
};

const newBook = (_req, res) => {
    res.marko(
        views.books.detail,
        { book: {} });
};

const detailBook = (req, res) => {
    const id = req.params.id;

    const bookService = new BookService(db);
    bookService.findById(id)
        .then(book => res.marko(
            views.books.detail,
            { book }));
};

const deleteBook = (req, res) => {
    const id = req.params.id;

    const bookService = new BookService(db);
    bookService.remove(id)
        .then(() => res.redirect("/books"));
};

module.exports = {
    listBooks,
    createBook,
    updateBook,
    newBook,
    detailBook,
    deleteBook
};