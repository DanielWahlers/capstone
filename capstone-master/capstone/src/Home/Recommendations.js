import react from 'react';
import SplitPane from "split-pane-react";
import {useState, useEffect} from "react";
import "split-pane-react/esm/themes/default.css";

export default function Recommendations({post, sizes, setSizes, toggle}){
    
    const apiString = "http://localhost:5000";
    const [promotions, setPrommotions] = useState([]);
    const [otherPosts, setOtherPosts] = useState([]);

    // function toggle() {
    //     if(sizes[0] == "95%"){
    //         document.getElementById("authored-section" + post.id).style.opacity = 0;
    //         document.getElementById("promoted-section" + post.id).style.opacity = 1;
    //     }
    //     else{
    //         document.getElementById("promoted-section" + post.id).style.opacity = 0;
    //         document.getElementById("authored-section" + post.id).style.opacity = 1;
    //     }
    //     setSizes(sizes[0] == "95%" ? ["auto", "95%"] : ["95%", "auto"]);
        
    // }
    function dontToggle(){

    }

    //adapt for multiple authors
    async function getPromotions(){
        //if(!promotions){
            const url = apiString + `/promotes?user_id=${post.authors[0].id}`;
            console.log("url", url);
            const res = await fetch(url);
            const promos = await res.json();
            setPrommotions(promos);
        //}
    }

    async function getOtherPosts(){
        const url = apiString + `/authors?user_id=${post.authors[0].id}`;
        console.log("url:", url);
        const res = await fetch(url);
        const others = await res.json();
        setOtherPosts(others);
    }

    useEffect(()=>{
        getPromotions();
        getOtherPosts();
    },[]);

    function displayOtherPosts(){
        if(otherPosts.length === 0){
            return ( <p>This User Hasn't Pinned Anything Else</p>);
        }
        const selectedOtherPosts = otherPosts.filter((other,idx)=> idx < 3);
        return selectedOtherPosts.map(other =>{
            return (
            <div className="promotions" key={other.id}>
                <img src={other.media[0].media_link}/>
                    <div>
                    <h4>{other.title}</h4>
                    {other.authors.map((author)=>{
                        return (<div id="promo-usernames">
                                {author.username}
                            </div>
                        )
                    })}
                    </div>
            </div>)
        })
    }

    function displayPromotions(){
        if(promotions.length === 0){
            return ( <p>This User Hasn't Promoted Anything Yet</p>);
        }
        const selectedPromotions = promotions.filter((promo,idx)=> idx < 3);
        return selectedPromotions.map(promo =>{
            return (
            <div id="promotions" className="promotions" key={promo.id}>
                <img src={promo.media[0].media_link}/>
                    <div>
                    <h4>{promo.title}</h4>
                    {promo.authors.map((author)=>{
                        return (<div id="promo-usernames">
                                {author.username}
                            </div>
                        )
                    })}
                    </div>
            </div>)
        })
        //let num = Math.floor(Math.random() * promotions.length);
        //return (<div className="promotion"><p>{promotions[num].title}</p></div>)
    }

    return(
        <section className="recommendations" >
             <SplitPane className="panes" split="vertical" sizes={sizes} onChange={setSizes}>
                <div id="author-posts" className="pane" onClick={sizes[0] == "95%"? dontToggle : toggle}>
                    <section className="authored-section" id={"authored-section" + post.id}>
                        <h3>Other Pins By This User</h3>
                        {displayOtherPosts()}
                    </section>
                </div>
                <div id="promoted-posts" className="pane" onClick={sizes[0] == "95%"? toggle : dontToggle}>
                    <section className="promoted-section" id={"promoted-section" + post.id}>
                        <h3>Pins This User Has Promoted</h3>
                        {displayPromotions()}
                    </section>
                </div>
            </SplitPane>
        </section>
    )

};