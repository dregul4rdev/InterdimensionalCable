'use server'
 async function getApiKey() {
  const key =  process.env.YOUTUBE_API? process.env.YOUTUBE_API: "";  
  return key;
}

const BASE_API_URI = "https://youtube.googleapis.com/youtube/v3";

export async function getVideos(
  search: ISearchObject
): Promise<IGetVideosResponse> {
  
  const API_KEY = await getApiKey();
  if (API_KEY == "") throw "APIKEY not defined";
  let query = search.searchTerms.join("%7C");
  const options = {
    videoEmbeddable: "true",
    videoSyndicated: "true",
    maxResults: 10,
  };
  //https://developers.google.com/youtube/v3/docs/search/list?hl=es-419
  const response = await fetch(
    `${BASE_API_URI}/search?part=snippet&key=${API_KEY}&q=${query}&type=${search.type}&order=date&maxResults=${options.maxResults}&videoEmbeddable=${options.videoEmbeddable}&videoSyndicated=${options.videoSyndicated}`,
    {}
  );
  const result: IGetVideosResponse = await response.json();

  return result;
}

export async function getVideosDetail(
  videoIds: Array<string>
): Promise<IGetVideosDetailResponse> {
  const API_KEY = await getApiKey();
  if (API_KEY == "") throw "APIKEY not defined";

  //https://developers.google.com/youtube/v3/docs/videos/list?hl=es-419
  const response = await fetch(
    `${BASE_API_URI}/videos?key=${API_KEY}&part=contentDetails,topicDetails,snippet&id=${videoIds.join(
      ","
    )}`,
    {}
  );
  const result: IGetVideosDetailResponse = await response.json();

  return result;
}


export async function getVideosFromPlaylist(
 playlistId:string
): Promise<IPlaylistItemResponse> {
  const API_KEY = await getApiKey();
  if (API_KEY == "") throw "APIKEY not defined";
  const options = {
    videoEmbeddable: "true",
    videoSyndicated: "true",
    maxResults: 50,
  };
  //https://developers.google.com/youtube/v3/docs/playlistItems/list?hl=es-419
  const response = await fetch(
    `${BASE_API_URI}/playlistItems?key=${API_KEY}&part=contentDetails,snippet&playlistId=${playlistId}&maxResults=${options.maxResults}`,
    {}
  );
  const result: IPlaylistItemResponse = await response.json();

  return result;
}


export interface IPlaylistItemResponse {
  items: [
    {
      contentDetails: {
        videoId: string
      },
      snippet: Isnippet;
    }
  ]
}

export interface IGetVideosResponse {
  items: [
    {
      id: {
        videoId: string;
      };
      snippet: Isnippet;
    }
  ];
}

export interface IGetVideosDetailResponse {
  items: [
    {
      id: string;
      contentDetails: {
        duration: string;
      };
      snippet: Isnippet;
    }
  ];
}

export interface Isnippet {
  title: string;
  description: string;
}

export interface ISearchObject {
  searchTerms: Array<string>;
  type: string;
}
