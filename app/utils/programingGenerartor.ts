import { dayjs } from "./util";
import { IChannel, IProgramming, IVideo } from "../programming";
import channels, { IChannelDefinition } from "../channels";
import {
  getVideos,
  getVideosDetail,
  getVideosFromPlaylist,
  ISearchObject,
} from "../apis/youtube-api";

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

  let _programming: IProgramming =
    onlyNewChannels && currentProgramming
      ? currentProgramming
      : {
          date: new Date(),
          channelList: [],
        };

  for (let channel of _channels) {
    const channelIntance = await generateChannel(channel);

    if (channelIntance.videos.length > 0) {
      console.log(channel.name, " Added!!");
      _programming.channelList.push(channelIntance);
    } else {
      console.log(channel.name, " Not results");
    }
  }

  return _programming;
}

export async function generateChannel(channel: IChannelDefinition) {
  let channelIntance: IChannel = {
    name: channel.name,
    channelType: channel.channelType,
    description: channel.description,
    logoImg: null,
    logoUrl: channel.logoUrl,
    searchTxt: channel.searchTxt,
    videos: [],
    includeVideoId: channel.includeVideoId,
    includedPlaylistIds: channel.includedPlaylistIds,
    totalDuration: 0,
  };
  debugger;
  //get Videos
  const videosFromSearchText = await getVideosFromSearchTexts(
    channel.searchTxt
  );
  const includedVideos = await getIncludedVideos(channel.includeVideoId);
  const playListVideos = await getPlaylistVideo(channel.includedPlaylistIds);

  channelIntance.videos.push(
    ...includedVideos,
    ...playListVideos,
    ...videosFromSearchText
  );
  channelIntance.videos = shuffleVideos(channelIntance.videos);

  await updateChannleDurations(channelIntance);

  return channelIntance;
}

async function getVideosFromSearchTexts(searchText: string[]) {
  const searchObj: ISearchObject = { searchTerms: searchText, type: "video" };
  let videos: IVideo[] = [];
  let videoData = searchText.length > 0 ? await getVideos(searchObj) : null;
debugger
  if (videoData && videoData.items && videoData.items.length > 0) {
    for (let v of videoData.items) {
      const vIntace: IVideo = {
        name: v.snippet.title,
        description: v.snippet.description,
        videoId: v.id.videoId,
        duration: 0,
      };

      videos.push(vIntace);
    }
  }
  videos = await setVideoDuration(videos);
  return videos;
}

async function updateChannleDurations(channel: IChannel) {
  channel.totalDuration = channel.videos.reduce((ac, c) => ac + c.duration, 0);
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

async function getPlaylistVideo(playlistIds: string[]) {
  let videos: IVideo[] = [];
  for (let playlistId of playlistIds) {
    try{
    let videoData = await getVideosFromPlaylist(playlistId);
    for (let data of videoData.items) {
      videos.push({
        videoId: data.contentDetails.videoId,
        name: data.snippet.title,
        description: data.snippet.description,
        duration: 0,
      });
    }
    videos = await setVideoDuration(videos);  
  }catch(e){
   console.log("error playlistId:"+playlistId+" error: "+e)
  }
  }
 
  return videos;
}
