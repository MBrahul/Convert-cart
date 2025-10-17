import Sequelize from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
});
await connection.query('CREATE DATABASE IF NOT EXISTS woocommerce_products');
await connection.end();
console.log('Database ensured.');


const sequelize = new Sequelize('woocommerce_products', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
});

await sequelize.authenticate();
console.log('Sequelize connected successfully.');

export default sequelize;
