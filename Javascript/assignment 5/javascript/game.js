class Game {
  constructor(canvasIdName, whichKeyToPress) {
    this.gameCanvas = document.getElementById(canvasIdName);

    this.gameCanvas.height = "500";
    this.gameCanvas.width = "340";
    //to create context
    this.ctx = this.gameCanvas.getContext("2d");
    this.frames = 0;
    this.state = new State();
    //Object variables

    this.whichKeyToPress = whichKeyToPress;

    let imagesArray = [
      "./images/cylinder.png",
      "./images/cylinder-down.png",
      "./images/below-bg.png",
      "./images/bird-1.png",
      "./images/score-board.png",
      "./images/get-ready.png",
      "./images/gameover.png",
    ];
    let imgArr = [];
    for (let i = 0; i < imagesArray.length; i++) {
      let imgg = new Image();
      imgg.src = imagesArray[i];
      imgArr.push(imgg);
    }
    this.pipes = new Pipes(this.gameCanvas, this.ctx);
    this.belowBG = new BelowTile(this.gameCanvas, this.ctx, imgArr[2]);
    this.bird = new Bird(this.gameCanvas, this.ctx, imgArr[3], this.belowBG);
    this.scoreBoard = new Score(this.gameCanvas, this.ctx);
    this.getReady = new ReadySetGo(this.gameCanvas, this.ctx, imgArr[5]);
    this.gameOver = new GameOver(this.gameCanvas, this.ctx, imgArr[6]);
    // this.drawCanvas();
    this.gamePlay();
    this.actionAfterKeyPressed();
  }

  drawCanvas() {
    let currentState = this.state.getState();
    // let imgg = new Image();
    // imgg.src = "./images/cylinder.png";
    // imgg.onload = (e) => {
    //   this.ctx.drawImage(imgg, 10, 100, 70, 150);
    // };

    //background Images
    let bgImage = new Image();
    bgImage.src = "./images/bg.png";
    //background
    bgImage.onload = (e) => {
      //   console.log("loaded");
      //   this.ctx.drawImage(bgImage, 0, 0, 300, 500);
      this.ctx.drawImage(bgImage, 280, this.gameCanvas.height - 239, 280, 230);
    };
    this.pipes.draw();
    this.belowBG.draw();
    this.bird.draw();
    this.getReady.draw(currentState);
    this.gameOver.draw(currentState);
    this.scoreBoard.draw(currentState);
  }
  gamePlay() {
    this.gameCanvas.onclick = (e) => {
      let state = this.state.getState();
      console.log(state);
      switch (state) {
        case 0:
          this.state.changeState(1);
          break;
        case 1:
          if (this.bird.y - this.bird.radius <= 0) {
            return;
          }
          if (this.whichKeyToPress == 0) {
            this.bird.flapBirdWings();
          }
          break;
        case 2:
          let rectangle = this.gameCanvas.getBoundingClientRect();
          let xClick = e.clientX - rectangle.left;
          let yClick = e.clientY - rectangle.top;
          //start button clicked or not (cordinates determined)
          if (
            xClick <= 120 + 85 &&
            xClick >= 120 &&
            yClick >= 265 &&
            yClick <= 265 + 30
          ) {
            //restart all without onloading
            this.pipes.reset();
            this.scoreBoard.reset();
            this.state.changeState(0);
            this.bird.resetBird();
          }
          break;
      }
    };
  }
  actionAfterKeyPressed() {
    document.addEventListener("keydown", (e) => {
      let pressedButton = e.code;
      if (pressedButton == "Space") {
        // console.log("space bar");
        let state = this.state.getState();
        e.preventDefault();
        if (state == 1) {
          if (this.bird.y - this.bird.radius <= 0) {
            return;
          }
          if (this.whichKeyToPress == 1) {
            this.bird.flapBirdWings();
          }
        }
      }
    });
  }
  updateGameObjects() {
    this.bird.update(this.frames, this.state);
    this.belowBG.update(this.state.getState());
    this.pipes.updatePipe(this.bird, this.scoreBoard, this.frames, this.state);
  }
  loopAnimation() {
    this.updateGameObjects();
    this.drawCanvas();
    this.frames++;
    // console.log(this.frames);
    //this is more efficient and determines frames itself
    requestAnimationFrame(this.loopAnimation.bind(this));
  }
}

let pp = new Game("flappyGame-1", 1);
pp.loopAnimation();
