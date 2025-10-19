import Sequelize from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    port:process.env.DB_PORT|| 3306,
    password: process.env.DB_PASSWORD,
});
await connection.query('CREATE DATABASE IF NOT EXISTS woocommerce_products');
await connection.end();
console.log('Database ensured.');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port:process.env.DB_PORT|| 3306,
    dialect: 'mysql',
    logging: false,
});

await sequelize.authenticate();
console.log('Sequelize connected successfully.');

export default sequelize;
