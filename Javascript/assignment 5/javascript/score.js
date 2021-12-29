class Score {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.value = 0;
    this.highScore = 0;
    let localStore = parseInt(localStorage.getItem("highScore"));

    if (localStore) {
      this.highScore = localStore;
    }
  }

  draw(state) {
    this.ctx.fillStyle = "gray";
    this.ctx.strokeStyle = "black";
    if (state == 1) {
      this.ctx.lineWidth = 3;
      this.ctx.font = "36px Verdana";
      //.filltext(text,xpos,ypos)
      this.ctx.fillText(this.value, this.canvas.width / 2, 50);
      this.ctx.strokeText(this.value, this.canvas.width / 2, 50);
    } else if (state == 2) {
      //total score
      this.ctx.font = "24px Verdana";
      this.ctx.fillText(this.value, 230, 190);
      this.ctx.strokeText(this.value, 230, 190);
      //high score
      this.ctx.fillText(this.highScore, 230, 230);
      this.ctx.strokeText(this.highScore, 230, 230);
    }
  }
  //used for new game
  reset() {
    this.value = 0;
  }
}
