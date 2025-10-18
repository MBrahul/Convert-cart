import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Product = sequelize.define('Product', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true,
    autoIncrement: true 
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  stock_status: {
    type: DataTypes.STRING
  },
  stock_quantity: {
    type: DataTypes.INTEGER
  },
  category: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.JSON
  },
  on_sale: {
    type: DataTypes.BOOLEAN
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  brand: {
    type: DataTypes.STRING,  
  },
  rating: {
    type: DataTypes.FLOAT, 
    defaultValue: 0.0
  }
}, {
  timestamps: false,
  tableName: 'products'
});

export default Product;
