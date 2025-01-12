import { IMovie } from '../../services/MovieService';
import './Movie.css'



export  function Movie({imageUrl, title, year}:IMovie){
    return(
        <div className='mv-container' >
            <div className='mv-year'>{year}</div>
            <img src={imageUrl}/>
            <div className='mv-info' >{title}</div>            
        </div>
    );
}