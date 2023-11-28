import config from "./config.js";
import mysql2 from 'mysql2';


async function getAll(table){
    const connection = await mysql2.createConnection(config.db);
    const [results,] = await connection.promise().query(`SELECT * from ${table}`)
    connection.destroy();
    return results[0];
}

async function getOne(table, id){
    const connection = await mysql2.createConnection(config.db);
    const [results,] = await connection.promise().query(`SELECT * FROM ${table} WHERE id = ?`, id);
    connection.destroy();
    return results[0];
}

async function removeDoubleCondition(table, field1, condition1, field2, condition2){
    const connection = await mysql2.createConnection(config.db);
    const sql = `DELETE FROM ${table} WHERE ${field1} = ? AND ${field2} = ?`;
    const result = await connection.promise().query(
        sql, [condition1, condition2]
    );
    connection.destroy();
    return result[0];
}

async function create(table, fields, object){
    const connection = await mysql2.createConnection(config.db);
    let fieldsString = "";
    for (let i = 0; i < fields.length; i++) {
        fieldsString += fields[i] + ',';
      }

      let values = '';
         for(let i in object) { 
            values += "?,"; 
         }; 
    values = values.substring(0,values.length -1);
    fieldsString = fieldsString.substring(0, fieldsString.length -1);
    console.log(fieldsString);
    console.log("object", object);
    console.log(table);
    console.log(values);
    const args = fields.map(field => object[field]);
         console.log("args", args);
    let result = await connection.promise().query(
        `Insert into ${table} (${fieldsString})
        Values(${values})`, args
    );
    result = result[0];
    console.log(result);
    connection.destroy();
    return result;
}

async function getInteraction(table, field1, condition1, field2, condition2){
    const connection = await mysql2.createConnection(config.db);
    const result = await connection.promise().query(
        `select * from ${table} where ${field1} = ? and ${field2} = ?`, [condition1, condition2]
    );
    connection.destroy();
    return result[0];
}

async function remove(table, id){
    const connection = await mysql2.createConnection(config.db);
    const result = await connection.promise().query(
        `DELETE FROM ${table} WHERE id = ?`, [id]);
    connection.destroy();
    return result[0];
}

async function update(table, object){
    const connection = await mysql2.createConnection(config.db);
    const result = await connection.promise().query(
        `dfsdfdsfsdf`
    );
    connection.destroy();
}

async function removeCondition(table, field, condition){
    const connection = await mysql2.createConnection(config.db);
    const result = await connection.promise().query(
        `DELETE FROM ${table} WHERE ${field} = ?`, condition
    );
    connection.destroy();
}

async function getMany(table, field, conditions){
    const connection = await mysql2.createConnection(config.db);
    const result = await connection.promise().query(
        `SELECT * FROM ${table} WHERE ${field} IN (?)`, conditions
    );
    connection.destroy();
    return result[0];
}

async function getDoubleCondition(table, field1, condition1, field2, condition2){
    const connection = await mysql2.createConnection(config.db);
    const sql = `SELECT * FROM ${table} WHERE ${field1} = ? and ${field2} = ?`;
    console.log(sql, condition1, condition2);
    let result = await connection.promise().query(
        sql, [condition1, condition2]
    );
    // const sql = `SELECT * FROM ${table} WHERE ${field} IN (?)`;
    // console.log(sql, conditions, condition);
    // const result = await connection.promise().query(
    //     sql, [4, 2, 3]
    // );
    result = result[0][0];
    if(table == "users"){
        try{
            let profileResults = await getCondition("profile", "user_id", result.id);
        // result['media_link'] = profileResults.media_link;
            profileResults = profileResults[0];
            result.media_link = profileResults;
        //result.media_link.push(profileResults);
        } catch(error){
            console.log("Error: ", error);
        }
    }
    console.log(result);
    connection.destroy();
    return result;
}

async function getCondition(table, field, condition){
    const connection = await mysql2.createConnection(config.db);
    const result = await connection.promise().query(
        `SELECT * FROM ${table} WHERE ${field} = ?`, condition
    );
    connection.destroy();
    return result[0];
}

