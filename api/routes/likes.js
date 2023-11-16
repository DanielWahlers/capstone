import express from 'express';
import {create} from '../db.js';
import {removeDoubleCondition} from '../db.js';
import {getInteraction} from '../db.js';

const router = express.Router();

router.get('/', async (req,res)=>{
    const field1 = 'user_id';
    const condition1 = req.query.user_id;
    const condition2 = req.query.post_id;
    const field2 = 'post_id';
    console.log("condition1", condition1);
    console.log("condition2", condition2);
    const data = await getInteraction('likes', field1, condition1, field2, condition2);
    res.status(200).json(data);
});

router.post('/', async(req,res)=>{
    const fields = ['user_id', 'post_id'];
    const object = req.query;
    const data = await create('likes', fields, object);
    res.status(200).json(data);
});

router.delete('/', async(req,res)=>{
    const field1 = 'user_id';
    const field2 = 'post_id';
    const condition1 = req.query.user_id;
    const condition2 = req.query.post_id;
    const data= await removeDoubleCondition('likes', field1, condition1, field2, condition2);
    res.status(200).json(data);
});

export default router;