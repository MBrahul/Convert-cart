import axios from 'axios';
import Product from '../models/Product.js';
import sequelize from '../db.js';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.BASE_URL;
const key = process.env.KEY;
const secret = process.env.SECRET;

export async function fetchAndSaveProducts() {
  try {
    await sequelize.sync();
    console.log("Database synced successfully.");

    const { data: products } = await axios.get(
      `${baseUrl}?consumer_key=${key}&consumer_secret=${secret}`
    );

    let count = 0;

    for (const p of products) {
      await Product.upsert({
        id: p.id,
        title: p.name,
        price: p.price && !isNaN(p.price) ? parseFloat(p.price) : 0,
        stock_status: p.stock_status,
        stock_quantity: p.stock_quantity ?? null,
        category: p.categories?.[0]?.name || null,
        tags: p.tags?.map(t => t.name) || [],
        on_sale: p.on_sale,
        created_at: p.date_created,
        brand: p.brands?.map(b => b.name).join(', ') || null,
        rating: p.average_rating ? parseFloat(p.average_rating) : 0.0,
      });
      count++;
    }

    console.log(`${count} products saved to MySQL`);
  } catch (err) {
    console.error("Error while fetching products:", err.message);
  }
}


if (import.meta.url === `file://${process.argv[1]}`) {
  fetchAndSaveProducts().then(() => process.exit(0));
}
