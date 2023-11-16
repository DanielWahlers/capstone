import mysql2 from 'mysql2';
import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './routes/users.js';
import postsRoutes from './routes/posts.js';
import followsRoutes from './routes/follows.js';
import feedRoutes from './routes/feed.js';
import promotesRoutes from './routes/promotes.js';
import likesRoutes from './routes/likes.js';
import dislikeRoutes from './routes/dislikes.js';
import config from "./config.js";
import cors from 'cors';

const PORT = 5000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use('/users', usersRoutes);
app.use('/posts', postsRoutes);
app.use('/follows', followsRoutes);
app.use('/feed', feedRoutes);
app.use('/promotes', promotesRoutes);
app.use('/likes', likesRoutes);
app.use('/dislikes', dislikeRoutes);


const connection = mysql2.createConnection(config.db);

app.get("/", (req,res)=> {
    res.status(200).json({message: "ok"});
});

app.listen(PORT, () => {
    console.log(`Server: http://localhost:${PORT}`);
    connection.connect((err)=> {
        if(err) throw err;
        else {
            console.log("Database Connected")
        }
    });
});
