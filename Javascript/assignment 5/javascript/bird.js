class Bird {
  constructor(canvas, ctx, image, belowTile) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.image = image;
    this.belowTile = belowTile;
    this.x = 45;
    this.y = 155;
    this.width = 36;
    this.height = 28;
    this.radius = 12;
    this.gravity = 0.25;
    this.frame = 0;
    this.speed = 0;
    this.rotation = 0;
    this.jump = 4.5;
    //inside coordinates
    this.DEGREE = Math.PI / 180;
  }
  draw() {
    console.log("bird drawn");
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.rotation);
    this.image.onload = (e) => {
      // this.ctx.drawImage(
      //   this.image,
      //   this.x,
      //   this.y - 150,
      //   -this.width / 2,
      //   -this.height / 2
      // );
      this.ctx.drawImage(this.image, 0, -150, 36, 28);
    };
  }
  flapBirdWings() {
    this.speed = -this.jump;
  }
  update(frames, stateObj) {
    //if gamestate is ready then bird flap
    let currentState = stateObj.getState();
    this.period = currentState == 0 ? 10 : 5;

    //increment frame 1
    this.frame += frames % this.period == 0 ? 1 : 0;

    if (currentState == 0) {
      this.y = 150; //reset  positon of bird when new game
      this.rotation = 0 * this.DEGREE;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if (
        this.y + this.height / 2 >=
        this.canvas.height - this.belowTile.height
      ) {
        this.y = this.ctx.height - this.belowTile.height - this.height / 2;

        if (currentState == 1) {
          stateObj.changeState(2);
        }
      }
      if (this.speed >= this.jump) {
        this.rotation = 90 * this.DEGREE;
        this.frame = 1;
      } else {
        this.rotation = -25 * this.DEGREE;
      }
    }
  }
  //for new game
  resetBird() {
    this.speed = 0;
  }
}
