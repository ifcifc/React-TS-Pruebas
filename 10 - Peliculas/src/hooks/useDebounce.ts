import { useEffect, useRef } from 'react';

/**
 * Hook para ejecutar un método después de un tiempo desde el último cambio en una dependencia.
 * 
 * @param handler Función a ejecutar después del tiempo de espera.
 * @param timeout Tiempo de espera en milisegundos.
 * @param deps Dependencias para reiniciar el temporizador.
 */export function useDebounce(handler:TimerHandler, timeout:number, deps: React.DependencyList=[]){
    const timeoutId = useRef<number>(0);
    useEffect(()=>{
        clearTimeout(timeoutId.current);
        timeoutId.current = setTimeout(handler, timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
}