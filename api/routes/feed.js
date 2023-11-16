import express from 'express';
import {getFeedNew} from '../db.js';

const router = express.Router();

router.get('/', async (req,res)=>{
    try{
        let currentFeed = req.query.current_feed || "";
        currentFeed = currentFeed.split(',').map(id=>Number(id));
        console.log("stuff", currentFeed, req.query.current_feed);
        const user_id = req.query.user_id;
        const data = await getFeedNew(user_id, currentFeed);
        res.status(200).json(data);
    }
    catch(ex){
        console.log(ex);
        res.status(200).json([]);
    }
});

export default router;