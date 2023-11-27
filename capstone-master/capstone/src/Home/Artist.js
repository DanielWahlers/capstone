import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { Button, Drawer, Radio, Space } from 'antd';
import {useNavigate} from 'react-router-dom';
import { Modal } from 'antd';

export default function Artist({post, user, setSizes, toggle}){
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const placement = 'left';
    const [promoted, setPromoted] = useState(false);
    const [beenToggled, setBeenToggled] = useState(0);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
    const apiString = "http://localhost:5000";

const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('No Comments yet');
  const showModal = () => {

    //update modalText before showing it
    setModalOpen(true);
    if(beenToggled == 0){
        toggle()
        setBeenToggled(1);
    }
  };

  const handleOk = () => {
    setModalText('Posting Your Comment');
    setConfirmLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setModalOpen(false);
  };

    const showDrawer = () => {
        setDrawerOpen(true);
      };
      const onClose = () => {
        setDrawerOpen(false);
      };
      
      const viewProfile = () =>{
        navigate('/profile', {state: {user:user, author:post.authors[0]}})
      };
      

      async function getComments(){
        const url = apiString + `/comments?post_id=${post.id}`;
        const res = await fetch(url);
        const results = await res.json();
        setComments(results);

        const commentPrint = comments.map((comment)=>{return(`${comment.comment_text}\n`)});
        setModalText(commentPrint);
      }

    async function getInteractions(){
//liked
        let url = apiString + `/likes?user_id=${user.id}&post_id=${post.id}`;
        let likeData = await fetch(url);
        likeData = await likeData.json();
        if(likeData.length === 0){
            setLiked(false);
        }
        else
            setLiked(true);
//promoted
        url = apiString + `/promotes?user_id=${user.id}&post_id=${post.id}`;
        let promoteData = await fetch(url); 
        promoteData = await promoteData.json();
        if(promoteData.length ===0){
            setPromoted(false);
        }
        else
            setPromoted(true);

//disliked
        url = apiString + `/dislikes?user_id=${user.id}&post_id=${post.id}`;
        let dislikeData = await fetch(url);
        dislikeData = await dislikeData.json();
        if(dislikeData.length === 0){
            setDisliked(false);
        }
        else
            setDisliked(true);
    }

    useEffect(()=>{
        getInteractions();
        getComments();
        console.log("I am within the useEffect on the Artist");
    }, []);

    //todo Add a useState variable for likes and dislikes
    
    // function view(){
    //     document.getElementById("art-" + post.id).style.opacity = 1;
    //     document.getElementById("art-" + post.id).onmouseleave = view;
    //     document.getElementById("user-promotions-" + post.id).style.zIndex = 1;
    //     document.getElementById("user-promotions-" + post.id).hidden = false;

    // }


    async function like(){
        if(liked){
            const url = apiString + `/likes?user_id=${user.id}&post_id=${post.id}`;
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };
            const res = await fetch(url, requestOptions);
            const likeData = await res.json();
            
            if(beenToggled == 0){
                toggle();
                setBeenToggled(1);
            }
            setLiked(false);
        }
        else{
            const url = apiString + `/likes?user_id=${user.id}&post_id=${post.id}`;
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };
            const res = await fetch(url, requestOptions);
            const likeData = await res.json();

            if(beenToggled == 0){
                toggle();
                setBeenToggled(1);
            }
            setLiked(true);
        }
    }

    async function dislike(){
        if(disliked){
            const url = apiString + `/dislikes?user_id=${user.id}&post_id=${post.id}`;
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };
            const res = await fetch(url, requestOptions);
            const dislikeData = await res.json();
            if(beenToggled == 0){
                toggle();
                setBeenToggled(1);
            }
            setDisliked(false);
        }
        else{
            const url = apiString + `/dislikes?user_id=${user.id}&post_id=${post.id}`;
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };
            const res = await fetch(url, requestOptions);
            const dislikeData = await res.json();
            if(beenToggled == 0){
                toggle();
                setBeenToggled(1);
            }
            setDisliked(true);
        }
    }

    // function unlike(){
    //     const btn = document.getElementById("like-button-" + post.id);
    //     btn.innerHTML = `<i class="fa-regular fa-thumbs-up"/>`;
    //     btn.onclick = like;
    //     showSelfPromotions();
    // }

    // function dislike(){
    //     const btn = document.getElementById("dislike-button-" + post.id);
    //     btn.innerHTML = `<i class="fa-solid fa-thumbs-down fa-bounce"></i>`;
    //     btn.onclick = undislike;
    //     timer = setTimeout(() => {
    //         btn.innerHTML = `<i class="fa-solid fa-thumbs-down"></i>`;
    //     }, 1000);
    //     unlike();
    //     showSelfPromotions();
    // }

    // function undislike(){
    //     const btn = document.getElementById("dislike-button-" + post.id);
    //     btn.innerHTML = `<i class="fa-regular fa-thumbs-down"></i>`;
    //     btn.onclick = dislike;
    //     showSelfPromotions();
    // }

    async function promote(){
        if(promoted){
            const url = apiString + `/promotes?user_id=${user.id}&post_id=${post.id}`;
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            };
            const res = await fetch(url, requestOptions);
            const likeData = await res.json();
            if(beenToggled == 0){
                toggle();
                setBeenToggled(1);
            }
            setPromoted(false);
        }
        else{
            const url = apiString + `/promotes?user_id=${user.id}&post_id=${post.id}`;
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'}
            };
            const res = await fetch(url, requestOptions);
            const likeData = await res.json();
            if(beenToggled == 0){
                toggle();
                setBeenToggled(1);
            }
            setPromoted(true);
        }
    }

    // function unpromote(){
    //     const btn = document.getElementById('promo-button-' + post.id);
    //     btn.innerHTML = `<i className="fa-solid fa-bullhorn"></i>`;
    //     btn.onclick = promote;
    //     showSelfPromotions();
    // }

    function share(){
        const btn = document.getElementById('share-button-' + post.id);
        btn.innerHTML = `<i className="fa-solid fa-share fa-spin"></i>`;
        var timer = setTimeout(() => {
            btn.innerHTML = `<i className="fa-solid fa-share"></i>`;
        }, 2000);
        if(beenToggled == 0){
            toggle();
            setBeenToggled(1);
        }
    }

    // function interact(){
    //     document.getElementById("user-promotions-" + post.id).hidden = true;
    //     document.getElementById("self-promotions-" + post.id).style.zIndex = 2;
    //     document.getElementById("self-promotions-" + post.id).hidden = false;
    // }

    // function doNothing(){}

        console.log("post.authors[0].profiles", post.authors[0].profiles);

    return(
        <section id={"artist-" + post.id} className="artist">
            <div className="flexbar" id="author-flexbar">
                <div>
                    {/* <img src={user.media_link} width={50+"px"} height={50+"px"} /> */}
                    {/* {getAuthors}
                    <h2>{post.authors[0].username}</h2> */}
                    {post.authors.map((author)=>{
                        let imgsrc = "";
                        for(const profile of author.profiles){
                            if(profile.user_id == author.id){
                                imgsrc = profile.media_link;
                            }
                        }
                         return <div className="authors" key={author.id}>
                            <img src={imgsrc} onClick={showDrawer}/>
                            <button onClick={viewProfile}><h2>{author.username}</h2></button>
                            {/* <h2 onClick={viewProfile}>{author.username}</h2> */}
                            <Drawer
                                title={author.username}
                                placement={placement}
                                width={500}
                                onClose={onClose}
                                open={drawerOpen}
                                extra={
                                    <Space>
                                        <Button type="primary" onClick={viewProfile}>
                                            View Profile
                                        </Button>
                                    </Space>
                                }
                            >
                                <p>Bio: {author.bio}</p>
                            </Drawer>
                            </div>
                 })}
                </div>
            </div>
            
            <div className="flexbar">
                <h3>{post.title}</h3>
            </div>
            <p>{post.caption}</p>
            <div className="buttons" >
                <div >
                    <button id={"like-button-"+ post.id} onClick={like}>{liked? <i className="fa-solid fa-thumbs-up"></i>: <i className="fa-regular fa-thumbs-up"></i>}</button>
                </div>
                <div>
                    <button id={"request-button-" + post.id}><i className="fa-regular fa-handshake"></i></button>
                </div>
                <div>
                    <button id={"dislike-button-" + post.id} onClick={dislike}>{disliked? <i className="fa solid fa-thumbs-down"></i>: <i className="fa-regular fa-thumbs-down"></i>}</button>
                </div>
            </div>
            <p onClick={showModal}>This is where the comments will go, it will either have a single line of compliments or critiques or have both on display</p>
            <Modal
                centered
                title="Comments"
                width={800}
                open={modalOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                
                <p>{modalText}</p>
            </Modal>
            <div className="buttons">
                <div>
                    <button id={'share-button-' + post.id} onClick={share}><i className="fa-solid fa-share"></i></button>
                </div>
                <div >
                    <button id={'promo-button-' + post.id} onClick={promote}>{promoted?<i className="fa-solid fa-circle-up"></i>:<i className="fa-regular fa-circle-up"></i>}</button>
                </div>
                <div>
                    <button onClick={showModal}><i className="fa-regular fa-comment"></i></button>
                </div>
            </div>
            
            
        </section>
    )
}