import { useEffect } from 'react';

type setIntersecting = (isIntersecting:boolean)=>void;

export function useIntersection(handler:setIntersecting, element:React.RefObject<HTMLElement>, threshold:number=0.1, deps: React.DependencyList=[]) {
    useEffect(() => {
        //Observa si un elemento es o no es visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                handler(entry.isIntersecting);
            },
            { threshold: threshold }
        );

        const currentElement = element?.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [handler, element, threshold, ...deps]);
}