import db from "../../config/db.js";

const register = (name, email, password) => {
    const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    return new Promise((resolve, reject) => {
        db.run(query, [name, email, password], function(err) {
            if (err) {
                return reject(err);
            }
            const newUser = { id: this.lastID, email: email };
            return resolve(newUser);
        });
    });
}

export default register;