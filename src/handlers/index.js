const express = require("express");
const router = express.Router();

const homeHandlers = require("./home");
const bookHandlers = require("./books");

const Book = require("../models/book");

router.get("/", homeHandlers.home);
router.get("/books", bookHandlers.listBooks);
router.post("/books", Book.validations(), bookHandlers.createBook);
router.put("/books", bookHandlers.updateBook);
router.get("/books/new", bookHandlers.newBook);
router.get("/books/:id", bookHandlers.detailBook);
router.delete("/books/:id", bookHandlers.deleteBook);

module.exports = router;