class Pipes {
  constructor(canvas, ctx, pipeImage) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pipeImage = pipeImage;
    this.gapAtleast = 90;
    this.wid = 60;
    this.height = 400;
    this.dirX = 2;
    this.position = [];
    this.maxYposition = -150;
  }
  draw() {
    this.pipeImage.onload = (e) => {
      this.ctx.drawImage(this.pipeImage, 2, 0, 82, 103, 100, 0, 82, 103);
    };
    // console.log(this.position);
    for (let i = 0; i < this.position.length; i++) {
      // console.log("image loaded");
      let pos = this.position[i];
      let positionBottomY = pos.y + this.height + this.gapAtleast;

      //DRAW TOP PIPE
      this.pipeImage.onload = (e) => {
        this.ctx.drawImage(this.pipeImage, 2, 0, 82, 103, 100, 0, 82, 103);
      };
      //DRAW BOTTOM PIPE
      this.pipeImageBottom.onload = (event) => {
        this.ctx.drawImage(
          this.pipeImageBottom,
          pos.x,
          positionBottomY,
          this.wid,
          this.height
        );
      };
    }
  }
  updatePipe(bird, score, frames, stateObject) {
    // console.log(this.position);
    let stateNow = stateObject.getState();
    if (stateNow != 1) {
      return true;
    }
    if (frames % 100 == 0) {
      this.position.push({
        x: this.canvas.width,
        y: this.maxYposition * (Math.random() + 1),
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let pos = this.position[i];

      let positionBottomY = pos.y + this.height + this.gapAtleast;

      //to detect collision in top pipe
      if (
        bird.x + bird.radius > pos.x &&
        bird.x - bird.radius < pos.x + this.wid &&
        bird.y + bird.radius > pos.y &&
        bird.y - bird.radius < pos.y + this.height
      ) {
        stateObject.changeState(2);
      }
      //detect collision in below pipe
      if (
        bird.x + bird.radius > pos.x &&
        bird.x - bird.radius < pos.x + this.wid &&
        bird.y + bird.radius > positionBottomY &&
        bird.y - bird.radius < positionBottomY + this.height
      ) {
        stateObject.changeState(2);
      }

      //moving pipe to left
      pos.x -= this.dirX;
      if (pos.x + this.wid <= 0) {
        this.position.shift();
        score.value += 1;
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("highScore", score.best);
      }
    }
  }
  reset() {
    this.position = [];
  }
}
