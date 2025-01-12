import { useEffect, useMemo, useState } from 'react';
import MovieService, { IMovie } from '../../services/MovieService';
import './Filter.css'
import { useDebounce } from '../../hooks/useDebounce';

interface IFilterProp{
    setMovies: (movies:IMovie[])=>void;
}

export default function Filter({setMovies}:IFilterProp){
    const [movieList, setMovieList] = useState([] as IMovie[]);
    const [textFiltered, setTextFiltered] = useState('');
    const [yearFiltered, setYearFiltered] = useState('0');
    const [isSorted, setIsSorted] = useState(false);
    const [isYearSorted, setIsYearSorted] = useState(true);

    //Peliculas ordenadas
    const sortMovies = useMemo<IMovie[]>(()=>{
        const sortedMovies:IMovie[] = isSorted ? [...movieList].sort((a, b) => a.title.localeCompare(b.title)) : movieList;
        return isYearSorted ? [...sortedMovies].sort((a, b) => a.year.localeCompare(b.year)) : sortedMovies;
    },[movieList, isSorted, isYearSorted]);
 
    //Evento cuando el filtro de texto cambia
    const handleTextChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setTextFiltered(event.target.value);
    };
    
    //Evento para el checkbox dek ordenamiento por nombre 
    const handleSortChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setIsSorted(event.target.checked);
    };

    //Evento cuando el filtro del año cambia
    const handleYearChange = (event:React.ChangeEvent<HTMLSelectElement>)=>{
        setYearFiltered(event.target.value);
    };
    
    //Evento para el checkbox dek ordenamiento por año
    const handleYearSortChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setIsYearSorted(event.target.checked);
    };
    
    //Debounce para evitar llamar continuamente a la api
    useDebounce(()=>{
        try{
            MovieService
                .new('87a0a105')
                .searchMovies(textFiltered, (yearFiltered!=='0')?yearFiltered:undefined)
                .then(result=>setMovieList(result??[]))
                .catch(()=>setMovieList([]));
        }catch(error){
            setMovieList([]);
            console.error(error);
        }
    },500,[yearFiltered, textFiltered]);

    //Si la lista de peliculas cambia actualiza el state externo
    useEffect(()=>{
        setMovies(sortMovies);
    },[setMovies, sortMovies]);

    return(
        <div className='fl-container'>
            <input type='text' value={textFiltered} onChange={handleTextChange}/>
            <select onChange={handleYearChange}>
                <option value='0'>-</option>
                {Array(75).fill(0).map((v,i)=>(<option key={`${2025-i}`} value={`${2025-i}`}>{2025-i}</option>))}
            </select>
            <label><input type='checkbox' onChange={handleSortChange} checked={isSorted}/>Ordenar</label>
            <label><input type='checkbox' onChange={handleYearSortChange} checked={isYearSorted}/>Ordenar por año</label>
        </div>
    );
}