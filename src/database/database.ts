import * as dotenv from 'dotenv';
import * as mariadb from 'mariadb';
dotenv.config();

const config:mariadb.PoolConfig = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    connectionLimit: Number(process.env.DATABASE_CONNECTION_LIMIT),
    ssl:{rejectUnauthorized:false}
}
const database = mariadb.createPool(config);

export default database;




