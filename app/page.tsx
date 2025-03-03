"use client";
import { useState, useEffect } from "react";

import { useGobalDispatch, useGobalStorage } from './storage/GlobalProvider'
import { generateProgramming, generateChannel } from './utils/programingGenerartor'

import VideoScreen from './components/organisms/Screen'
import DetailBar from './components/organisms/DetailBar';
import { IProgramming, IChannel } from './programming'
import  channels  from "./channels"


import { calculateCurrentVideoIndexDuration } from './utils/util'
import NoiseEffect from "./components/molecules/NoiseEffect";


export default function Home() {
  const DEV_MODE = true;
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);
  const [noiseVisible, setNoiseVisible] = useState(false);
  const { programming, currentVideo } = useGobalStorage();
  const GlobalDispatchContext = useGobalDispatch();
  const currentChannel: IChannel = programming.channelList[currentChannelIndex]

  const displayNoise = () => {
    setNoiseVisible(true)
  }

  const removeNoiseFromScreen = () => {
    setTimeout(function () {
      setNoiseVisible(false)
    }, 1000);
  }

  const nextChannelHandler = () => {
    displayNoise()

    let nextIndex = currentChannelIndex + 1
    nextIndex = nextIndex > (programming.channelList.length - 1) ? 0 : nextIndex;
    setCurrentChannelIndex(nextIndex)
    let newCurrentChannel = programming.channelList[nextIndex]

    const { videoIndex, currentSecondOfTheVideo } = calculateCurrentVideoIndexDuration(newCurrentChannel.totalDuration, newCurrentChannel.videos);
    const nextVideo = {index: videoIndex, currentSecond: currentSecondOfTheVideo }
    GlobalDispatchContext({ type: "SET_CURRENT_VIDEO", payload:  nextVideo})

  }


  const previusChannelHandler = () => {
    displayNoise()

    let nextIndex = currentChannelIndex - 1
    nextIndex = nextIndex < 0 ? (programming.channelList.length - 1) : nextIndex;
    setCurrentChannelIndex(nextIndex)
    let newCurrentChannel = programming.channelList[nextIndex]

    const { videoIndex, currentSecondOfTheVideo } = calculateCurrentVideoIndexDuration(newCurrentChannel.totalDuration, newCurrentChannel.videos);
    const nextVideo = {index: videoIndex, currentSecond: currentSecondOfTheVideo }
    GlobalDispatchContext({ type: "SET_CURRENT_VIDEO", payload:  nextVideo})
  }

  const gnerateProgramingHandler = (onlyNewChannels = true) => {
    (async () => {
      try {
        const newProgramming = await generateProgramming(onlyNewChannels, programming);
        localStorage.setItem('programming', JSON.stringify(newProgramming));
        console.log("programmign from generator:", newProgramming)
        GlobalDispatchContext({ type: "LOAD_PROGRAMMING", payload: newProgramming });
        alert("completed")
      }
      catch (err) {
        console.log(err)
      }
    })()
  }
 
  const regenerateCurrentChannel = () => {
    (async () => {
      try {
        const currentChannelDef = channels.find(el => el.name == programming.channelList[currentChannelIndex].name);

        
        if(currentChannelDef){
        const newChannel= await generateChannel(currentChannelDef);

        programming.channelList[currentChannelIndex] =  newChannel

        localStorage.setItem('programming', JSON.stringify(programming));
        console.log("programmign from generator:", programming)
        GlobalDispatchContext({ type: "LOAD_PROGRAMMING", payload: programming });
        alert("completed")
        }else{
              throw "Channel definition not found"

        }
      }
      catch (err) {
        console.log(err)
      }
    })()
  }

  


  if (DEV_MODE) {
    useEffect(() => {
      (async () => {
        debugger
        const programming: IProgramming = JSON.parse(localStorage.getItem('programming') || "null");
        if (programming) {
          console.log("programmign from local storage:", programming)
          GlobalDispatchContext({ type: "LOAD_PROGRAMMING", payload: programming });
        } else {
          try {
            const programming = await generateProgramming();
            localStorage.setItem('programming', JSON.stringify(programming));
            console.log("programmign from generator:", programming)
            GlobalDispatchContext({ type: "LOAD_PROGRAMMING", payload: programming });
          }
          catch (err) {
            console.log(err)
          }
        }
      })()

    }, [GlobalDispatchContext]);
  }

  return (

    <main className="container flex flex-col h-screen  min-w-full max-h-screen   min-h-screen bg-indigo-500">

      {currentChannel && currentChannel.videos ?
        <>
          <NoiseEffect visible={noiseVisible} />
          <VideoScreen
            key={currentChannel.name}
            videos={currentChannel.videos}
            currentVideoIndex={currentVideo.index}
            currentSecond={currentVideo.currentSecond}
            onVideoLoaded={removeNoiseFromScreen}
          />
          <DetailBar
            channel={currentChannel}
            video={currentChannel.videos[currentVideo.index]}
            nextCallback={nextChannelHandler}
            previusCallback={previusChannelHandler} />
        </> : <></>}
      {DEV_MODE ? <div className=" flex flex-col z-50 absolute top-0 right-0 ">
        <button className="m-4  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => regenerateCurrentChannel()}>RCC</button>
        <button className="m-4  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => gnerateProgramingHandler()}>Rn</button>
        <button className="m-4  bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => gnerateProgramingHandler(false)}>R</button>
        <div className="text-white">total Videos: {currentChannel.videos.length} </div>
      </div>
        :
        <></>}

    </main>
  )
}






