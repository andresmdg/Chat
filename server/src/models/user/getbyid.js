import db from "../../config/db.js";
const database = await db();

const getById = (email) => {
    const query = "SELECT * FROM users WHERE id = ?";
    return new Promise((resolve, reject) => {
        database.get(query, [email], (err, row) => {
            if (err) {
                return reject(err);
            }
            return resolve(row);
        });
    });
};

export default getById;