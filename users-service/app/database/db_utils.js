const mysql = require("promise-mysql");

const database = {
    host: process.env.DB_HOST,
    socketPath: process.env.DB_SOCKET,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    timezone: 'utc'
}

module.exports = {

    query: async function(query, values) {
        let conn = mysql.createPool(database);
        var result = await conn.query(query, values);
        conn.end();
        return result;
    },

    first: async function(query, values) {
        let conn = mysql.createPool(database);
        var result = await conn.query(query, values);
        conn.end();
        if (result.length == 0) {
            return null;
        } else {
            return result[0];
        }
    }
}