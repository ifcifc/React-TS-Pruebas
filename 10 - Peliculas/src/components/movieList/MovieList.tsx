import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Movie } from '../movie/Movie';
import { PagesContext } from '../pagesContext/PagesContext';
import './MovieList.css'
import Search from '../search/Search';
import MovieService from '../../services/MovieService';
import { SettingsContext } from '../settingsContext/SettingsContext';

export default function MovieList() {
    const settingsContext = useContext(SettingsContext);
    const pagesContext = useContext(PagesContext);
    const movies = useMemo(() => (pagesContext.page?.movies ?? []), [pagesContext.page?.movies]);
    const isFinishElement = useRef<HTMLDivElement>(null);
    const [isFinish, setIsFinish] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        //Observa si un elemento es o no es visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsFinish(entry.isIntersecting);
            },
            { threshold: 0.1 } 
        );

        if (isFinishElement.current) {
            observer.observe(isFinishElement.current);
        }

        return () => {
            if (isFinishElement.current) {
                observer.unobserve(isFinishElement.current);
            }
        };
    }, [isFinishElement, movies.length]);

    useEffect(()=>{
        if(isFinish && pagesContext.page){
            setIsLoad(true);
            MovieService
                .new(settingsContext.data?.apiKey??'')
                .loadNextPage(pagesContext.page)
                .then(result=>{
                    pagesContext.setPage(result);
                })
                .catch(err=>{
                    console.log(err);
                })
                .finally(()=>{
                    setIsLoad(false);
                });
        }
    },[isFinish]);

    return (
        <div className='ml-container'>
            <div className='ml-list'>
                {
                    (movies.length > 0) ?
                        movies.map((mv) => <Movie key={mv.id} imageUrl={mv.imageUrl} title={mv.title} year={mv.year} />)
                        : <p>No se encontraron peliculas</p>
                }
            </div>
            {
                (isLoad)?
                    <Search/>:
                    ((movies.length > 0) ? <div ref={isFinishElement}>No deberias de poder ver esto</div> : undefined)
            }
        </div>
    );
}