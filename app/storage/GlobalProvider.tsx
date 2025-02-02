import { useReducer, useContext, createContext, useEffect } from "react";

import programming, { IProgramming } from '../programming'
import { globalReducer } from './globalReducer'

export interface IGlobalStorage {
    programming: IProgramming,
    currentChannelIndex: number,
    currentVideoIndex: number
}

const storage: IGlobalStorage = {
    programming: programming,
    currentChannelIndex: 0,
    currentVideoIndex: 0
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


