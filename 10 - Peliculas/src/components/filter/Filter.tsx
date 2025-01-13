import { useContext, useEffect, useState } from 'react';
import MovieService, { IMovie } from '../../services/MovieService';
import './Filter.css'
import { useDebounce } from '../../hooks/useDebounce';
import { Context } from '../context/Context';

interface IFilterProp {
    setMovies: (movies: IMovie[]) => void;
    setIsSearching: (isSearching: boolean) => void;
}

interface IFilter {
    textFilter: string,
    yearFilter: string
}

interface ISorted {
    nameSorted: boolean,
    yearSorted: boolean
}

//Genera un array con los años desde el ultimo año al especificado
function generateYears(fromYear: number = 1960): number[] {
    const currentYear = new Date().getFullYear();
    return Array
        .from({ length: currentYear - fromYear + 1 }, (_, i) => i + fromYear)
        .reverse();
}

function validateFilter(filter: string): boolean {
    const ft = filter.trim();
    if (ft.length < 4 || ft.length > 40) return false;
    return true;
}

export default function Filter({ setMovies, setIsSearching }: IFilterProp) {
    const context = useContext(Context);

    const [movieList, setMovieList] = useState([] as IMovie[]);
    const [filter, setFilter] = useState({ textFilter: '', yearFilter: '0' } as IFilter);
    const [sorted, setSorted] = useState({ nameSorted: false, yearSorted: true } as ISorted);
    const [error, setError] = useState<string|undefined>(undefined);

    //Evento para cuando los filtros cambian
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setFilter({
            ...filter,
            [event.target.name]: event.target.value
        });
    };

    //Evento para los checkbox de ordenamiento
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSorted({
            ...sorted,
            [event.target.name]: event.target.checked
        });
    };

    //Debounce para evitar llamar continuamente a la api
    useDebounce(() => {
        if (!validateFilter(filter.textFilter)) {
            setIsSearching(false);
            setError((filter.textFilter.trim().length>0)? 'Texto ingresado invalido':undefined);
            setMovieList([]);
            return;
        }

        try {
            MovieService
                .new(context.apiKey)
                .searchMovies(filter.textFilter.trim(), (filter.yearFilter !== '0') ? filter.yearFilter : undefined)
                .then(result => setMovieList(result ?? []))
                .catch(() => {
                    setMovieList([]);
                    setError('Ha ocurrido un problema al obtener la lista de peliculas')
                })
                .finally(() => setIsSearching(false));
        } catch (error) {
            setMovieList([]);
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
    }, [filter, setIsSearching]);

    //Si la lista de peliculas cambia actualiza el state externo
    useEffect(() => {
        const sortedMovies: IMovie[] = sorted.nameSorted ? [...movieList].sort((a, b) => a.title.localeCompare(b.title)) : movieList;
        const sortMovies: IMovie[] = sorted.yearSorted ? sortedMovies.sort((a, b) => a.year.localeCompare(b.year)) : sortedMovies;

        setMovies(sortMovies);
    }, [setMovies, movieList, sorted]);

    return (
        <div className='fl-container'>
            <fieldset>
                <input type='text' name='textFilter' value={filter.textFilter} onChange={handleChange} placeholder='Spider-Man, Inception, Matrix, ...' />
                <select onChange={handleChange} name='yearFilter'>
                    <option value='0'>-</option>
                    {generateYears().map((year) => (<option key={`${year}`} value={`${year}`}>{year}</option>))}
                </select>
                <label><input type='checkbox' name='nameSorted' onChange={handleSortChange} checked={sorted.nameSorted} />Ordenar</label>
                <label><input type='checkbox' name='yearSorted' onChange={handleSortChange} checked={sorted.yearSorted} />Ordenar por año</label>
            </fieldset>

            {error ? <label className='fl-error'>{error}</label> : undefined}
        </div>
    );
}