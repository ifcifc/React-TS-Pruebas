import { useState } from "react";


export interface IFilter {
    textFilter: string,
    yearFilter: string
}

type handleFilterCallback = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;

//Hook para controlar los filtros
export function useFilter():[IFilter, handleFilterCallback]{
    const [filter, setFilter] = useState<IFilter>({ textFilter: '', yearFilter: '0' });
    //Evento para cuando los filtros cambian
    const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    };

    return [filter, handleFilterChange];
}