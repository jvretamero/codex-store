const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const homeHandlers = require("./home");
const bookHandlers = require("./books");

router.get("/", homeHandlers.home);
router.get("/books", bookHandlers.listBooks);

router.post("/books", [
    check("title")
        .isLength({ min: 5 })
        .withMessage("The title must have at least 5 characters"),

    check("price")
        .isCurrency()
        .withMessage("The price must be a valid currency")
], bookHandlers.createBook);

router.put("/books", bookHandlers.updateBook);
router.get("/books/new", bookHandlers.newBook);
router.get("/books/:id", bookHandlers.detailBook);
router.delete("/books/:id", bookHandlers.deleteBook);

module.exports = router;