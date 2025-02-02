import channels from "../channels";
import { getVideos, getVideosDetail } from "../apis/youtube-api";
import { IProgramming, IChannel, IVideo } from "../programming";
import { convertISO8601ToSenconds } from "./util";

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

  let _programming: IProgramming = currentProgramming
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
    let videos = await getVideos({
      type: channel.channelType,
      searcTerms: channel.searchTxt,
    });
    if (videos.items && videos.items.length > 0) {
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
      console.log(channel.name, " Added!!");
      _programming.channelList.push(channelIntance);
    } else {
      console.log(channel.name, " Not results");
    }
  }

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
          duration: convertISO8601ToSenconds(data.contentDetails.duration),
        };
        break;
      }
    }
    return video;
  });

  return videoListCopy;
}
