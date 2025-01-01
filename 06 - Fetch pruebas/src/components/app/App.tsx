import { useEffect, useState } from 'react'
import './App.css'
import Progress from '../progress/Progress';

const ENDPOINT_CAT_FACT: string = 'https://catfact.ninja/fact';
const ENDPOINT_CAT_RANDOM_IMAGE: string = 'https://cataas.com/cat';
const ENDPOINT_CAT_RANDOM_IMAGE_DEFAULT = `${ENDPOINT_CAT_RANDOM_IMAGE}?width=512&height=512`;
const ENDPOINT_CAT_RANDOM_IMAGE_ERROR = 'https://cataas.com/cat/tired/says/Oh%20No!?width=512&height=512&fontColor=yellow';
const URL_CAT_ERROR = 'cat_error.jpeg';

function getCatUrl(says?: string, width: number = 512, height: number = 512): string {
  return `${ENDPOINT_CAT_RANDOM_IMAGE}${says ? `/says/${says}` : ''}?width=${width}&height=${height}&fontColor=yellow`;
}

function fetchCatFact(setFact: (fact: string) => void, setCatUrl: (url: string) => void) {
  fetch(ENDPOINT_CAT_FACT)
    .then(response => {
      if(!response.ok)throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      setFact(data.fact);
      setCatUrl(getCatUrl(data.fact.split(" ", 5).join("%20")));
    })
    .catch(error => {
      console.error('Error:', error);
      setFact('Error getting the fact');
      //Es probale que la imagen nunca se muestre ya que la causa mas probable de error 
      //es que no haya conexión a internet
      setCatUrl(ENDPOINT_CAT_RANDOM_IMAGE_ERROR);
    })
}

export default function App(): JSX.Element {
  const [fact, setFact] = useState("Lorem input dolor sit amet");
  const [catUrl, setCatUrl] = useState(ENDPOINT_CAT_RANDOM_IMAGE_DEFAULT);

  const updateFact = () => fetchCatFact(setFact, setCatUrl);

  const onImgError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = URL_CAT_ERROR;
  };

  useEffect(updateFact, []);

  return (
    <main className='app-container'>
      <h1>Cat Fact</h1>
      <section>
        <p>{fact}</p>
        <img src={catUrl} alt="Random cat" onError={onImgError} />
      </section>
      <Progress updateFact={updateFact} timeout={30}/>
    </main>
  )
}


