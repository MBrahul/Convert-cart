import request from "supertest";
import app from "../index.js"; 
import sequelize from "../db.js";
import Product from "../models/Product.js";

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Product.bulkCreate([
    {
      id: 1,
      title: "Nike Shoes",
      price: 1200,
      stock_status: "instock",
      stock_quantity: 10,
      category: "Footwear",
      tags: ["sport"],
      on_sale: true,
      created_at: new Date(),
      brand: "Nike",
      rating: 4.5,
    },
    {
      id: 2,
      title: "Adidas T-shirt",
      price: 800,
      stock_status: "outofstock",
      stock_quantity: 0,
      category: "Clothing",
      tags: ["casual"],
      on_sale: false,
      created_at: new Date(),
      brand: "Adidas",
      rating: 3.8,
    },
  ]);
});

afterAll(async () => {
  await sequelize.close();
});

describe("POST /products/segments/evaluate", () => {
  it("should return filtered products when valid rules are given", async () => {
    const res = await request(app)
      .post("/products/segments/evaluate")
      .send({ rules: "price > 1000\nstock_status = instock" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].title).toBe("Nike Shoes");
  });

  it("should reject invalid field names", async () => {
    const res = await request(app)
      .post("/products/segments/evaluate")
      .send({ rules: "unknown_field = test" });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
  });

  it("should reject unsupported operators", async () => {
    const res = await request(app)
      .post("/products/segments/evaluate")
      .send({ rules: "price ^^ 100" });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe(false);
  });
});


afterAll(async () => {
  // Close DB connection
  if (sequelize && sequelize.close) {
    await sequelize.close();
  }
});

