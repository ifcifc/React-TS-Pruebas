import { useEffect, useState } from 'react';
import './CatFacts.css';
import { useFilteredFacts } from '../../hooks/useFilteredFacts';
import { useFacts } from '../../hooks/useFacts';


export function CatFacts() {
    const [facts, refreshFacts] = useFacts();
    const [isSorted, setIsSorted] = useState(false);
    const [filter, setFilter] = useState('');
    const sortFacts = useFilteredFacts({facts, filter, isSorted});

    const handleSort = () => setIsSorted(prev=>!prev);
    const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => setFilter(event.target.value);

    useEffect(refreshFacts, [refreshFacts]);

    return (
        <div className='cf-container'>
            <button onClick={refreshFacts}>Get Cat Facts</button>
            <fieldset>
                <input id='filter' type='text' onChange={handleInput} value={filter} placeholder='Filter facts' />
                <label htmlFor='sort'>
                    <input id='sort' type='checkbox' onChange={handleSort} checked={isSorted} />
                    Sort Facts
                </label>
            </fieldset>
            <ul>
                {
                    sortFacts.length===0? 
                        <p>Without results</p>:
                        sortFacts.map((fact) => (<li key={fact.id}>{fact.fact}</li>))
                }
            </ul>
        </div>
    )
}