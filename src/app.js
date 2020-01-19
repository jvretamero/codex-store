require("marko/node-require");

const express = require("express");
const bodyParser = require("body-parser");
const markoExpress = require("marko/express");
const app = express();
const handlers = require("./handlers");

app.use(markoExpress());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(handlers);

app.use((_req, res, _next) => {
    res.marko(require("./views/errors/404"));
});

app.use((error, _req, res, _next) => {
    console.error(error);
    res.marko(require("./views/errors/500"));
});

module.exports = app;