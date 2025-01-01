import { useState } from "react";

const ENDPOINT_CAT_FACT: string = 'https://catfact.ninja/fact';
const ENDPOINT_CAT_RANDOM_IMAGE: string = 'https://cataas.com/cat';
const ENDPOINT_CAT_RANDOM_IMAGE_DEFAULT = `${ENDPOINT_CAT_RANDOM_IMAGE}?width=512&height=512`;
const ENDPOINT_CAT_RANDOM_IMAGE_ERROR = 'https://cataas.com/cat/tired/says/Oh%20No!?width=512&height=512&fontColor=yellow';

const DEFAULT_FACT: string = 'Lorem input dolor sit amet';

interface CatURL{
    says?: string, 
    width: number, 
    height: number
}

function getCatUrl({says, width = 512, height = 512}:CatURL): string {
    return `${ENDPOINT_CAT_RANDOM_IMAGE}${says ? `/says/${says}` : ''}?width=${width}&height=${height}&fontColor=yellow`;
}

interface CatFactProps {
    defaultFact?: string;
    defaultCatUrl?: string;
    defaultSize?: number[];
}

export const useCatFact = ({defaultFact=DEFAULT_FACT, defaultCatUrl=ENDPOINT_CAT_RANDOM_IMAGE_DEFAULT, defaultSize=[512,512]}:CatFactProps):[string, string, () => void] => {
    const [fact, setFact] = useState(defaultFact);
    const [catUrl, setCatUrl] = useState(defaultCatUrl);

    const refreshCatFact = ()=> {
        fetch(ENDPOINT_CAT_FACT)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setFact(data.fact);
                setCatUrl(getCatUrl({
                    says: data.fact.split(' ', 5).join('%20'),
                    width: defaultSize[0],
                    height: defaultSize[1]
                }));
            })
            .catch(error => {
                console.error('Error:', error);
                setFact('Error getting the fact');
                setCatUrl(ENDPOINT_CAT_RANDOM_IMAGE_ERROR);
            })
    }



    return [fact, catUrl, refreshCatFact];
}