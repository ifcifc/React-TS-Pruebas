import { Movie } from '../movie/Movie'
import './App.css'
import Filter from '../filter/Filter';
import { useState } from 'react';
import { IMovie } from '../../services/MovieService';
import Search from '../search/Search';


export default function App() {
  const [movies, setMovies] = useState([] as IMovie[]);
  const [isSearching, setIsSearching] = useState(false);

  return (
    <>
      <h1>Peliculas</h1>
      <Filter setMovies={setMovies} setIsSearching={setIsSearching}/>
      <main>
        {
          (isSearching)? <Search/>:
          (movies.length > 0) ?
            movies.map((mv) => <Movie key={mv.id} imageUrl={mv.imageUrl} title={mv.title} year={mv.year}/>)
            : <p>No se encontraron peliculas</p>
        }
      </main>
    </>
  )
}
