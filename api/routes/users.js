import express from 'express';
import {getAll} from '../db.js';
import {getOne} from '../db.js';
import {create} from '../db.js';
import {remove} from '../db.js';
import {update} from '../db.js';

const router = express.Router();

router.get("/", async (req, res)=> {
    const data = await getAll("users");
    res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await getOne("users", id);
    res.status(200).json(data);
});

router.post("/", async(req, res) =>{
    const user = req.body;
    console.log("user", user);
    const fields = ['username', 'first_name', 'last_name', 'user_password', 'email'];
    const data = await create('users', fields, user);
    res.status(200).json(data);
});

router.delete("/:id", async (req, res) => {
    const id = req.params;
    const data = await remove("users", id);
    res.status(200).json(data);
});

router.patch("/", async (req, res) => {
    const user = req.body;
    const data = await update("users", body);
    res.status(200).json(data);
});

export default router;