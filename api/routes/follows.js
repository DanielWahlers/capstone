import express from 'express';
import{create} from '../db.js';
import{remove} from '../db.js';
import {getCondition} from '../db.js';

const router = express.Router();

router.post('/', async (req,res)=>{
    const follow = req.body;
    const fields = ['follower', 'following'];
    const data = await create('follows', fields, follow);
    res.status(200).json(data);
});

router.delete('/:id', async (req,res)=>{
    const id = req.params;
    const data = await remove('follows', id);
    res.status(200).json(data);
});

router.get('/', async (req,res)=>{
    const user_id = req.body[0];
    const data = await getCondition('follows', 'follower', user_id);
    res.status(200).json(data);
});

export default router;