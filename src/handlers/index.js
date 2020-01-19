const express = require("express");
const { check, validationResult } = require("express-validator");
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

router.post("/books", [
    check("title")
        .isLength({ min: 5 })
        .withMessage("The title must have at least 5 characters"),

    check("price")
        .isCurrency()
        .withMessage("The price must be a valid currency")
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.marko(
            require("../views/books/detail"),
            {
                book: {},
                validations: errors.array()
            });
    }

    const bookService = new BookService(db);
    bookService.add(req.body)
        .then(() => res.redirect("/books"));
});

router.put("/books", (req, res) => {
    const bookService = new BookService(db);
    bookService.update(req.body)
        .then(() => res.redirect("/books"));
});

router.get("/books/new", (_req, res) => {
    res.marko(
        require("../views/books/detail"),
        { book: {} });
});

router.get("/books/:id", (req, res) => {
    const id = req.params.id;

    const bookService = new BookService(db);
    bookService.findById(id)
        .then(book => res.marko(
            require("../views/books/detail"),
            { book }));
});

router.delete("/books/:id", (req, res) => {
    const id = req.params.id;

    const bookService = new BookService(db);
    bookService.remove(id)
        .then(() => res.redirect("/books"));
});

module.exports = router;