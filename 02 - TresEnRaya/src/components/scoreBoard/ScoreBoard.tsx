import PlayersSymbols from "../../common/PlayersSymbols";
import "./ScoreBoard.css";

interface ScoreBoardProps {
    player1Score: number;
    player2Score: number;
    resetScore: () => void;
}

export default function ScoreBoard({player1Score, player2Score, resetScore}:ScoreBoardProps) {
    
    const clickReset = () => {
        resetScore();
    };

    return (
        <div className="sc-score-board">
            <strong>Score</strong>
            <hr/>
            <div className="sc-score-board-row"><p>Player {PlayersSymbols[1]}:</p>{player1Score}</div>
            <div className="sc-score-board-row"><p>Player {PlayersSymbols[2]}:</p>{player2Score}</div>
            <button className="sc-reset-button" onClick={clickReset}>Reset</button>
        </div>
    );
}