class Game {
  constructor(canvasIdName, whichKeyToPress) {
    this.gameCanvas = document.getElementById(canvasIdName);
    this.gameCanvas.height = "500";
    this.gameCanvas.width = "440";
    //to create context
    this.ctx = this.gameCanvas.getContext("2d");
    this.frames = 0;
    this.state = new State();
    //Object variables
    this.whichKeyToPress = whichKeyToPress;

    this.spriteImage = new Image();
    this.spriteImage.src = "./images/sprite-sheet.png";

    this.pipes = new Pipes(this.gameCanvas, this.ctx, this.spriteImage);
    this.belowBG = new BelowTile(this.gameCanvas, this.ctx, this.spriteImage);
    this.bird = new Bird(
      this.gameCanvas,
      this.ctx,
      this.spriteImage,
      this.belowBG
    );
    this.scoreBoard = new Score(this.gameCanvas, this.ctx);
    this.getReady = new ReadySetGo(this.gameCanvas, this.ctx, this.spriteImage);
    this.gameOver = new GameOver(this.gameCanvas, this.ctx, this.spriteImage);
    // this.drawCanvas();

    this.gamePlay();
    this.actionAfterKeyPressed();
  }

  drawCanvas() {
    let currentState = this.state.getState();

    this.context.fillStyle = "#70c5ce";
    this.context.fillRect(0, -150, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(bgImage, 0, -150, 235, 500);
    this.ctx.drawImage(bgImage, 230, -150, 235, 500);

    let imgg = new Image();
    imgg.src = "./images/cylinder.png";
    imgg.onload = (e) => {
      this.ctx.drawImage(imgg, 0, -150, 70, 150);
    };
    this.pipes.draw();
    this.belowBG.draw();
    this.bird.draw();
    this.getReady.draw(currentState);
    this.gameOver.draw(currentState);
    this.scoreBoard.draw(currentState);
    bgImage.onload = (e) => {
      //   console.log("loaded");
      this.ctx.drawImage(bgImage, 0, -150, 235, 500);
      this.ctx.drawImage(bgImage, 230, -150, 235, 500);
    };
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
// pp.loopAnimation();
