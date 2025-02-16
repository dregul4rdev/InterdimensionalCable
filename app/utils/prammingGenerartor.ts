import {dayjs} from './util';
import { getVideos, getVideosDetail } from "../apis/youtube-api";
import channels from "../channels";
import { IChannel, IProgramming, IVideo } from "../programming";

export async function generateProgramming(
  onlyNewChannels = true,
  currentProgramming: IProgramming | undefined = undefined
) {
  const _channels =
    onlyNewChannels && currentProgramming
      ? channels.filter((el) => {
          return !currentProgramming.channelList.some(
            (c) => c.name === el.name
          );
        })
      : channels;

  let _programming: IProgramming =  onlyNewChannels && currentProgramming
    ? currentProgramming
    : {
        date: new Date(),
        channelList: [],
      };

  for (let channel of _channels) {
    let channelIntance: IChannel = {
      name: channel.name,
      channelType: channel.channelType,
      description: channel.description,
      logoImg: null,
      logoUrl: channel.logoUrl,
      searchTxt: channel.searchTxt,
      videos: [],
      includeVideoId: channel.includeVideoId,
    };

    let videos = channel.searchTxt.length > 0? await getVideos({
      type: channel.channelType,
      searcTerms: channel.searchTxt,
    }) : null;

    if (videos && videos.items && videos.items.length > 0) {
      for (let v of videos.items) {
        console.log(v);
        const vIntace: IVideo = {
          name: v.snippet.title,
          description: v.snippet.description,
          videoId: v.id.videoId,
          duration: 0,
        };
        channelIntance.videos.push(vIntace);
      }
    }
    
    debugger;
    //get included videos
    const includedVideos = await getIncludedVideos(
      channelIntance.includeVideoId
    );

    channelIntance.videos.push(...includedVideos);
    channelIntance.videos = shuffleVideos(channelIntance.videos);

    if(channelIntance.videos.length > 0){
    console.log(channel.name, " Added!!");
    _programming.channelList.push(channelIntance);
    }
    else {
      console.log(channel.name, " Not results");
    }
  }

  debugger
  updateProgrammingDetails(_programming);

  return _programming;
}

async function updateProgrammingDetails(programming: IProgramming) {
  for (let i = 0; i < programming.channelList.length; i++) {
    const updatedVideoList = await setVideoDuration(
      programming.channelList[i].videos
    );
    programming.channelList[i].videos = updatedVideoList;
    programming.channelList[i].totalDuration = updatedVideoList.reduce(
      (ac, c) => ac + c.duration,
      0
    );
  }
}

async function setVideoDuration(videoList: IVideo[]) {
  let videoListWithoutDuration = videoList.filter((v) => v.duration === 0);
  let videoData = await getVideosDetail(
    videoListWithoutDuration.map((v) => v.videoId)
  );

  const videoListCopy = videoList.map((item) => {
    let video = item;
		for (let data of videoData.items) {
      if (item.videoId === data.id) {
        video = {
          ...video,
          duration: dayjs.duration(data.contentDetails.duration).asSeconds(),
        };
        break;
      }
    }
    return video;
  });

  return videoListCopy;
}

async function getIncludedVideos(videIds: string[]) {
  let videos: IVideo[] = [];
  let videoData = await getVideosDetail(videIds);

  for (let data of videoData.items) {
    videos.push({
      videoId: data.id,
      name: data.snippet.title,
      description: data.snippet.description,
      duration: dayjs.duration(data.contentDetails.duration).asSeconds(),
    });
  }
  return videos;
}

function shuffleVideos(videoList: IVideo[]) {
  let currentIndex = videoList.length;
  let arrayCopy = [...videoList];

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arrayCopy[currentIndex], arrayCopy[randomIndex]] = [
      arrayCopy[randomIndex],
      arrayCopy[currentIndex],
    ];
  }
  return arrayCopy;
}