async function getComments(condition){
    const connection = await mysql2.createConnection(config.db);
    let results = await connection.promise().query(
        `SELECT * FROM comments WHERE post_id = ?`, condition
    );
    results = results[0];
    for(const result of results){
        let sql = `SELECT username FROM users WHERE id = ?`;
        let author = await connection.promise().query(
            sql, result.user_id
        );
        author = author[0];
        result.author = author;
    }
    connection.destroy();
    return results;
}

async function getInNotIn(num, table, good, bad){
    const connection = await mysql2.createConnection(config.db);
    const sql =  `SELECT * FROM ${table} WHERE id IN (?) AND id NOT IN (?) ORDER BY date_posted LIMIT ?`;
    console.log(sql, good, bad, num);
    const result = await connection.promise().query(
        sql, good, bad, num
    );
    connection.destroy();
    return result[0];//first list item is the list of objects and second list item is the schema... which we don't care about
}

//implement getFeed
async function getFeed(userId, currentFeed){
    //do all of the get functions here
    console.log("made it into getFeed");
    const loadNum = 4;
    let notList = [0];
    currentFeed.forEach((current) =>{
        notList[notList.length] = current.id;
    });
    console.log("notList", notList);
    let followerPosts = await getFollowerPosts(loadNum, userId, notList);
    console.log("made it out of getFollowerPosts");
    followerPosts.forEach((followerPost)=>{
        console.log("followerPost", followerPost);
        notList[notList.length] = followerPost.id;
    });
    let promoterPosts = await getPromoterPosts(loadNum, userId, notList);
    promoterPosts.forEach((promoterPost)=>{
        notList[notList.length] = promoterPost.id;
    });
    // let recommendedPosts = await getRecommendedPosts(userId, notList);
    // recommendedPosts.forEach((recommendedPost)=>{
    //     notList[notList.length] = recommendedPost.id;
    // });
    let randomPosts = await getRandomPosts(notList, loadNum);

    let followerNum, promoterNum, recommendedNum, randomNum = 0;
    
}

async function getFeedNew(userId, currentFeed){
    //do all of the get functions here
    console.log("made it into getFeed");
    const loadNum = 4;
    let notList = [];
    currentFeed.forEach((current) =>{
        notList[notList.length] = current;
    });
    console.log("notList", notList);
    const connection = await mysql2.createConnection(config.db);
    let sql = `select * from posts where id in (
        select post_id from authors where user_id in (
            select following from follows where follower = ?
        ) and signed = 1
        group by post_id
    ) order by date_posted desc;`
    let followerResults = await connection.promise().query(
        sql, userId
    );
   
    followerResults = followerResults[0];
    followerResults = followerResults.filter(post=> !notList.includes(post.id));
    followerResults.slice(0, Math.min(loadNum -1, followerResults.length -1));
    followerResults.forEach(post =>{
        notList[notList.length] = post.id
    });

    console.log("followerResults", followerResults);
    console.log("notList after followers", notList);
   

    sql =  `select * from posts where id in (
        select post_id from authors where user_id in(
            select distinct user_id from authors where post_id in (
                select post_id from promotes where user_id = ?
            )
        ) and signed = 1
        group by post_id
    ) order by date_posted;`;

    let promoteResults = await connection.promise().query(
        sql, userId
    );
    promoteResults = promoteResults[0];
    promoteResults = promoteResults.filter(post=>!notList.includes(post.id));
    promoteResults.slice(0, Math.min(loadNum -1, promoteResults.length -1));
    promoteResults.forEach(post=>{
        notList[notList.length] = post.id
    });
    console.log("promoteResults", promoteResults);
    console.log("notList after Promote", notList);

    sql = `select * from posts where id in(
        select post_id from authors where signed = 1
        group by post_id
    )`;
    let randomResults = await connection.promise().query(
        sql, notList, loadNum
    );
    randomResults = randomResults[0];
    randomResults = randomResults.filter(post=>!notList.includes(post.id));
    console.log("randomResults", randomResults);

    let followerNum = 0;
    let promoterNum = 0;
    let randomNum = 0;
    let newFeed = [];

    //there is the potential for a bug here... fix it!!
    for(let i = 0; i < loadNum; i++){
        let num = Math.floor(Math.random() * 100);
        if(num < 65){
            newFeed.push(followerResults[followerNum]);
            followerNum++;
        }
        else if (num < 80){
            newFeed.push(promoteResults[promoterNum]);
            promoterNum++;
        }
        //Commented out until fixed
        // else if (num < 92){
        //     currentFeed[currentFeed.length] = recommendedPosts[recommendedNum];
        //     recommendedNum++;
        // }
        else{
            newFeed.push(randomResults[randomNum]);
            randomNum++;
        }
    }
    //querying for media associated with the current feed
    newFeed = newFeed.filter(feed=>feed !== undefined);
    const postIds = newFeed.map(post=>post.id);
    sql = `select * from media where posts_id in (${postIds.join(', ')}) order by posts_id`;
    let mediaList = await connection.promise().query(
        sql
    );
    mediaList = mediaList[0];
    for(const post of newFeed){
        post.media = [];
        for(const media of mediaList){
            if(media.posts_id === post.id){
                post.media.push(media);
            }
        }
    }
    for( const post of newFeed){
        sql = `select * from users where id in (
            select user_id from authors where post_id = ?
        )`;
        let authors = await connection.promise().query(
            sql, post.id
        );
        authors = authors[0];
        post.authors = [];
        for (const author of authors){
            sql = `select * from profile where id in (select user_id from authors where post_id = ?)`;
            let profiles = await connection.promise().query(
            sql, post.id
            );
            profiles = profiles[0];
            author.profiles =  [];
            for (const profile of profiles){
                author.profiles.push(profile);
            }
            post.authors.push(author);
        }
    }
    console.log("newFeed", newFeed);
    connection.destroy();
    return newFeed;
    
}

