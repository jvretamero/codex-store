const { v4: uuid } = require("uuid");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const UserService = require("../services/user-service");
const db = require("../services/database");

const findUserByEmail = email =>
    new UserService(db)
        .findByEmail(email)

const configurePassport = () => {
    passport.use(new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        (email, password, done) => {
            findUserByEmail(email)
                .then(user => {
                    if (!user || user.password != password) {
                        return done(null, false, {
                            message: "Invalid e-mail or password"
                        });
                    }

                    return done(null, user);
                })
                .catch(error => {
                    console.error(error);
                    done(error, false);
                });
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, {
            name: user.name,
            email: user.email
        });
    });

    passport.deserializeUser((userSession, done) => {
        done(null, userSession);
    });
};

const createAuthHandlers = () => {
    configurePassport();

    let sessionHandler = session({
        secret: "codex-store", //This should be an environment variable
        genid: () => uuid(),
        resave: false,
        saveUninitialized: false
    });

    let passportInjector = (req, res, next) => {
        req.passport = passport;
        next();
    };

    return [
        sessionHandler,
        passport.initialize(),
        passport.session(),
        passportInjector
    ];
};

const checkAuthenticationHandler = (req, res, next) => {
    if (req.isAuthenticated())
        return next();

    return res.redirect("/login");
};

module.exports = {
    createAuthHandlers,
    checkAuthenticationHandler
};