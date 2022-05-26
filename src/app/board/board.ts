export class Board {
    row: Array<string>;
    col: Array<string>;
    Squares: Square[][];
    player!: {
        rowId: number,
        colId: number,
        steps: number,
    }
    GreenSquare!: Square[];

    constructor(length: number) {
        this.row = [];
        this.col = []
        for (var i = 1; i <= length; i++) {
            this.row.push(i.toString());
            this.col.push(i.toString());
        }
        this.Squares = BoardHelper.InitSquares(this.row, this.col, length);
        this.player = BoardHelper.InitPlayer(length);
        this.GreenSquare = BoardHelper.InitGreenSquare(this, length);

    }
}

export class Square {
    SquareRowId: string = "";
    SquareColId: String = "";
    IsGreen: boolean = false;
    isPlayer: boolean = false;
}

export class BoardHelper {
    static BuildBoard(length: number) {
        var board = new Board(length);
        board.Squares = this.loadGreenBlocks(board, length);
        board.Squares = this.loadPlayerOnBoard(board, length);


        return board;
    }

    static InitSquares(row: string[], col: string[], length: number) {
        var squares: Square[][];
        squares = new Array<Square[]>(length);
        for (var i = 1; i <= length; i++) {
            squares[i - 1] = new Array<Square>(length);
            for (var j = 1; j <= length; j++) {
                squares[i - 1][j - 1] = {
                    SquareRowId: row[j - 1],
                    SquareColId: col[i - 1],
                    IsGreen: false,
                    isPlayer: false,
                };
            }
        }

        return squares;
    }

    static InitPlayer(length: number) {
        var id = length % 2 === 0 ? (length / 2) : ((length - 1) / 2)
        var player = {
            rowId: id,
            colId: id,
            steps: 0,
        }
        return player;
    }

    static InitGreenSquare(board: Board, length: number) {
        var greenSquares = [];
        var i = 0;
        while (i != length) {
            var row = Math.floor((Math.random() * length) + 1);
            var col = Math.floor((Math.random() * length) + 1);
            var square = board.Squares[board.row.indexOf(row.toString())][board.col.indexOf(col.toString())];
            if (!(square.IsGreen && !(row === board.player.rowId && col === board.player.colId))) {
                greenSquares.push(square);
                i += 1;
            }
        }
        return greenSquares;
    }

    static loadPlayerOnBoard(board: Board, length: number) {
        var squares = this.loadGreenBlocks(board, length)
        var row = board.row.indexOf(board.player.rowId.toString());
        var col = board.row.indexOf(board.player.colId.toString());
        var square = squares[row][col];
        if (square) {
            square.isPlayer = true;
            if (square.IsGreen && square.isPlayer) {
                console.log('matched');
                square.IsGreen = false;
                board.GreenSquare = board.GreenSquare.filter(square => {
                    return !(square.SquareRowId === board.player.rowId.toString() && square.SquareColId === board.player.colId.toString());
                });

                console.log(board.GreenSquare);
            }

        }
        return squares;
    }

    static loadGreenBlocks(board: Board, length: number) {
        var squares = this.InitSquares(board.row, board.col, length);
        board.GreenSquare.forEach(square => {
            var row = board.row.indexOf(square.SquareRowId.toString());
            var col = board.row.indexOf(square.SquareColId.toString());
            var square = squares[row][col];
            if (square) {
                square.IsGreen = true
            }
        })

        return squares;
    }

    static checkGreenSquares(board: Board) {
        return board.GreenSquare.length === 0

    }

    static movePlayerRight(board: Board, length: number) {
        board.player = {
            ...board.player,
            rowId: (board.player.rowId + 1) <= length ? board.player.rowId + 1 : board.player.rowId,
            steps: (board.player.rowId + 1) <= length ? board.player.steps + 1 : board.player.steps,
        }
        board.Squares = this.loadPlayerOnBoard(board, length);
        return board;
    }

    static movePlayerLeft(board: Board, length: number) {
        board.player = {
            ...board.player,
            rowId: (board.player.rowId - 1) >= 1 ? board.player.rowId - 1 : board.player.rowId,
            steps: (board.player.rowId - 1) >= 1 ? board.player.steps + 1 : board.player.steps,
        }
        board.Squares = this.loadPlayerOnBoard(board, length);
        return board;
    }

    static movePlayerDown(board: Board, length: number) {
        board.player = {
            ...board.player,
            colId: (board.player.colId - 1) >= 1 ? board.player.colId - 1 : board.player.colId,
            steps: (board.player.colId - 1) >= 1 ? board.player.steps + 1 : board.player.steps,
        }
        board.Squares = this.loadPlayerOnBoard(board, length);
        return board;
    }

    static movePlayerTop(board: Board, length: number) {
        board.player = {
            ...board.player,
            colId: (board.player.colId + 1) <= length ? board.player.colId + 1 : board.player.colId,
            steps: (board.player.colId + 1) <= length ? board.player.steps + 1 : board.player.steps,
        }
        board.Squares = this.loadPlayerOnBoard(board, length);
        return board;
    }
}