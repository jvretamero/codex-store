require("marko/node-require");

const express = require("express");
const bodyParser = require("body-parser");
const markoExpress = require("marko/express");
const methodOverride = require("method-override");
const app = express();
const { createAuthHandlers, checkAuthenticationHandler } = require("./handlers/auth");
const routes = require("./handlers/routes");
const views = require("./views");

app.use(markoExpress());
app.use("/assets", express.static("src/assets"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride(function (req, _res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

app.use(createAuthHandlers());
app.use("/books*", checkAuthenticationHandler);
app.use(routes);

app.use((_req, res, _next) => {
    res.marko(views.errors["404"]);
});

app.use((error, _req, res, _next) => {
    console.error(error);
    res.marko(views.errors["500"]);
});

module.exports = app;