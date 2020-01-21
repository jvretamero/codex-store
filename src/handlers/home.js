const views = require("../views");

const home = (_req, res) => {
    res.marko(views.home);
};

module.exports = {
    home
};