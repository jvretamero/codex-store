const express = require("express");
const router = express.Router();

const homeHandlers = require("./home");
const bookHandlers = require("./books");

const Book = require("../models/book");

router.get("/", homeHandlers.home);

const booksRouter = express.Router();
booksRouter.route("/")
    .get(bookHandlers.listBooks)
    .post(Book.validations(), bookHandlers.createBook)
    .put(bookHandlers.updateBook);

booksRouter.get("/new", bookHandlers.newBook);

booksRouter.route("/:id")
    .get(bookHandlers.detailBook)
    .delete(bookHandlers.deleteBook);

router.use("/books", booksRouter);

module.exports = router;