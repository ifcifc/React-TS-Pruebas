export interface IFact {
    fact: string;
    length: number;
    id: string;
}

//Obtiene los facts
export async function getFacts(): Promise<IFact[]> {
    console.log('call to getFacts');

    const randomPage = Math.floor(Math.random() * 34) + 1;
    const response = await fetch(`https://catfact.ninja/facts?page=${randomPage}`);
    const data = await response.json();
    if(response.status !== 200 || data.data===undefined)throw new Error('Error: Al obtener los facts');
    return data.data.map((v: { fact: string; length: number; }, index:number) => ({
        fact: v.fact,
        length: v.length,
        id: `FACT_${randomPage}_${index}`
    }));
}