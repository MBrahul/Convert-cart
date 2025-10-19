import express from 'express'
import swaggerDocs from "./swagger.js";
import sequelize from './db.js';
import cors from 'cors';
import {router as productRouter} from './routes/product.js';
import cron from "node-cron";
import { fetchAndSaveProducts } from "./src/fetchProducts.js";

const app = express();

const PORT = 5500;

app.use(express.json());
app.use(cors());


await sequelize.sync({ alter: true });

// all routes related to product
app.use('/products',productRouter);


if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5500;
  app.listen(PORT, () => console.log('Server running on port', PORT));
}



// schedule periodic ingestion - every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled product ingestion...');
  try {
    await fetchAndSaveProducts();
    console.log(' Product ingestion complete');
  } catch (err) {
    console.error('Ingestion failed:', err.message);
  }
});

// run ingestion immediately on startup
(async () => {
  console.log("Running initial product ingestion on startup...");
  try {
    await fetchAndSaveProducts();
    console.log("Initial product ingestion complete");
  } catch (err) {
    console.error("Initial ingestion failed:", err.message);
  }
})();



export default app;


swaggerDocs(app); 