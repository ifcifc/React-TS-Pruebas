import { useEffect, useState } from "react";
import './Progress.css';

interface ProgressProp{
    updateFact:()=>void;
    timeout?:number;
}

export default function Progress({updateFact, timeout=10}:ProgressProp): JSX.Element {
    const [progressValue, setProgressValue] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressValue(prevValue=>{
                if(prevValue===100)updateFact();
                return (prevValue+1)%101;
            });
        }, 1000/100*timeout);

        return () => clearInterval(interval);
    }, []);

    return (
        <progress className="pr-progress" value={progressValue} max={100}></progress>
    )
}