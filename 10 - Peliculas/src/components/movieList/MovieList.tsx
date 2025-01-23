import { useContext, useEffect, useRef, useState, useMemo } from 'react';
import { Movie } from '../movie/Movie';
import { PagesContext } from '../pagesContext/PagesContext';
import './MovieList.css'
import Search from '../search/Search';
import { SettingsContext } from '../settingsContext/SettingsContext';
import { useIntersection } from '../../hooks/useIntersection';
import ModalMovie from '../modalMovie/ModalMovie';

import MovieService, { IMovieDetails } from '../../services/MovieService';

export default function MovieList() {
    const settingsContext = useContext(SettingsContext);
    const pagesContext = useContext(PagesContext);
    const movies = useMemo(() => (pagesContext.page?.movies ?? []), [pagesContext.page?.movies]);
    const isFinishElement = useRef<HTMLDivElement>(null);
    const [isFinish, setIsFinish] = useState(false);
    const [isLoad, setIsLoad] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState<IMovieDetails|undefined>();


    useIntersection(setIsFinish, isFinishElement, 0.1, [isFinishElement, movies.length]);

    useEffect(() => {
        if (isFinish && pagesContext.page) {
            setIsLoad(true);
            MovieService
                .new(settingsContext.data?.apiKey ?? '')
                .loadNextPage(pagesContext.page)
                .then(result => {
                    pagesContext.setPage(result);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoad(false);
                });
        }
    }, [isFinish]);

    const handleClick = (event:React.MouseEvent<HTMLDivElement>)=>{
        const target = event.target as HTMLDivElement;

        const movieId = (target.dataset.movie_id)? 
                            target.dataset.movie_id :
                            (target.parentNode as HTMLDivElement).dataset.movie_id;

        MovieService
            .new(settingsContext.data?.apiKey ?? '')
            .getMovie(movieId ?? '')
            .then(movie=>{
                if(!movie)return;
                setSelectedMovie(movie);
            })
            .catch(err=>console.error(err));
    }

    return (
        <div className='ml-container'>
            <ModalMovie movieDetail={selectedMovie}/>

            <div className='ml-list'>
                {
                    (movies.length > 0) ?
                        movies.map((mv) => <Movie key={mv.id} id={mv.id} imageUrl={mv.imageUrl} title={mv.title} year={mv.year} onClick={handleClick} />)
                        : <p>No se encontraron peliculas</p>
                }
            </div>
            {
                (isLoad) ?
                    <Search /> :
                    ((movies.length > 0) ? <div ref={isFinishElement}>No hay nada mas por ver</div> : undefined)
            }
        </div>
    );
}