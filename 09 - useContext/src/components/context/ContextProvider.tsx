import { createContext, useState } from "react";
import "./ContextProvider.css"
import { IChildren } from "../../common/IChildren";

export const Context = createContext("");

export const ContextProvider = ({children}:IChildren) => {
    const [data, setData] = useState<string|undefined>(undefined);

    const handleClick = ()=>{
        const value = prompt("Insert context value");
        setData((val)=>value??val);
    }

    return (
        <Context.Provider value={data}>
            <div className="ctx-set" onClick={handleClick}>Set Context</div>
            {children}
        </Context.Provider>
    );
};
