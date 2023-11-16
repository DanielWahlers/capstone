import react from 'react';
import SplitPane from "split-pane-react";
import {useState, useEffect} from "react";
import "split-pane-react/esm/themes/default.css";

export default function Recommendations({post, sizes, setSizes}){
    
    const apiString = "http://localhost:5000";
    const [promotions, setPrommotions] = useState([]);

    function toggle() {
        setSizes(sizes[0] == "95%" ? ["auto", "95%"] : ["95%", "auto"]);
        
    }
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

    useEffect(()=>{
        getPromotions();
    },[]);

    function displayPromotions(){
        if(promotions.length === 0){
            return ( <p>Nothing to see</p>);
        }
        const selectedPromotions = promotions.filter((promo,idx)=> idx < 3);
        return selectedPromotions.map(promo =>{
            return (
            <div className="promotion" key={promo.id}>
                <p>{promo.title}</p>
            </div>)
        })
        //let num = Math.floor(Math.random() * promotions.length);
        //return (<div className="promotion"><p>{promotions[num].title}</p></div>)
    }

    return(
        <section className="recommendations" >
             <SplitPane className="panes" split="vertical" sizes={sizes} onChange={setSizes}>
                <div id="author-posts" className="pane" onClick={sizes[0] == "95%"? dontToggle : toggle}>
                    Posts by Author
                    <p>{post.authors[0].id}</p>
                </div>
                <div id="promoted-posts" className="pane" onClick={sizes[0] == "95%"? toggle : dontToggle}>
                    Promoted Posts
                    <p>{post.authors[0].id}</p>
                    {displayPromotions()}
                </div>
            </SplitPane>
        </section>
    )

};