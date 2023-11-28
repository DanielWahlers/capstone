import react from 'react'
import { Tabs } from 'antd';
import Feed from './Feed.js';
import {useState} from 'react';
// import users from '../../../profile/src/users.json'

export default function Heading({author}){
    const tabNames= ["posts", "promotions"];
    const [tab, setTab] = useState(()=> "posts");

    const onChange = (key) => {
        console.log(key);
        setTab(key);
      };
  

    function getPosts(){
        return (<p>This is posts</p>)
    }

    return(
        <div>
            <section id="banner">
                <img id="profile-pic" src={author.media_link}/>
                <img id="background-img" src="https://picsum.photos/1300/220?id=1"/>
                <div id="banner-content">
                    <h1 id="username" >{author.username}</h1>
                    <h3>{author.bio}</h3>
                </div>
            </section>
            <section>
                <div id="below-banner">
                    <div id="controls" className="flexbar">
                        <p>This is where announcements would go</p>
                        <Tabs
                            onChange={onChange}
                            type="card"
                            items={new Array(2).fill(null).map((_, i) => {
                            const id = tabNames[i];
                            return {
                                label: `${id}`,
                                key: id
                                };
                            })}
                        />
                    </div>
                    <Feed tab={tab} author={author}/>
                    <div id="friends">Friends:</div>
                </div>
            </section>
        </div>
    );
}