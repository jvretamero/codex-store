const home = (_req, res) => {
    res.marko(require("../views/home"));
};

module.exports = {
    home
};