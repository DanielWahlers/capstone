import express from "express";
import {getAuthoredPosts} from "../db.js";

const router = express.Router();

router.get('/', async (req,res)=>{
    const condition1 = req.query.user_id;
    const data = await getAuthoredPosts(condition1);
    console.log("getPromotionsData:", data);
    res.status(200).json(data);
});

export default router;