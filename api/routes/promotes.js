import express from "express";
import {create} from '../db.js';
import {removeDoubleCondition} from '../db.js';
import {getInteraction} from '../db.js';
import {getPromotions} from '../db.js';

const router = express.Router();

router.get('/', async (req,res)=>{
    const condition1 = req.query.user_id;
    const data = await getPromotions(condition1);
    console.log("getPromotionsData:", data);
    res.status(200).json(data);
});

router.post('/', async (req,res)=>{
    const info = req.query;
    const fields = ['user_id', 'post_id'];
    const data = await create('promotes', fields, info);
    res.status(200).json(data);
});

router.delete('/', async (req,res)=>{
    const field1 = 'user_id';
    const field2 = 'post_id';
    const condition1 = req.query.user_id;
    const condition2 = req.query.post_id;
    const data = await removeDoubleCondition("promotes", field1, condition1, field2, condition2);
    res.status(200).json(data);
});

export default router;