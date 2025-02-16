import { StaticImageData } from 'next/image'
import programmingData from "./programming.json" assert { type: "json" };


export interface IProgramming {
    date: Date,
    channelList: Array<IChannel>
}

export interface IChannel {
    name: string,
    description: string,
    logoImg: StaticImageData | null,
    logoUrl: string,
    channelType: string,
    videos: Array<IVideo>,
    totalDuration?: number,
    searchTxt: Array<string>,
    includeVideoId: Array<string>,
    includedPlaylistIds: Array<string>,
}

export interface IVideo {
    name: string,
    description: string,
    videoId: string,
    duration: number,
}

export default getData() as IProgramming

function processProgramming() {
    let date = new Date();
    let todayShiftIndex =  date.getMonth() * date.getDate();
    let p: IProgramming = { ...programmingData, date: new Date(programmingData.date) }

    for (let i = 0; i < p.channelList.length; i++) {
        const currentChannel = p.channelList[i]
        const currentVideosLength = currentChannel.videos.length;
        const shifterVideoList = [];

        for (let index = 0; index < currentVideosLength; index++) {
            const shifteIndex = (index + todayShiftIndex) % currentVideosLength;
            shifterVideoList.push(currentChannel.videos[shifteIndex])
        }
        p.channelList[i].videos = shifterVideoList;
    }
    return p
}

function getData() {
    return processProgramming();
}