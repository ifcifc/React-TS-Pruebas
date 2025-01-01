import './App.css'
import Progress from '../progress/Progress';
import { useCatFact } from '../../hooks/useCatFact';
import { useEffect, useRef } from 'react';
import catError from '../../assets/cat_error.jpeg';

export default function App(): JSX.Element {
  const [fact, catUrl, refreshCatFact] = useCatFact({});
  const imgRef = useRef<HTMLImageElement>(null);
  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = catError;
  };

  useEffect(() => refreshCatFact(), []);

  //Comprueba si la imagen se cargo correctamente, sino la cambia la imagen por la de error
  useEffect(() => {
    setTimeout(() => {
      if(!imgRef.current || imgRef.current.complete)return;
      imgRef.current.src = catError;
    }, 5000);
  }, [catUrl]);


  return (
    <main className='app-container'>
      <h1>Cat Fact</h1>
      <section>
        <p>{fact}</p>
        <img src={catUrl} ref={imgRef} alt='Random cat' onError={onImgError} />
      </section>
      <Progress updateFact={refreshCatFact} timeout={30}/>
    </main>
  )
}


