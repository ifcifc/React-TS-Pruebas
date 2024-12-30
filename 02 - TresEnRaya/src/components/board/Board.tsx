import Cell from "../cell/Cell";
import "./Board.css";

interface BoardProps {
    cells: number[];
    cellClick: (index: number) => void;
}

export default function Board({cellClick, cells}:BoardProps): JSX.Element {
    return (
        <div className="bd-board">
            {cells.map((cell, index) => (<Cell key={index} index={index} selected={cell} handleClick={cellClick} />))}
        </div>
    )
}

