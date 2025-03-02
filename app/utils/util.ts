import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { IVideo } from '../programming';

dayjs.extend(duration);

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

export const getValidIndex = (index: number, arraySize: number) => {
  return index % arraySize;
};

export { dayjs };
