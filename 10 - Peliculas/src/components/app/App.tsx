import { Movie } from '../movie/Movie'
import './App.css'
import Filter from '../filter/Filter';
import { useState } from 'react';
import { IMovie } from '../../services/MovieService';


export default function App() {
  const [movies, setMovies] = useState([] as IMovie[]);

  return (
    <>
      <h1>Peliculas</h1>
      <Filter setMovies={setMovies} />
      <main>
        {
          (movies.length > 0) ?
            movies.map((mv) => <Movie key={mv.id} imageUrl={mv.imageUrl} title={mv.title} year={mv.year}/>)
            : <p>No se encontraron peliculas</p>
        }
      </main>
    </>
  )
}
