import react from 'react';
import Art from './Art.js';
// import users from '../../../profile/src/users.json'
// import posts from '../../../profile/src/posts.json'
// import likes from '../../../profile/src/likes.json';

export default function Feed({tab}){
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

    return(
        <section id="feed">
            <div>
                {displayTab}
                <p>This is what should be here {tab}</p>
            </div>
        </section>
    )
}