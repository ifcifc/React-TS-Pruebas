import './App.css'
import Filter from '../filter/Filter';
import { useState } from 'react';
import Search from '../search/Search';
import PagesContextProvider from '../pagesContext/PagesContext';
import MovieList from '../movieList/MovieList';



export default function App() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <PagesContextProvider>
      <h1>Peliculas</h1>
      <Filter setIsSearching={setIsSearching}/>
      <main>
        {(isSearching)? <Search/>:<MovieList/>}
      </main>
    </PagesContextProvider>
  )
}

