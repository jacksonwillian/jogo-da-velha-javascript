class Score {

    constructor() {
        this.scorePlayerX = 0;
        this.scorePlayerO = 0;
    }
    
    incrementPlayerX() {
        this.scorePlayerX += 1;
    }

    incrementPlayerO() {
        this.scorePlayerO += 1;
    }

    clear() {
        this.scorePlayerX = 0;
        this.scorePlayerO = 0;
    }

}
