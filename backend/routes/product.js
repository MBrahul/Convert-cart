import express from 'express';
import Product from '../models/Product.js';
import { Op } from 'sequelize';

export const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints related to product management
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successfully fetched all products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Product Name"
 *                       price:
 *                         type: number
 *                         example: 499.99
 *                       category:
 *                         type: string
 *                         example: "Electronics"
 *       500:
 *         description: Internal Server Error
 */

// API to get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({
      status: true,
      data: products
    });
  } catch (error) {
    res.json({
      status: false,
      error: "Internal Server Error"
    });
  }
});

/**
 * @swagger
 * /api/products/segments/evaluate:
 *   post:
 *     summary: Evaluate and filter products based on given rules
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rules:
 *                 type: string
 *                 example: |
 *                   price > 100
 *                   rating >= 4
 *                   category = "Electronics"
 *     responses:
 *       200:
 *         description: Successfully evaluated segment and returned filtered products
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 count:
 *                   type: integer
 *                   example: 5
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Product Name"
 *                       price:
 *                         type: number
 *                         example: 499.99
 *       400:
 *         description: Invalid input or missing fields in rules
 *       500:
 *         description: Internal Server Error during segment evaluation
 */

router.post('/segments/evaluate', async (req, res) => {
  try {
    const { rules } = req.body;

    // basic validation
    if (!rules || typeof rules !== 'string') {
      return res.status(400).json({
        status: false,
        error: "Missing or invalid 'rules' input. It must be a text string."
      });
    }

    const lines = rules.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) {
      return res.status(400).json({
        status: false,
        error: "No valid conditions provided. Each line should be a condition."
      });
    }

    const allowedFields = [
      'price', 'stock_status', 'stock_quantity', 'category',
      'on_sale', 'brand', 'rating'
    ];
    const allowedOperators = ['=', '!=', '>', '>=', '<', '<='];

    const where = {};

    for (const line of lines) {
      const [field, operator, ...rest] = line.split(' ').map(x => x.trim());
      const valueRaw = rest.join(' ').replace(/['"]/g, '');

      if (!allowedFields.includes(field)) {
        return res.status(400).json({
          status: false,
          error: `Invalid field '${field}'. Allowed fields: ${allowedFields.join(', ')}`
        });
      }

      if (!allowedOperators.includes(operator)) {
        return res.status(400).json({
          status: false,
          error: `Unsupported operator '${operator}'. Allowed: ${allowedOperators.join(', ')}`
        });
      }

      if (!valueRaw) {
        return res.status(400).json({
          status: false,
          error: `Missing value in rule: "${line}"`
        });
      }

      let value = valueRaw;
      if (!isNaN(valueRaw) && valueRaw.trim() !== '') {
        value = parseFloat(valueRaw);
      }

      switch (operator) {
        case '=':
          if (typeof value === 'number') {
            where[field] = { [Op.between]: [value - 0.01, value + 0.01] };
          } else {
            where[field] = value;
          }
          break;
        case '!=':
          where[field] = { [Op.ne]: value };
          break;
        case '>':
          where[field] = { [Op.gt]: value };
          break;
        case '>=':
          where[field] = { [Op.gte]: value };
          break;
        case '<':
          where[field] = { [Op.lt]: value };
          break;
        case '<=':
          where[field] = { [Op.lte]: value };
          break;
      }
    }

    const result = await Product.findAll({ where });

    res.json({
      status: true,
      count: result.length,
      data: result,
    });

  } catch (err) {
    console.error("segment evaluation error:", err);
    res.status(500).json({
      status: false,
      error: "internal server error during segment evaluation."
    });
  }
});

export default router;
