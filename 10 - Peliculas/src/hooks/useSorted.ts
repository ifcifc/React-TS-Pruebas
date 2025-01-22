import { useState } from 'react';


export interface ISorted {
    nameSorted: boolean,
    yearSorted: boolean
}

type handleSortCallback = (event: React.ChangeEvent<HTMLInputElement>) => void;

//Hook para controlar el ordenamiento
export function useSorted():[ISorted, handleSortCallback]{
    const [sorted, setSorted] = useState<ISorted>({ nameSorted: false, yearSorted: false });
    
    //Evento para los checkbox de ordenamiento
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSorted({
            ...sorted,
            [event.target.name]: event.target.checked
        });
    };

    return [sorted, handleSortChange];
}