class UserService {

    constructor(db) {
        this._db = db;
    }

    findByEmail(email) {
        return new Promise((resolve, reject) => {
            this._db.get(
                `
                    SELECT *
                    FROM users
                    WHERE email = ?
                `,
                [email],
                (error, user) => {
                    if (error) {
                        console.error(error);
                        return reject('User not found');
                    }

                    return resolve(user);
                }
            )
        });
    }
}

module.exports = UserService;