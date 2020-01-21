const views = require("../views");

const loginForm = (_req, res) => {
    res.marko(views.login);
};

const doLogin = (req, res, next) => {
    let authenticate = req.passport
        .authenticate("local", (error, user, failure) => {
            if (failure)
                return res.marko(views.login);

            if (error) {
                console.error(error);
                return next(error);
            }

            req.login(user, err => {
                if (err) {
                    console.error(err);
                    return next(err);
                }

                return res.redirect("/books");
            });
        });

    authenticate(req, res, next);
};

module.exports = {
    loginForm,
    doLogin
};