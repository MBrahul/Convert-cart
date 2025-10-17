import DataTypes from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('Product', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    price:DataTypes.FLOAT,
    stock_status: DataTypes.STRING,
    stock_quantity: DataTypes.INTEGER,
    category: DataTypes.STRING,
    tags: DataTypes.JSON,
    on_sale: DataTypes.BOOLEAN,
    created_at: DataTypes.DATE,
});

export default Product;
