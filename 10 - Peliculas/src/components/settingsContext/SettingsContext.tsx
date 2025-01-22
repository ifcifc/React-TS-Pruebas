import { createContext, useState } from 'react';
import { IChildren } from '../../commond/IChildren';
import { Settings } from '../settings/Settings';

export interface IContextData{
    apiKey?: string
}

export interface IContext{
    data?: IContextData,
    setData: (data:IContextData)=>void
}

export const SettingsContext = createContext({} as IContext);

export default function SettingsContextProvider({children}:IChildren){
    const [data, setData] = useState<IContextData>({});

    return (
        <SettingsContext.Provider value={{data, setData} as IContext}>
            {data.apiKey? children:<Settings setData={setData}/>}
        </SettingsContext.Provider>
    );
}