async function getFollowerPosts(loadNum, userId, notList){
    const followers = await getCondition('follows','follower', userId);
    let followerIds = [];
    followers.forEach((follower)=>{
        followerIds[followerIds.length] = follower.following});
    console.log("followerIds:", followerIds);
    //const authored = await getManyWhere('authors', 'user_id', followerIds, 'signed', 1);
    const authored = await getMany('authors', 'user_id', followerIds);
    let postIds = [];
    authored.forEach((author)=>{postIds[postIds.length] = author.post_id});
    console.log('postIds:', postIds);
    console.log("authored:", authored);
    const results = await getInNotIn(loadNum, "posts", postIds, notList);
    connection.destroy();
    return results;
}

async function getPromoterPosts(loadNum, userId, notList){
    
    const promotions = await getCondition('promotes', 'user_id', userId);// get all posts that user has promoted
    let promoted = [];
    promotions.forEach((promote)=>{promoted[promoted.length] = promote.post_id});
    console.log("promoted", promoted);
    const promotedAuthors = await getMany('authors', 'post_id', promoted); //get authors of the posts you have promoted
    let promotedUsers = [];
    promotedAuthors.forEach((promotedAuthor)=>{
        console.log("promotedAuthor", promotedAuthor);
        promotedUsers[promotedUsers.length] = promotedAuthor.user_id
    });
    console.log("promotedUsers", promotedUsers);
    const usersPosts = await getManyWhere('authors', 'user_id', promotedUsers, 'signed', 1); //get all posts by authors of posts that you have promoted
    let postIds = [0];
    console.log("usersPosts",usersPosts);
    usersPosts.forEach((userPost)=>{
        console.log("userPost", userPost);
        postIds[postIds.length] = userPost.post_id
    });
    console.log("postIds", postIds);
    promoted.forEach((promote)=>{notList[notList.length] = promote});
    console.log("notList", notList);
    const results = await getInNotIn(loadNum, "posts", postIds, notList);
    connection.destroy();
    return results;
}

//GetHelp with this
async function getRecommendedPosts(userId, notList){
    const connection = await mysql2.getConnection(config.db);
    const likes = await getCondition('likes', 'user_id', userId);//might should order by date_posted
    let likedPosts;
    likes.forEach(likedPosts[likedPosts.length] = like.post_id);
    const posts = await getMany('posts', 'id', likedPosts);
    let postTags;
    posts.forEach(postTags[postTags.length] = post.tags);
    //implement search for posts with tags

    
}

