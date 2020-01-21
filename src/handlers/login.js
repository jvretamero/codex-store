const views = require("../views");

const loginForm = (_req, res) => {
    res.marko(views.login);
};

const doLogin = (_req, res) => {
    res.end();
};

module.exports = {
    loginForm,
    doLogin
};