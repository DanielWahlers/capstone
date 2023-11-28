import express from "express";
import multer from 'multer';
import AWS from 'aws-sdk';
import {create} from '../db.js';

const router = express.Router();

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) =>{
    //insert filters that determine file type here
    cb(null,true);
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1024* 1024* 100},
    fileFilter: fileFilter
});

router.post("/", upload.single("file"), async (req,res) =>{

    console.log("making it inside the post function for upload");
    console.log("req", req);
    const file = req.file;
    //const files = req.body;
    //console.log("files", files);

    const params = {
        Bucket: process.env.S3_BUCKET,
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });
    let awsResponse;
    try{
        awsResponse = await s3.upload(params).promise();
        console.log(awsResponse);
        // const title = req.title;
        // const user_id = req.user_id;
        // const result = await createPost(user_id,awsResponse.Location, title);
        // res.status(200).send(result);
    } catch(error){
        console.error(error);
        res.status(500).send({"Error": "Error uploading file to S3"});
        return;
    }

    const title = req.query.title;//This is where I need to change this
    console.log("title before createPost", title);
    const user_id = req.query.user_id;
    const caption = req.query.caption;
    const result = await createPost(user_id,awsResponse.Location, title, caption);
    res.status(200).send(result);
});

async function createPost(user_id, media_url, title, caption){
    let fields = ["title", "tags", "caption"];
    let data = {"title": title, "tags": "photography", "caption": caption};
    
    //console.log("Data:" + JSON.stringify(data));
    const post = await create('posts', fields, data);
    console.log("post", post);

    //console.log(id);

    fields = ["posts_id", "media_type", "media_link", "position"]
    let media_type;
    if(media_url.includes(".png"))
        media_type = "photo";
    else if(media_url.includes(".mp4"))
        media_type = "video";
    else if(media_url.includes(".mp3"))
        media_type = "audio";
    else
        console.log("There was a mistake with the file used")
    data = {"posts_id": post.insertId, "media_type": media_type, "media_link": media_url, "position": 0};
    //media = [content.media_type[i], i, content.media_link[i], data[0].insertId];
    const media = await create('media', fields, data);
    
    console.log("media", media);

    fields = ["user_id", "post_id", "signed"];
    data = {"user_id": user_id, "post_id": post.insertId, "signed": 1};
        // let author;
        // author = [users.users_ids[i], data[0].insertId, users.signed[i]];
    const author = await create('authors', fields, data);
    
    console.log("author", author);

    post.media = [media];
    post.authors = [author];
    //implement the create authors
    return post;
}




export default router;