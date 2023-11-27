import express from 'express';
import {getAuthoredPosts} from '../db.js';
import {getLikedPosts} from '../db.js';
import {getPromotions} from '../db.js';

const router = express.Router();

router.get('/posted', async (req,res)=>{
    const condition1 = req.query.user_id;
    const data = await getAuthoredPosts(condition1);
    res.status(200).json(data);
});

router.get('/liked', async (req,res)=>{
    const condition1 = req.query.user_id;
    const data = await getLikedPosts(condition1);
    res.status(200).json(data);
});

router.get('/promoted', async (req,res)=>{
    const condition1 = req.query.user_id;
    const data = await getPromotions(condition1);
    res.status(200).json(data);
});

export default router;