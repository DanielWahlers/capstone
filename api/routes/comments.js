import express from 'express';
import {getCondition} from '../db.js';

const router = express.Router();

router.get('/', async (req,res)=>{
    const condition1 = req.query.post_id;
    const data = await getCondition("comments", 'post_id', condition1);
    res.status(200).json(data);
});

export default router;