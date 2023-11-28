import react from 'react';
import Art from './Art.js';
import {useState,useEffect} from 'react';
// import users from '../../../profile/src/users.json'
// import posts from '../../../profile/src/posts.json'
// import likes from '../../../profile/src/likes.json';

export default function Feed({tab, author}){
    const apiString = "http://localhost:5000";
    const [thePosts, setThePosts] = useState([]);
    const [thePromotes, setThePromotes] = useState([]);

    // const user = users[user_id];
    // console.log(posts.filter(post => post.id === user.posts));

    // function changeTab(){
    //     if(tab === "posts"){
    //         return (user.posts.map(post => <Art post={posts[post]}/>));
    //     }
    //     else if(tab === "promotions"){
    //         return (user.promotions.map(post => <Art post={posts[post]}/>));
    //     }
    //     else if(tab === "likes"){
    //         console.log("likes:", user.likes.map(post => <Art post={posts[post]}/>));
    //         return(user.likes.map(like => <Art post={posts[likes[like].post_id]}/>));
    //     }
    //     else{
    //         return(`Something didn't load`);
    //     }
    // }
    
    function displayTab(){
        console.log("Tab", tab);
        if(tab == "posts"){
            return `<p>This is posts</p>`
        }
        else if(tab == "promotions"){
            return `<p>This is promotions</p>`
        }
        else
        return `<p>This is liked posts</p>`
    }

    async function getMyPosts(){
        //call api to get authors that match user.id and get the post ids that match the author objects
        const url =  apiString + `/profile/posted?user_id=${author.id}`;
        const res = await fetch(url);
        const results = await res.json();

        console.log("results", results);
        setThePosts(results);
    }

    async function getMyPromotions(){
        // call api to get promotes that match user.id and get the post ids that match the promotes objects
        const url = apiString + `/profile/promoted?user_id=${author.id}`;
        const res = await fetch(url);
        const results = await res.json();
        setThePromotes(results);
    }

    useEffect(()=>{
        getMyPosts();
        getMyPromotions();
        //console.log("myPosts", myPosts);
    },[]);

    return(
        <section id="feed">
            <div>
                {/* {displayTab}
                <p>This is what should be here {tab}</p> */}
                {(() => {
                if (tab === "posts") {
                    //<p>{myPosts[0].title}</p>
                    //displayMyPosts();
                    return (<section>
                        {thePosts.map((post) => {if(post.media[0].media_type === "photo")return <img className="myPosts" src={post.media[0].media_link}/>
                                                else if(post.media[0].media_type ==="video") return <video controls><source src={post.media[0].media_link}/></video>
                                                else if(post.media[0].media_type === "audio") return <audio controls><source src={post.media[0].media_link}/></audio>
                                                else return <p>There was a problem loading the media</p>})}
                        </section>)
                } else if (tab === "promotions"){
                    return (<section>
                        {thePromotes.map((post) => {if(post.media[0].media_type === "photo")return <img className="myPosts" src={post.media[0].media_link}/>
                                                else if(post.media[0].media_type ==="video") return <video controls><source src={post.media[0].media_link}/></video>
                                                else if(post.media[0].media_type === "audio") return <audio controls><source src={post.media[0].media_link}/></audio>
                                                else return <p>There was a problem loading the media</p>})}
                    </section>)
                }
                })()}
            </div>
        </section>
    )
}