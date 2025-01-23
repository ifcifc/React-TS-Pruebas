import { useEffect, useRef } from 'react';
import './ModalMovie.css'
import { IMovieDetails } from '../../services/MovieService';


interface IModalMovieProp {
    movieDetail: IMovieDetails | undefined
}

export default function ModalMovie({ movieDetail }: IModalMovieProp) {
    const dialog = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (!dialog.current || !movieDetail) return;
        dialog.current.showModal();
    }, [movieDetail]);

    const handleClose = () => {
        if (!dialog.current) return;
        dialog.current.close()
    }

    return (
        <dialog className='dg-modal' ref={dialog}>
            <a className='dg-close' onClick={handleClose}>✖</a>
            <div className='dg-content'>
                <div className='dg-movie-title'>{movieDetail?.Title}</div>
                <div className='dg-movie-info'>
                    <div className='dg-movie-details'>
                        <p><b>Año:</b> {movieDetail?.Year}</p>
                        <p><b>País:</b> {movieDetail?.Country}</p>
                        <p><b>Idioma:</b> {movieDetail?.Language}</p>
                        <p><b>Generos:</b> {movieDetail?.Genre}</p>
                        <p><b>Actores:</b> {movieDetail?.Actors}</p>
                        <p><b>Clasificacion:</b> {movieDetail?.Rated}</p>
                        <p><b>Rating:</b> {movieDetail?.imdbRating}</p>
                    </div>
                    <img src={movieDetail?.Poster}/>
                </div>
                <div className='dg-movie-description'>
                    <h2>Descripcion</h2>
                    <p>{movieDetail?.Plot}</p>
                </div>
            </div>
        </dialog>
    )
}