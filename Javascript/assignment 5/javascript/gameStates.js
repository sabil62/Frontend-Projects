// getting ready
class ReadSetGo {
  constructor(canvas, ctx, getReadyImage) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.getReadyImage = getReadyImage;
    this.sX = 0;
    this.sY = 230;
    this.width = 180;
    this.height = 158;
    //to place in center
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = 88;
  }
  draw(state) {
    if (state == 0) {
      this.ctx.drawImage(
        this.getReadyImage,
        this.sX,
        this.sY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}
// getting ready
class GameOver {
  constructor(canvas, ctx, gameOverImage) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.gameOverImage = gameOverImage;
    this.sX = 176;
    this.sY = 230;
    this.width = 228;
    this.height = 204;
    //to place in center
    this.x = this.canvas.width / 2 - this.width / 2;
    this.y = 88;
  }
  draw(state) {
    if (state == 2) {
      this.ctx.drawImage(
        this.gameOverImage,
        this.sX,
        this.sY,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
  }
}
//state
class State {
  constructor() {
    this.current = 0;
  }
  getState() {
    return this.current;
  }
  changeState(state) {
    this.current = state;
  }
}

//GAME KEYSTATE
const keyState = {
  current: 0,
  pressed: 1,
  released: 0,
};
