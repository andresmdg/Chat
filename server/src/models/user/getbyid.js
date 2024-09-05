import db from "../../config/db.js";

const getById = (email) => {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        db.get(query, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            return resolve(row);
        });
    });
};

export default getById;