import { IVideo } from "../programming";

export const calculateCurrentVideoIndex = (totalOfVideos: number) => {
  const MINUTES_OF_THE_DAY = 1440;
  const SCALE = MINUTES_OF_THE_DAY / totalOfVideos;
  let date = new Date();
  let currentVideo = Math.floor(
    (date.getHours() * 59 + date.getMinutes()) / SCALE
  );
  return currentVideo;
};

export const calculateCurrentVideoIndexDuration = (
  totalDuration: number | undefined,
  videos: IVideo[]
) => {
  if (!totalDuration) return { videoIndex: 0, currentSecondOfTheVideo: 0 };
  let date = new Date();
  let currentSecondsOfTheDay =
    date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
  let normalizedScondsOfTheDay = currentSecondsOfTheDay % totalDuration;

  let counter = 0;
  let videoIndex = 0;
  while (counter < normalizedScondsOfTheDay) {
    let currentVideo = videos[videoIndex];
    counter += currentVideo.duration;
    videoIndex++;
  }

  const currentSecondOfTheVideo = counter - normalizedScondsOfTheDay;

  return { videoIndex: videoIndex - 1, currentSecondOfTheVideo };
};

export const validateIndex = (index: number, lastIndex: number) => {
  if (index <= lastIndex) return index;
  else {
    return index % lastIndex;
  }
};

export const convertISO8601ToSenconds = (durationStringISO8601: string) => {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  var hours = 0,
    minutes = 0,
    seconds = 0,
    totalseconds = 0;

  if (reptms.test(durationStringISO8601)) {
    var matches = reptms.exec(durationStringISO8601);
    if (matches?.[1]) hours = Number(matches[1]);
    if (matches?.[2]) minutes = Number(matches[2]);
    if (matches?.[3]) seconds = Number(matches[3]);
    totalseconds = hours * 3600 + minutes * 60 + seconds;
  }
  return totalseconds;
};
