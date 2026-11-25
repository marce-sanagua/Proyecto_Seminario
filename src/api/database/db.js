import mysql from "mysql2/promise";

import environments from "../config/environments.js";

const {database} = environments;

const connection =mysql.createPool({
    host: database.host,
    port: Number(database.port),
    database: database.name,
    user: database.user,
    password: database.password,
    ssl: process.env.DB_SSL === "true"
        ? { minVersion: "TLSv1.2", rejectUnauthorized: true }
        : undefined
});

export default connection;