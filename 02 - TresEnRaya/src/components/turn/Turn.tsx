import PlayersSymbols from "../../common/PlayersSymbols";
import "./Turn.css";

interface TurnProps {
    playerTurn: number;
}

export default function Turn({playerTurn}:TurnProps) : JSX.Element {
    return (
        <div className="tr-turn">
            <h3>Turno de:</h3>
            <div className="tr-cell" data-is_turn={playerTurn==0}>{PlayersSymbols[1]}</div>
            <div className="tr-cell" data-is_turn={playerTurn==1}>{PlayersSymbols[2]}</div>
        </div>
    )
}