import react from 'react'
import { Tabs } from 'antd';
import Feed from './Feed.js';
import {useState} from 'react';
// import users from '../../../profile/src/users.json'

export default function Heading({user}){
    const tabNames= ["posts", "promotions", "likes"];
    const [tab, setTab] = useState(()=> "posts");

    const onChange = (key) => {
        console.log(key);
        setTab(key);
      };

    function tabPosts(){
        setTab("posts");
    }

    function tabPromotions(){
        setTab("promotions");
    }

    function tabLikes(){
        setTab("likes");
    }
    function getTab(id){
        if(tab != id){
            setTab(id);
        }
    }

    function getPosts(){
        return (<p>This is posts</p>)
    }

    return(
        <div>
            <section id="banner">
                <img id="profile-pic" src={user.media_link.media_link}/>
                <img id="background-img" src="https://picsum.photos/1300/220?id=1"/>
                <div id="banner-content">
                    <h1 id="username" >{user.username}</h1>
                    <h3>{user.bio}</h3>
                </div>
            </section>
            <section>
                <div id="below-banner">
                    <div id="controls" className="flexbar">
                        <p>This is where announcements would go</p>
                        <Tabs
                            onChange={onChange}
                            type="card"
                            items={new Array(3).fill(null).map((_, i) => {
                            const id = tabNames[i];
                            return {
                                label: `${id}`,
                                key: id
                                };
                            })}
                        />
                    </div>
                    <Feed tab={tab} user={user}/>
                    <div id="friends">Friends:</div>
                </div>
            </section>
        </div>
    );
}