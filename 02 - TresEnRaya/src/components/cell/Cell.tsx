import { useState } from "react";
import "./Cell.css";
import PlayersSymbols from "../../common/PlayersSymbols";

interface CellProps {
    index: number,
    selected: number,
    handleClick: (index: number) => void
}



export default function Cell({index, selected, handleClick}:CellProps) : JSX.Element {
    const [isSelected, setIsSelected] = useState(false);

    const onClick = () => {
        if(selected === 0) {
            setIsSelected(false);
        }else if(isSelected) return;
        
        setIsSelected(true);
        handleClick(index);
    };

    return (
        <div className="cl-cell" onClick={onClick}>
            {PlayersSymbols[selected]}
        </div>
    )
}