const sqlite = require("sqlite3").verbose();
const db = new sqlite.Database("data.db");

const USUARIOS_SCHEMA = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    name VARCHAR(40) NOT NULL UNIQUE, 
    email VARCHAR(255) NOT NULL, 
    password VARCHAR(255) NOT NULL
)`;

const USUARIO_ADM = `
INSERT INTO users (name, email, password)
SELECT 'admin', 'admin@admin.com', '12345'
WHERE NOT EXISTS (SELECT 1 FROM users WHERE name = 'admin')
`;

const LIVROS_SCHEMA = `
CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL, 
    price REAL NOT NULL,
    description TEXT DEFAULT ('') NOT NULL
)`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USUARIOS_SCHEMA);
    db.run(USUARIO_ADM);
    db.run(LIVROS_SCHEMA);
});

process.on("SIGINT", () => {
    db.close(() => {
        console.log("Database closed");
        process.exit(0);
    });
});

module.exports = db;