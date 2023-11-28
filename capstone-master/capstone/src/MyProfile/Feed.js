import react from 'react';
import Art from './Art.js';
import {useNavigate} from 'react-router-dom';
import {useState, useEffect} from 'react';
// import users from '../../../profile/src/users.json'
// import posts from '../../../profile/src/posts.json'
// import likes from '../../../profile/src/likes.json';

export default function Feed({tab, user}){
    const navigate = useNavigate();
    const [myPosts, setMyPosts] = useState([]);
    const [myLiked, setMyLiked] = useState([]);
    const [myPromotes, setMyPromotes] = useState([]);
    const apiString = "http://localhost:5000";
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

    async function getMyPosts(){
        //call api to get authors that match user.id and get the post ids that match the author objects
        const url =  apiString + `/profile/posted?user_id=${user.id}`;
        const res = await fetch(url);
        const results = await res.json();

        console.log("results", results);
        setMyPosts(results);
    }

    async function getMyLikes(){
        // call api to get likes that match user.id and get the post ids that match the like objects
        const url = apiString + `/profile/liked?user_id=${user.id}`;
        const res = await fetch(url);
        const results = await res.json();
        setMyLiked(results);
    }

    async function getMyPromotions(){
        // call api to get promotes that match user.id and get the post ids that match the promotes objects
        const url = apiString + `/profile/promoted?user_id=${user.id}`;
        const res = await fetch(url);
        const results = await res.json();
        setMyPromotes(results);
    }

    function createPin(){
        navigate("/create", {state: {user: user}})
    }

    function displayMyPosts(){
        //myPosts.map(post => <Art post={post}/>)

        console.log("displayMyPosts", myPosts);
        const displayPosts = myPosts.forEach(post => <Art post={post}/>);
        console.log("displayPosts", displayPosts);
        return ({displayPosts})
    }

    function displayMyLiked(){
        return(<div><p>This is liked</p></div>);
    }

    function displayMyPromotes(){

        return( <div><p>This is promotes</p></div>);
    }

    useEffect(()=>{
        getMyPosts();
        getMyPromotions();
        getMyLikes();
        //console.log("myPosts", myPosts);
    },[]);

    return(
        <section id="feed">
            <div>
                {/* <p>This is what should be here {tab}</p> */}
                {(() => {
                if (tab === "posts") {
                    //<p>{myPosts[0].title}</p>
                    //displayMyPosts();
                    return (<section>
                        <button id="create-button" onClick={createPin}>Create Pin</button>
                        {myPosts.map((post) => {if(post.media[0].media_type === "photo")return <img className="myPosts" src={post.media[0].media_link}/>
                                                else if(post.media[0].media_type ==="video") return <video controls><source src={post.media[0].media_link}/></video>
                                                else if(post.media[0].media_type === "audio") return <audio controls><source src={post.media[0].media_link}/></audio>
                                                else return <p>There was a problem loading the media</p>})}
                        </section>)
                } else if (tab === "promotions"){
                    return (<section>
                        {myPromotes.map((post) => {if(post.media[0].media_type === "photo")return <img className="myPosts" src={post.media[0].media_link}/>
                                                else if(post.media[0].media_type ==="video") return <video controls><source src={post.media[0].media_link}/></video>
                                                else if(post.media[0].media_type === "audio") return <audio controls><source src={post.media[0].media_link}/></audio>
                                                else return <p>There was a problem loading the media</p>})}
                    </section>)
                }
                else{
                    return (<section>
                        {myLiked.map((post) => {if(post.media[0].media_type === "photo")return <img className="myPosts" src={post.media[0].media_link}/>
                                                else if(post.media[0].media_type ==="video") return <video controls><source src={post.media[0].media_link}/></video>
                                                else if(post.media[0].media_type === "audio") return <audio controls><source src={post.media[0].media_link}/></audio>
                                                else return <p>There was a problem loading the media</p>})}
                        </section>)
                }
                })()}
                {/* <button onClick={createPin}>create</button> */}
            </div>
        </section>
    )
}