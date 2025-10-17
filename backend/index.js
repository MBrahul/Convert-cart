import express from 'express'
import sequelize from './db.js';
import cors from 'cors';
import {router as productRouter} from './routes/product.js';

const app = express();

const PORT = 5500;

app.use(express.json());
app.use(cors());


await sequelize.sync({ alter: true });

// all routes related to product
app.use('/products',productRouter);


app.listen(PORT, () => console.log('Server running on port', PORT));


