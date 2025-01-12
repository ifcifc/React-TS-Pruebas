import { useEffect, useMemo, useState } from 'react';
import MovieService, { IMovie } from '../../services/MovieService';
import './Filter.css'
import { useDebounce } from '../../hooks/useDebounce';

interface IFilterProp{
    setMovies: (movies:IMovie[])=>void;
}

interface IFilter{
    textFilter:string,
    yearFilter:string
}

interface ISorted{
    nameSorted:boolean,
    yearSorted:boolean
}

export default function Filter({setMovies}:IFilterProp){
    const [movieList, setMovieList] = useState([] as IMovie[]);
    const [filter, setFilter] = useState({textFilter:'', yearFilter:'0'} as IFilter);
    const [sorted, setSorted] = useState({nameSorted:false, yearSorted:true} as ISorted);

    //Peliculas ordenadas
    const sortMovies = useMemo<IMovie[]>(()=>{
        const sortedMovies:IMovie[] = sorted.nameSorted ? [...movieList].sort((a, b) => a.title.localeCompare(b.title)) : movieList;
        return sorted.yearSorted ? [...sortedMovies].sort((a, b) => a.year.localeCompare(b.year)) : sortedMovies;
    },[movieList, sorted]);
 
    //Evento cuando los filtros cambian
    const handleChange = (event:React.ChangeEvent<HTMLSelectElement|HTMLInputElement>)=>{
        setFilter({
            ...filter,
            [event.target.name]:event.target.value
        });
    };
    
    //Evento para los checkbox de ordenamiento
    const handleSortChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setSorted({
            ...sorted,
            [event.target.name]:event.target.checked
        });
    };
    
    //Debounce para evitar llamar continuamente a la api
    useDebounce(()=>{
        try{
            MovieService
                .new('87a0a105')
                .searchMovies(filter.textFilter, (filter.yearFilter!=='0')?filter.yearFilter:undefined)
                .then(result=>setMovieList(result??[]))
                .catch(()=>setMovieList([]));
        }catch(error){
            setMovieList([]);
            console.error(error);
        }
    },500,[filter]);

    //Si la lista de peliculas cambia actualiza el state externo
    useEffect(()=>{
        setMovies(sortMovies);
    },[setMovies, sortMovies]);

    return(
        <div className='fl-container'>
            <input type='text' name='textFilter' value={filter.textFilter} onChange={handleChange}/>
            <select onChange={handleChange} name='yearFilter'>
                <option value='0'>-</option>
                {Array(75).fill(0).map((_,i)=>(<option key={`${2025-i}`} value={`${2025-i}`}>{2025-i}</option>))}
            </select>
            <label><input type='checkbox' name='nameSorted' onChange={handleSortChange} checked={sorted.nameSorted}/>Ordenar</label>
            <label><input type='checkbox' name='yearSorted' onChange={handleSortChange} checked={sorted.yearSorted}/>Ordenar por año</label>
        </div>
    );
}