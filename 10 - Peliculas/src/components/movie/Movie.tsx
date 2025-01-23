import { IMovie } from '../../services/MovieService';
import './Movie.css'

interface MovieProp extends IMovie{
    onClick?: React.MouseEventHandler<HTMLDivElement>
}

export  function Movie({imageUrl, title, year, id, onClick}:MovieProp){
    return(
        <div className='mv-container' onClick={onClick} data-movie_id={id}>
            <div className='mv-year'>{year}</div>
            <img src={imageUrl} alt={title}/>
            <div className='mv-info' >{title}</div>            
        </div>
    );
}