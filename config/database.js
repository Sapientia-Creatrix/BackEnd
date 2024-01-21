require('dotenv').config();
const database = require('mariadb');
var pool = database.createPool({
    host : process.env.DATABASE_HOST,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    connectionLimit : process.env.DATABASE_CONNECTION_LIMIT
});

module.exports = pool;


