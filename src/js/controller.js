class Controller {

    constructor(boardObject, selectors, score) {
        this.boardObject = boardObject;
        this.selectors = selectors;
        this.score = score;
        this.audio = new Audio('click.mp3');
    }

    init() {

        this.boardObject.init(
            this.selectors.boardSelector,
            this.selectors.cellSelector,
            (data) => {
                this.onGameCompletion(data);
            },
            () => {
                this.onGameStarted();
            }
        );


        const boardElement = document.querySelector(
            this.selectors.boardSelector,
        );

        boardElement.addEventListener("click", () => {
            this.clickOnBoard();
        });

        this.start();

        this.updateInfOnScreen();

    }

    clickOnBoard() {
        this.updateInfOnScreen();
        this.audio.play();
    }

    updateInfOnScreen() {
        /**
         * Apresenta jogador atual
         */
        const currentPlayerSelectorElement = document.querySelector(
            this.selectors.currentPlayerSelector,
        );
        currentPlayerSelectorElement.innerText = this.boardObject.currentPlayerSymbol();


        /**
        * Apresenta placar
        */

        const scoreXElement = document.querySelector(
            this.selectors.scoreXSelector
        );
        scoreXElement.innerText = this.score.scorePlayerX;

        const scoreOElement = document.querySelector(
            this.selectors.scoreOSelector
        );
        scoreOElement.innerText = this.score.scorePlayerO;

    }

    onGameCompletion(data) {
        this.setColorCell('grey', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        if (data) {
            this.setColorCell('white', data.sequence);
            if (data.winner === this.boardObject.players.symbols[0]) {
                this.score.incrementPlayerX();
            } else {
                this.score.incrementPlayerO();
            }
        }
        this.updateInfOnScreen();
    }

    onGameStarted() {
        this.setColorCell('white', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        this.updateInfOnScreen();
    }

    setColorCell(color, sequence) {
        let seletor = this.selectors.cellSelector;
        for (const i of sequence) {
            const cellElement = document.querySelector(
                `div.${seletor}-${i}`,
            );
            cellElement.style.color = color;
        }
    }

    start() {
        this.boardObject.startGame();
    }


    reiniciar() {
        this.score.clear();
        this.start();
    }

};
