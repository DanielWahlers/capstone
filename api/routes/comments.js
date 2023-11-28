import express from 'express';
import {getComments} from '../db.js';
import {create} from '../db.js';

const router = express.Router();

router.get('/', async (req,res)=>{
    const condition1 = req.query.post_id;
    const data = await getComments(condition1);
    res.status(200).json(data);
});

router.post('/', async (req,res)=>{
    const comment_text = req.query.comment_text;
    const post_id = req.query.post_id;
    const user_id = req.query.user_id;
    const fields = ["comment_text", "post_id", "user_id", "comment_type"];
    const object = {"comment_text": comment_text, "post_id": post_id, "user_id": user_id, "comment_type": "regular"};
    const data = await create("comments", fields, object);
    res.status(200).json(data);
})

export default router;