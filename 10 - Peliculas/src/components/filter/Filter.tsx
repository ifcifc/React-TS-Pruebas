import { useContext, useEffect } from 'react';
import './Filter.css'
import { useSortMovies } from '../../hooks/useSortMovies';
import { useSearchMovies } from '../../hooks/useSearchMovies';
import { useFilter } from '../../hooks/useFilter';
import { useSorted } from '../../hooks/useSorted';
import { SettingsContext } from '../settingsContext/SettingsContext';
import { PagesContext } from '../pagesContext/PagesContext';

interface IFilterProp {
    setIsSearching: (isSearching: boolean) => void
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

export default function Filter({ setIsSearching }: IFilterProp) {
    const settingsContext = useContext(SettingsContext);
    const pagesContext = useContext(PagesContext);

    const [filter, handleChange] = useFilter();
    const [sorted, handleSortChange] = useSorted();
    const [page, setPage, error] = useSearchMovies(filter, settingsContext?.data?.apiKey ?? '', validateFilter, setIsSearching);

    //Si la lista de peliculas cambia actualiza el state externo
    useSortMovies(page, sorted, pagesContext.setPage, [page, sorted]);
    
    useEffect(()=>{
        if(!pagesContext.page)return;
        setPage({...pagesContext.page});
    },[pagesContext.page?.currentPage]);
    
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