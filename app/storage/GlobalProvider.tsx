import { useReducer, useContext, createContext, useEffect } from "react";

import programming, { IProgramming } from '../programming'
import { globalReducer } from './globalReducer'
import { calculateCurrentVideoIndexDuration } from "../utils/util";

export interface IGlobalStorage {
    programming: IProgramming,
    currentChannelIndex: number,
    currentVideo: {index: number, currentSecond: number}
}
const { videoIndex, currentSecondOfTheVideo } = calculateCurrentVideoIndexDuration(programming.channelList[0].totalDuration, programming.channelList[0].videos);
const storage: IGlobalStorage = {
    programming: programming,
    currentChannelIndex: 0,
    currentVideo: {index: videoIndex, currentSecond: currentSecondOfTheVideo}
}


export const GlobalContext = createContext<IGlobalStorage | null>(null);
export const GlobalDispatchContext = createContext<Function | null>(null);

const GlobalProvider = ({ children }: { children: any }) => {
    const [st, dispatch] = useReducer(globalReducer, storage);

    return (
        <GlobalContext.Provider value={st}>
            <GlobalDispatchContext.Provider value={dispatch}>
                {children}
            </GlobalDispatchContext.Provider>
        </GlobalContext.Provider>
    )

}

export default GlobalProvider;

export function useGobalStorage() {
    return useContext(GlobalContext) as IGlobalStorage;
}

export function useGobalDispatch() {
    return useContext(GlobalDispatchContext) as Function;
}


