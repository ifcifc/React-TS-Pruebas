import { useEffect } from 'react';
import { IPageMovie } from '../services/MovieService';
import { ISorted } from './useSorted';



type SetPageCallback = (page: IPageMovie) => void;

//Hook para ordenar las peliculas
export function useSortMovies(page: IPageMovie|undefined, sorted: ISorted, setPage: SetPageCallback, deps: React.DependencyList = []) {
    useEffect(() => {
        if(!page)return;
        const sortMovies = [...(page?.movies??[])].sort((a, b) => {
            if (sorted.yearSorted) {
                const yearCompare = a.year.localeCompare(b.year);
                if (yearCompare !== 0) return yearCompare;
            }

            if (sorted.nameSorted) {
                return a.title.localeCompare(b.title);
            }

            return 0;
        });

        setPage({
            ...page,
            movies:sortMovies
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}
