
import React from 'react';
import Art from './Art';
import Artist from './Artist';
import { useState } from 'react';
import Recommendations from './Recommendations.js';

export default function Post({post, user, trendNum}){
    const [sizes, setSizes] = useState(["auto", "95%"]);

    const [sideMode, setSideMode] = useState(() => 'trending');
    //const user= users[post.user_id]; FIX THIS PROBLEM!!!!!


    function showSelfPromotions(){
        console.log('showSelfPromotions');
        const art = document.getElementById("art-" + post.id);
        art.style.opacity = 1;
        setSideMode('self');
    }
   

    
    console.log("post", sideMode);
    return(
        <section id={"post-" + post.id} className="post">
            <Artist post={post} user={user} setSizes={setSizes}/>
            <Art post={post} />
            <Recommendations post={post} sizes={sizes} setSizes={setSizes}/>
        </section>
        // <section id={"post-" + post.id} className="post">
        //     {post.title}
        //     <p>{post.caption}</p>
        //     {post.media.map(media=>{
        //         return <img src={media.media_link} />
        //     })}
        // </section>
    )
}