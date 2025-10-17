import cron from "node-cron";
import { fetchAndSaveProducts } from "./fetchProducts.js";

console.log("Scheduler started...");

// run this every 6 hours
cron.schedule("0 */6 * * *", async () => {
  console.log("Running product fetch job...");
  await fetchAndSaveProducts();
  console.log("job completed at", new Date().toLocaleString());
});

await fetchAndSaveProducts();
