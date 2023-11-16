import express from 'express';
import {getAll} from '../db.js';
import {getOne} from '../db.js';
import {create} from '../db.js';
import {remove} from '../db.js';
import {update} from '../db.js';
import {getCondition} from '../db.js';

const router = express.Router();

//methods
router.get("/", async (req, res)=> {
    const data = await getAll("posts");
    res.status(200).json(data);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const post = await getOne("posts", id);
    const userId = post.users_id;
    const user = await getOne('users', userId);
    post.user = user;
    const media = await getCondition('media', 'posts_id', id);
    post.media = media;
    const authors = await getCondition('authors', 'post_id', id);
    console.log('authors', authors);
    post.authors = authors;
    // might need to make authors into just a list of the id's
    //const users = await getMany('users', 'id', authors[?]);
    //post.users = users;
    res.status(200).json(post);
});

router.post("/", async (req, res) =>{
    //these need to be distilled to their components
    const users = req.body[0];
    const post = req.body[1];
    const content = req.body[2];
    let fields = ['title', 'caption', 'location', 'tags'];
   
    //this needs to happen first
    const data = await create('posts', fields, post);
    fields = ["media_type", "position", "media_link", "posts_id"];
    
    //console.log("Data:" + JSON.stringify(data));

    const id = data[0].insertId
    //console.log(id);

    for(let i = 0; i < content.media_link.length; i++){
        let media;
        media = [content.media_type[i], i, content.media_link[i], data[0].insertId];
        const data2 = await create('media', fields, media);
    }

    fields = ["user_id", "post_id", "signed"];

    for(let i = 0; i < users.users_ids.length; i++){
        let author;
        author = [users.users_ids[i], data[0].insertId, users.signed[i]];
        const data3 = await create('authors', fields, author);
    }
    //implement the create authors
    res.status(200).json(data)
});

router.delete("/:id", async (req, res) => {
    const id = req.params;
    const data = await remove("posts", id);
    res.status(200).json(data);
});

router.patch("/:id", async (req, res) => {
    const user = req.body;
    const data = await update("posts", body);
    res.status(200).json(data);
});

export default router;
