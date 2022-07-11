const boardObject = {

    board: [
        '', '', '', 
        '', '', '',
        '', '', '',
    ],

    players: {
        symbols: ['X', 'O'],
        currentPlayerIndex: 0,
        changePlayer: function() {
            this.currentPlayerIndex = (this.currentPlayerIndex === 0) ? 1: 0;
        }
    },
    
    boardSelector: null,

    cellSelector: null,

    onGameCompletionNotification: null,

    onGameStartedNotification: null,

    finished: false,

    winningSequences: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ],

    /**
     * @param {string} symbol
     */
    checkWinningSequence: function(symbol) {
        for(i in this.winningSequences) {
            if (this.board[this.winningSequences[i][0]] === symbol &&
                this.board[this.winningSequences[i][1]] === symbol &&
                this.board[this.winningSequences[i][2]] === symbol) {
                    return this.winningSequences[i];
            }
        }   
    },

    checkTie: function() {
        for(const value of this.board) {
            if (value === '') {
                return false;
            }
        }
        return true;
    },
    
    /**
     * @param {string} boardSelector - identify board Element
     * @param {string} cellSelector - identify cell Elements
     */
    init: function(boardSelector, cellSelector, onGameCompletionNotification, onGameStartedNotification) {
        if (!boardSelector || !cellSelector) {
            throw new Error("Seletores de identificação dos elementos não informado!");
        }
        this.boardSelector = boardSelector;
        this.cellSelector = cellSelector;
        this.onGameCompletionNotification = onGameCompletionNotification;
        this.onGameStartedNotification = onGameStartedNotification;

        const boardElement = document.querySelector(this.boardSelector);

        for (let i in this.board) {
            const cellElement = document.createElement("div");
            cellElement.setAttribute("class", `${this.cellSelector} ${this.cellSelector}-${i}`);
            cellElement.onclick = () => {
                this.make_play(i);
            };
            boardElement.appendChild(cellElement);
        }
    },

    /**
     * show board in view
     */
    draw: function() {
        for (let i in this.board) { 
            const cellElement = document.querySelector(`div.${this.cellSelector}-${i}`);
            cellElement.innerText = this.board[i];
        }
    },

    /**
     * @param {Number} position
     */
    make_play: function(position) {

        if(this.finished) {
            this.startGame();
            return;
        };

        if(this.board[position] === '') {
            let currentSymbol = this.currentPlayerSymbol();
            this.board[position] = currentSymbol;
            this.draw();
            let hasWinningSequence = this.checkWinningSequence( currentSymbol );
            if(hasWinningSequence) {
                this.finishGame({winner: currentSymbol, sequence: hasWinningSequence});
            } else if (this.checkTie()) {
                this.finishGame();
            } else {
                this.players.changePlayer();
            }
        } 
    },

    finishGame: function (data) {
        this.finished = true;
        try {
            this.onGameCompletionNotification(data);
        } catch (e) {

        }
    },

    startGame: function () {
        this.board.fill('');
        this.draw();
        this.finished = false;
        this.players.changePlayer();
        if(this.onGameStartedNotification) {
            this.onGameStartedNotification();
        }
    },

    currentPlayerSymbol: function () {
        return this.players.symbols[this.players.currentPlayerIndex];
    }

};