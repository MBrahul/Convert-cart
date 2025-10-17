import express from 'express';
import Product from '../models/Product.js';
import { Op } from 'sequelize';


export const router = express.Router();

// api to get all all products
router.get('/',async(req,res)=>{
   try {
    const products = await Product.findAll();
    res.json({
        status:true,
        data:products
    });
   } catch (error) {
    res.json({
        status:false,
        error:"Internal Server Error"
    });
   }
});

// api to get filtered products
router.post('/segments/evaluate', async (req, res) => {
  try {
    const { rules } = req.body;
    const lines = rules.split('\n').filter(Boolean);
    const where = {};

    for (const line of lines) {
      const [field, operator, valueRaw] = line.split(' ').map(x => x.trim());
      let value = valueRaw?.replace(/['"]/g, '');


      if (operator === '=') where[field] = value;
      else if (operator === '>') {
        where[field] = { [Op.gt]: value };
      }
      else if (operator === '<') {
        where[field] = { [Op.lt]: value };
      }
    
    }
    // console.log(where);
    const result = await Product.findAll({ where });
    res.json({
        status:true,
        data:result
    });
  } catch (err) {
    // console.log(err);
    res.status(400).json({
        status:false,
        error:"Invalid Query"
    });
  }
});

export default router;
