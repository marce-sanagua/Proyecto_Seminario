import connection from "../database/db.js";

const getUserByEmail = async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await connection.query(sql, [email]);

    return rows[0];
};

const createUser = async (name, email, password) => {
    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
    const [result] = await connection.query(sql, [name, email, password]);

    return result.insertId;
};

const updateUserPassword = async (id, password) => {
    const sql = "UPDATE users SET password = ? WHERE id = ?";
    await connection.query(sql, [password, id]);
};

export {
    getUserByEmail,
    createUser,
    updateUserPassword
};