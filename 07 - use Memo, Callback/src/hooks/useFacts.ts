import { useCallback, useState } from "react";
import { getFacts, IFact } from "../services/FactsService";

//Carga los facts
export function useFacts(): [IFact[], () => void]{
    const [facts, setFacts] = useState<IFact[]>([]);
    const refreshFacts = useCallback(() => {
        getFacts()
            .then((data) => setFacts(data))
            .catch((error) => console.error(error));
    }, []);

    return [facts, refreshFacts]
}