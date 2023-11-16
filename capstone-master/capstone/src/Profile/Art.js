import React from 'react';


export default function Art({post, sideMode, setSideMode}){

   
    var timer;
    var index = 0;

    function view(){
        const art = document.getElementById("art-" + post.id)
        if(sideMode === 'trending'){
            art.style.opacity = 1;
            timer = setTimeout(() => {
                art.onmouseleave = continueViewing;
                //art.onmousemove = showUserPromotions;
                showUserPromotions()
            }, 3000);
        }
        else{
            art.onmouseleave = continueViewing;
        }
    }

    function continueViewing(){
        document.getElementById('art-' + post.id).style.opacity = 1;
    }

    function dontView(){
        document.getElementById("art-" + post.id).style.opacity = 0.6;
        clearTimeout(timer);
        
    }

    function showUserPromotions() {
        if (sideMode === 'trending') {
            console.log('showUserPromotions');
            const art = document.getElementById("art-" + post.id);
            art.onmouseenter= continueViewing;
            art.onmouseleave= continueViewing;
            art.style.opacity = 1;
            setSideMode('user');
        }
    }

    // function continueViewing(){
    //     document.getElementById("art-" + post.id).style.opacity = 1;
    //     document.getElementById("user-promotions-" + post.id).style.zIndex = 1;
    //     document.getElementById("user-promotions-" + post.id).hidden = false;
    //     document.getElementById("art-" + post.id).onmouseleave = continueViewing;
    //     document.getElementById("post-" + post.id).onclick = interact;
    // }





    //This is the new stuff for the carousel
    function loadSlides() {
        if(post.media_link.length > 1){
            let i = 0;
           return post.media_link.map((slide) => {i++; return <img id={"post-" + post.id + "-image-" + i} src={slide}/>})
        }
        else{
            return <img id={"post-" + post.id + "-image-1"}src={post.media_link[0]} />
        }
    }

    function makeInvisible(slides){
        document.getElementById("art-" + post.id).map((slides) => {if(slides.id != "post-" + post.id + "-image-1"){slides.hidden = true;}})
    }

    //JSX here
    return(
        <section id={"art-"+ post.id} className="art" onMouseEnter={view} onMouseLeave={dontView}>
            {/* <img src={post.media_link} alt="" onClick={showUserPromotions}/> */}
            
        </section>
    );
}