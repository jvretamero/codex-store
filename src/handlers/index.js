const express = require("express");
const router = express.Router();
const BookService = require("../services/book-service");
const db = require("../services/database");

router.get("/", (_req, res) => {
    res.marko(require("../views/home"));
});

router.get("/books", (_req, res) => {
    const bookService = new BookService(db);
    bookService.list()
        .then(books =>
            res.marko(
                require("../views/books/listing"),
                { books }));
});

router.get("/books/new", (_req, res) => {
    res.marko(
        require("../views/books/detail"),
        { book: {} });
});

module.exports = router;