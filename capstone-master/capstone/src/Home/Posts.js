import React from "react";
import Post from "./Post.js";
import {useState, useEffect} from "react";
import {Button} from 'antd';

const apiString = "http://localhost:5000";

export default function Posts({user}){
    //logic for pulling the media link from the data
    //logic for carousel buttons
    const trendNum = 21;

    const [posts, setPosts] = useState([]);

    async function generatefeed(ev){
        if(ev){
            ev.preventDefault();
        }
        
        // setPosts(prevPosts => {
        //     fetch(apiString + `/feed`,
        //     {
        //         method: "GET",
        //         body:{userId, prevPosts}
        //     })
        //     .then((res) => {return res.json()})
        // })
        let currentFeed = posts.map(post=>post.id).join(',');
        console.log(currentFeed);
        console.log("user.id", user.id);
        const url = apiString + `/feed?user_id=${user.id}&current_feed=${currentFeed}`;
        console.log("url", url);
        const res = await fetch(url);
        const newPosts = await res.json();
        console.log(newPosts);
        let temp = posts.concat(newPosts);
        setPosts(temp);
    }

    useEffect(()=>{
        generatefeed();
    },[]);

    return(
        <section id="feed">
            {posts && posts.map(post => <Post key={post.id} post={post} user={user} trendNum={trendNum}/>)}
            <button onClick={generatefeed}>more</button>
        </section>
    )
}

