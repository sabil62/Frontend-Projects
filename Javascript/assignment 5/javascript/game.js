class Game {
  constructor(canvasIdName, whichKeyToPress) {
    this.gameCanvas = document.getElementById(canvasIdName);
    this.gameCanvas.height = 500;
    this.gameCanvas.width = 340;
    //to create context
    this.ctx = this.gameCanvas.getContext("2d");
    this.frames = 0;
    this.state = new State();
    //Object variables
    this.pipes;
    this.belowBG;
    this.bird;
    this.scoreBoard;
    this.getReady;
    this.gameOver;
    //set all Objects
    this.setObjects();

    this.whichKeyToPress = whichKeyToPress;
    console.log("activated");
    this.drawCanvas();
  }
  setObjects() {
    let imgArr = [
      "./images/cylinder.png",
      "./images/cylinder-down.png",
      "./images/below-bg.png",
      "./images/bird-1.png",
      "./images/score-board.png",
      "./images/get-ready.png",
      "./images/gameover.png",
    ];
    this.pipes = new Pipes(this.gameCanvas, this.ctx, imgArr[0], imgArr[1]);
    this.belowBG = new BelowTile(this.gameCanvas, this.ctx, imgArr[2]);
    this.bird = new Bird(this.gameCanvas, this.ctx, imgArr[3], this.belowBG);
    this.scoreBoard = new Score(this.gameCanvas, this.ctx);
    this.getReady = new ReadySetGo(this.gameCanvas, this.ctx, imgArr[5]);
    this.gameOver = new GameOver(this.gameCanvas, this.ctx, imgArr[6]);
  }
  drawCanvas() {
    console.log("canvas");
    let currentState = this.state.getState();
    this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    //to know extent of background
    this.ctx.fillStyle = "rgba(60,60,150,0.7)";
    this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

    //background
    this.ctx.drawImage(
      "images/cylinder.png",
      0,
      this.gameCanvas.height - 239,
      280,
      230
    );
    this.ctx.drawImage(
      "./images/bg.png",
      280,
      this.gameCanvas.height - 239,
      280,
      230
    );
    this.pipes.draw();
    this.getReady.draw(currentState);
    this.gameOver.draw(currentState);
    this.scoreBoard.draw(currentState);
  }
}
