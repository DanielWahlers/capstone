import React from 'react';
import {useState} from 'react';
import {useEffect} from 'react';
import { Carousel } from 'antd';
import { Image } from 'antd';

export default function Art({post}){

   //const [slides, setSlides] = useState([])
    var timer;
    var index = 0;

    const onChange = (currentSlide) => {
        console.log(currentSlide);
      };
    
    //JSX here
    return(
        <div className="art">
            <Carousel afterChange={onChange}>
                {post.media.map((content)=>{return (<div key={content.id}><Image src={content.media_link}/> </div>)})}
            </Carousel>
      </div>
    )
}