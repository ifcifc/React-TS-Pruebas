import { useEffect, useState } from 'react';
import MovieService, { IPageMovie } from '../services/MovieService';
import { useDebounce } from './useDebounce';
import { IFilter } from './useFilter';

const defaultPageValue:IPageMovie = {currentPage:1, lastPage:1, movies:[]};

type validateFilterCallback = (text:string)=>boolean;
type setIsSearchingCallback = (isSearching: boolean) => void;

//Hook encargador de buscar el listado de peliculas
export function useSearchMovies(filter:IFilter, apiKey:string, validateFilter:validateFilterCallback, setIsSearching:setIsSearchingCallback):[IPageMovie, (page:IPageMovie)=>void, string|undefined]{
    const [page, setPage]  = useState<IPageMovie>(defaultPageValue);
    const [error, setError] = useState<string|undefined>(undefined);

    //Debounce para evitar llamar continuamente a la api
    useDebounce(() => {
        if (!validateFilter(filter.textFilter)) {
            setIsSearching(false);
            setError((filter.textFilter.trim().length>0)? 'Texto ingresado invalido':undefined);
            setPage({...defaultPageValue});
            return;
        }

        try {
            MovieService
                .new(apiKey)
                .searchMovies(filter.textFilter.trim(), (filter.yearFilter !== '0') ? filter.yearFilter : undefined)
                .then(result => {
                    setPage(result ?? {...defaultPageValue})
                })
                .catch(() => {
                    setPage({...defaultPageValue})
                    setError('Ha ocurrido un problema al obtener la lista de peliculas')
                })
                .finally(() => setIsSearching(false));
        } catch (error) {
            setPage({...defaultPageValue})
            console.error(error);
            setError('Ha ocurrido un problema al obtener la lista de peliculas');
        }
    }, 1000, [filter]);

    useEffect(() => {
        if(validateFilter(filter.textFilter)){
            setIsSearching(true);
            setError(undefined);
        }else{
            setError((filter.textFilter.trim().length>0)? 'Texto ingresado invalido':undefined);
        }
    }, [filter, setIsSearching, validateFilter]);
    
    return [page, setPage, error];
}
