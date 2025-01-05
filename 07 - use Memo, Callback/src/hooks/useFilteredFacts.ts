import { useState, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { IFact } from '../services/FactsService';

//Valida el string de filtro
function checkFilter(value:string):boolean{
    return value.trim().length===0 
        || value.toLowerCase()
                .split(';')
                .every(spl=>spl.length>=3||spl.length===0);
}

interface filteredFactsProps{
    facts: IFact[],
    filter: string,
    isSorted: boolean
}

//Aplica los filtros y ordena los facts
export function useFilteredFacts({facts, filter, isSorted}:filteredFactsProps):IFact[] {
    const [filteredFacts, setFilteredFacts] = useState<IFact[]>([]);

    useDebounce(() => {
        if (!checkFilter(filter)) return;
        const newFacts = facts.filter(fact => {
            const contain: boolean = filter
                .toLowerCase()
                .split(';')
                .every(spl => fact.fact.toLowerCase().includes(spl.trim()));

            return contain && fact;
        });
        setFilteredFacts(newFacts);
    }, 500, [filter, facts])

    const sortFacts = useMemo(() => {
        console.log('call to sort facts');
        return isSorted ? [...filteredFacts].sort((a, b) => a.fact.localeCompare(b.fact)) : filteredFacts;
    }, [filteredFacts, isSorted]);

    return sortFacts;
}