async function getRandomPosts(notList, loadNum){
    const connection = await mysql2.getConnection(config.db);
    const postOptions= await connection.promise().query(
        `SELECT * FROM posts WHERE NOT IN (?)`, notList
    );
    let randomPosts;
    for(let i = 0; i < loadNum; i++){
        randomPosts[i] = postOptions[Math.floor(Math.random() * postOptions.length)];
    }
    connection.destroy();
    return randomPosts;
}

async function getAuthoredPosts(user_id){
    const connection = await mysql2.createConnection(config.db);
    console.log("user_id", user_id);
    let results = await connection.promise().query(
        `select * from posts where id in (select post_id from authors where user_id = ?)`, user_id
    );
    results = results[0];
    console.log("results", results);
    if(results.length == 0){
        connection.destroy();
    }
    else{
        const postIds = results.map(post=>post.id);
        console.log("postIds", postIds);
        let sql = `select * from media where posts_id in (${postIds.join(', ')})`;
        console.log("sql", sql);
        let mediaList = await connection.promise().query(
            sql
        );
        mediaList = mediaList[0];
        for(const post of results){
            post.media = [];
            for(const media of mediaList){
                if(media.posts_id === post.id){
                    post.media.push(media);
                }
            }
        }

        for(const post of results){
            sql = `select * from users where id in (
                select user_id from authors where post_id = ?)`;
                let authors = await connection.promise().query(
                    sql, post.id
                );
                authors = authors[0];
            post.authors = [];
            for(const author of authors){
                post.authors.push(author);
            }
        }
        connection.destroy();
    }
    
    return results;
}

async function getPromotions(user_id){
    const connection = await mysql2.createConnection(config.db);
    console.log("user_id", user_id);
    let results = await connection.promise().query(
        `select * from posts where id in (select post_id from promotes where user_id = ?)`, user_id
    );
    results = results[0];
    console.log("results", results);
    if(results.length == 0){
        connection.destroy();
    }
    else{
        const postIds = results.map(post=>post.id);
        console.log("postIds", postIds);
        let sql = `select * from media where posts_id in (${postIds.join(', ')})`;
        console.log("sql", sql);
        let mediaList = await connection.promise().query(
            sql
        );
        mediaList = mediaList[0];
        for(const post of results){
            post.media = [];
            for(const media of mediaList){
                if(media.posts_id === post.id){
                    post.media.push(media);
                }
            }
        }

        for(const post of results){
            sql = `select * from users where id in (
                select user_id from authors where post_id = ?)`;
                let authors = await connection.promise().query(
                    sql, post.id
                );
                authors = authors[0];
            post.authors = [];
            for(const author of authors){
                post.authors.push(author);
            }
        }
        connection.destroy();
    }
    
    return results;
}

async function getLikedPosts(user_id){
    const connection = await mysql2.createConnection(config.db);
    console.log("user_id", user_id);
    let results = await connection.promise().query(
        `select * from posts where id in (select post_id from likes where user_id = ?)`, user_id
    );
    results = results[0];
    console.log("results", results);
    if(results.length == 0){
        connection.destroy();
    }
    else{
        const postIds = results.map(post=>post.id);
        console.log("postIds", postIds);
        let sql = `select * from media where posts_id in (${postIds.join(', ')})`;
        console.log("sql", sql);
        let mediaList = await connection.promise().query(
            sql
        );
        mediaList = mediaList[0];
        for(const post of results){
            post.media = [];
            for(const media of mediaList){
                if(media.posts_id === post.id){
                    post.media.push(media);
                }
            }
        }

        for(const post of results){
            sql = `select * from users where id in (
                select user_id from authors where post_id = ?)`;
                let authors = await connection.promise().query(
                    sql, post.id
                );
                authors = authors[0];
            post.authors = [];
            for(const author of authors){
                post.authors.push(author);
            }
        }
        connection.destroy();
    }
    
    return results;
}

export{
    getAll,
    getOne,
    create,
    remove,
    update,
    getCondition,
    getMany,
    getFeed,
    removeDoubleCondition,
    getFeedNew,
    getInteraction,
    getPromotions,
    getDoubleCondition, 
    getAuthoredPosts,
    getLikedPosts,
    getComments
};