import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = (props) => {
    const opts = {
        height: '390',
        width: '900',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <YouTube
            videoId={props.video}
            opts={opts} 
        />
    );    
}

export default VideoPlayer;