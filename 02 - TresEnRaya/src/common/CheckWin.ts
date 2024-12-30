export enum GameStatus {
    PLAYING,
    DRAW,
    WIN_PLAYER1,
    WIN_PLAYER2
}

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6] 
];

export default function checkWin(board: number[]):GameStatus {
    let allSum:number = 0;

    for (const condition of winConditions) {
        //Suma las celdas del juegador 1
        const sumPlayer1:number = board
            .filter((_, index) => condition.includes(index) && board[index] === 1)
            .reduce((acc, cell) => acc + cell, 0);
        
        //Suma las celdas del juegador 2
        const sumPlayer2:number = board
            .filter((_, index) => condition.includes(index) && board[index] === 2)
            .reduce((acc, cell) => acc + cell, 0);
        
        allSum += sumPlayer1 + sumPlayer2;
        
        //Si la suma de las celdas de una combinación es 3, gana el jugador 1,
        if(sumPlayer1 === 3)return GameStatus.WIN_PLAYER1;
        //Si es 6, gana el jugador 2
        if(sumPlayer2 === 6)return GameStatus.WIN_PLAYER2;
    }
    
    //Si la suma de todas las celdas es mayor o igual a 34, es un empate
    return (allSum>=34)? GameStatus.DRAW:GameStatus.PLAYING;
}