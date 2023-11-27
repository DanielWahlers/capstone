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
                {post.media.map((content)=>{if(content.media_type == "photo")
                {return (
                <div key={content.id}><Image src={content.media_link}/> </div>
                )
              } else if (content.media_type == "video"){
                return (
                  <div key={content.id}><video controls><source src={content.media_link}/></video></div>
                )
              } else if (content.media_type == "audio"){
                return(
                  <div key={content.id}><audio controls><source src={content.media_link}/></audio></div>
                )
              } else{
                return(
                  <div key={content.id}><p>This content could not be loaded because it has an unrecognized type</p></div>
                )
              }
              }
              )}
            </Carousel>
      </div>
    )
}