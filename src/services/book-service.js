class BookService {

    constructor(db) {
        this._db = db;
    }

    add(book) {
        return new Promise((resolve, reject) => {
            this._db.run(`
                INSERT INTO books (
                    title, 
                    price,
                    description
                ) values (?,?,?)
                `,
                [
                    book.titulo,
                    book.preco,
                    book.descricao
                ],
                error => {
                    if (error)
                        return reject('Erro adding book');

                    resolve();
                }
            )
        });
    }

    list() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM books',
                (error, books) => {
                    if (error)
                        return reject('Error listing books');

                    return resolve(books);
                }
            )
        });
    }

    findById(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM books
                    WHERE id = ?
                `,
                [id],
                (error, book) => {
                    if (error)
                        return reject('Erros finding book');

                    return resolve(book);
                }
            );
        });
    }

    update(book) {
        return new Promise((resolve, reject) => {
            this._db.run(
                `
                    UPDATE books SET
                        title = ?,
                        price = ?,
                        description = ?
                    WHERE id = ?
                `,
                [
                    book.title,
                    book.price,
                    book.description,
                    book.id
                ],
                error => {
                    if (error)
                        return reject('Erro updating book');

                    resolve();
                });
        });
    }

    remove(id) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    DELETE 
                    FROM books
                    WHERE id = ?
                `,
                [id],
                error => {
                    if (error)
                        return reject('Error removing book');

                    return resolve();
                }
            );
        });
    }
}

module.exports = BookService;