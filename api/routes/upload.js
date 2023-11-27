import express from "express";
import multer from 'multer';
import AWS from 'aws-sdk';

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

    console.log("making it inside the post function foe upload");
    const file = req.file;

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

    try{
        const awsResponse = await s3.upload(params).promise();
        console.log(awsResponse);
        res.status(200).send("File uploaded to S3 successfully!");
    } catch(error){
        console.error(error);
        res.status(500).send("Error uploading file to S3");
    }
});



export default router;