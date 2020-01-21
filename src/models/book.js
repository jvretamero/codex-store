const { check } = require("express-validator");

class Book {
    static validations() {
        return [
            check("title")
                .isLength({ min: 5 })
                .withMessage("The title must have at least 5 characters"),

            check("price")
                .isCurrency()
                .withMessage("The price must be a valid currency")
        ];
    }
}

module.exports = Book;