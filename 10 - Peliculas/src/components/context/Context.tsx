import { createContext, useState } from 'react';
import { IChildren } from '../../commond/IChildren';
import { Settings } from '../settings/Settings';

export interface IContext{
    apiKey?:string
}

export const Context = createContext({} as IContext);

export default function ContextProvider({children}:IChildren){
    const [data, setData] = useState<IContext>({});

    return (
        <Context.Provider value={data}>
            {data.apiKey? children:<Settings setData={setData}/>}
        </Context.Provider>
    );
}