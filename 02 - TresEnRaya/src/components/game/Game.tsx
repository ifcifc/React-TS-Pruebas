import { useEffect, useState } from "react";
import Board from "../board/Board";
import Turn from "../turn/Turn";
import "./Game.css";
import checkWin, { GameStatus } from "../../common/CheckWin";
import ScoreBoard from "../scoreBoard/ScoreBoard";
import Dialog from "../dialog/Dialog";
import PlayersSymbols from "../../common/PlayersSymbols";

export default function Game(): JSX.Element {
    const [openModal, setOpenModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [currentPlayer, setCurrentPlayer] = useState<number>(() => parseInt(window.sessionStorage.getItem("currentPlayer") ?? '0'));
    const [score, setScore] =  useState(() => window.sessionStorage.getItem("score") ? JSON.parse(window.sessionStorage.getItem("score") as string) : Array(2).fill(0));
    const [cells, setCells] = useState<number[]>(() => window.sessionStorage.getItem("cells") ?
        JSON.parse(window.sessionStorage.getItem("cells") as string) :
        Array(9).fill(window.sessionStorage.getItem("score")));

    //Metodo que se ejecuta cuando se hace click en una celda
    const cellClick = (index: number) => {
        const newCells = [...cells];
        newCells[index] = currentPlayer + 1;
        setCells(newCells);
        //Cambia el turno del jugador
        setCurrentPlayer((currentPlayer + 1) % 2);
    }

    const showDialog = (message: string) => {
        setModalMessage(message);
        setOpenModal(true);
    };

    const resetGame = () => {
        setCells(Array(9).fill(0));
    };

    const resetScore = () => {
        setScore(Array(2).fill(0));
        setCurrentPlayer(0);
        resetGame();
    };

    //Guarda la partida en el sessionStorage
    useEffect(() => {
        window.sessionStorage.setItem("cells", JSON.stringify(cells));
        window.sessionStorage.setItem("score", JSON.stringify(score ?? Array(2).fill(0)));
        window.sessionStorage.setItem("currentPlayer", currentPlayer.toString());
    }, [cells]);

    //Comprueba si hubo un ganador,un empate o si siguie el juego
    //en caso de que haya un ganador o un empate, muestra un mensaje
    useEffect(() => {
        let status: GameStatus = checkWin(cells);
        const newScore = [...score];

        switch (status) {
            case GameStatus.WIN_PLAYER1:
                newScore[0]++;
                showDialog(`Jugador ${PlayersSymbols[1]} Gano`);
                break;
            case GameStatus.WIN_PLAYER2:
                newScore[1]++;
                showDialog(`Jugador ${PlayersSymbols[2]} Gano`);
                break;
            case GameStatus.DRAW:
                showDialog("Empate");
                break;
        }
        setScore(newScore);
    }, [currentPlayer]);

    //Muestra el juego
    return (
        <div className="gm-container">
            <ScoreBoard player1Score={score[0]} player2Score={score[1]} resetScore={resetScore} />
            <div className="gm-game">
                <h1>Tres en raya</h1>
                <hr />
                <Board cellClick={cellClick} cells={cells} />
                <hr />
                <Turn playerTurn={currentPlayer} />
            </div>
            <Dialog isOpen={openModal} message={modalMessage} setOpenModal={setOpenModal} resetGame={resetGame}/>
        </div>
    )
}