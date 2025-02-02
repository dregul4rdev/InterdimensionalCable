
'use client'
import { IVideo } from "@/app/programming";
import { useState } from "react";
import YouTube, { YouTubeProps } from 'react-youtube';

import { validateIndex } from '../../utils/util'

const Screen = ({ videos, currentVideoIndex = 0, currentSecond = 0, onVideoLoaded = undefined }: { videos: Array<IVideo>, currentVideoIndex?: number, currentSecond?: number, onVideoLoaded: any }) => {

  const [currentVideoId, setCurrentVideoId] = useState(videos[currentVideoIndex].videoId)

  const nextVideoIndex = () => {
    return validateIndex(currentVideoIndex + 1, videos.length - 1)
  }

  const onEnd: YouTubeProps['onEnd'] = (event: { target: any; }) => {
    let player = event.target;
    setCurrentVideoId(videos[nextVideoIndex()].videoId)
    player.playVideo();
    //starta a timer  and update  as a  channel timer
    //start at 0 every time   need current video is added

  }

  const onPlayerReady: YouTubeProps['onReady'] = (event: { target: any; }) => {
    // access to player in all event handlers via event.target
    let player = event.target;
    player.playVideo();
    onVideoLoaded()
  }

  const opts: YouTubeProps['opts'] = {

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      mute: 0,
      loop: 0,
      start: currentSecond,
      controls: 0
    },
  };

  return (
    // @ts-ignore
    <YouTube
      key={currentVideoId}
      className="flex grow "
      iframeClassName='video grow flex  w-full h-full'
      videoId={currentVideoId}
      opts={opts}
      onReady={onPlayerReady}
      onEnd={onEnd}
    />
  )
}

export default Screen



