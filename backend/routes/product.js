import express from 'express';
import Product from '../models/Product.js';
import { Op } from 'sequelize';


export const router = express.Router();

// api to get all all products
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


router.post('/segments/evaluate', async (req, res) => {
  try {
    const { rules } = req.body;

    // baasic validation
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

    // allowed fields and operator
    const allowedFields = [
      'price', 'stock_status', 'stock_quantity', 'category',
      'on_sale', 'brand', 'rating'
    ];
    const allowedOperators = ['=', '!=', '>', '>=', '<', '<='];

    const where = {};

    // parse each rule line
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
            where[field] = {
              [Op.between]: [value - 0.01, value + 0.01] 
            };
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