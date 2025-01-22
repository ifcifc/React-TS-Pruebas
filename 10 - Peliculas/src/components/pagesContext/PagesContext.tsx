import { createContext, useState } from 'react';
import { IChildren } from '../../commond/IChildren';
import { IPageMovie } from '../../services/MovieService';

export interface IPagesContext{
    page?: IPageMovie,
    setPage: (page:IPageMovie)=>void
}

export const PagesContext = createContext<IPagesContext>({page: undefined, setPage:()=>{}});

export default function PagesContextProvider({children}:IChildren){
    const [page, setPage] = useState<IPageMovie>();

    return (
        <PagesContext.Provider value={{page, setPage}}>
            {children}
        </PagesContext.Provider>
    );
}