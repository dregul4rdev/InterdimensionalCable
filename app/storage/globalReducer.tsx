import { calculateCurrentVideoIndex } from "../utils/util";
import { IGlobalStorage } from "./GlobalProvider";

export interface IAction {
  type: string,
  payload: any
}


export const ACTIONS = {
  LOAD_PROGRAMMING: "LOAD_PROGRAMMING",
  NEXT_CHANNEL: "NEXT_CHANNEL",
  PREVIOUS_CHANNEL: "PREVIOUS_CHANNEL",
  SET_CURRENT_VIDEO: "SET_CURRENT_VIDEO"
}

export function globalReducer(storage: IGlobalStorage, action: IAction) {
  switch (action.type) {
    case ACTIONS.NEXT_CHANNEL: {
      console.log(ACTIONS.NEXT_CHANNEL)
      let nextIndex = storage.currentChannelIndex + 1
      nextIndex = nextIndex > (storage.programming.channelList.length - 1) ? 0 : nextIndex;
      console.log(action.type, ": ", storage)
      let currentVideoIndex = calculateCurrentVideoIndex(storage.programming.channelList[nextIndex].videos.length)

      return { ...storage, currentChannelIndex: nextIndex, currentVideoIndex }
    }
    case ACTIONS.PREVIOUS_CHANNEL: {
      console.log(ACTIONS.PREVIOUS_CHANNEL)
      let nextIndex = storage.currentChannelIndex - 1
      nextIndex = nextIndex < 0 ? (storage.programming.channelList.length - 1) : nextIndex;
      let currentVideoIndex = calculateCurrentVideoIndex(storage.programming.channelList[nextIndex].videos.length)

      return { ...storage, currentChannelIndex: nextIndex, currentVideoIndex }
    }
    case ACTIONS.LOAD_PROGRAMMING: {
      
      return { ...storage, programming: action.payload }
    }
    case ACTIONS.SET_CURRENT_VIDEO: {
      let currentVideo = action.payload
      console.log(ACTIONS.SET_CURRENT_VIDEO)
      console.log("current video index: ",  action)
      return { ...storage, currentVideo: currentVideo }
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
