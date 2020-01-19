require("marko/node-require");

const express = require("express");
const bodyParser = require("body-parser");
const markoExpress = require("marko/express");
const app = express();

app.use(markoExpress());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", (_req, res) => {
    res.marko(require("./views/home"));
});

app.use((error, _req, _res, _next) => {
    console.error(error);
});

module.exports = app;