class Ball {
  constructor(mainClass, diameter, canvasWidth) {
    this.mainClass = mainClass;
    this.diameter = diameter;
    this.canvasWidth = canvasWidth;
    this.ballElement;
    this.x = 0;
    this.y = 0;
    this.dirX = 0;
    this.dirY = 0;
    this.backgroundColor;
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }
  setDirection(dirX, dirY) {
    this.dirX = dirX;
    this.dirY = dirY;
  }
  setBackgroundColor(color) {
    this.backgroundColor = color;
  }
  reverseDirX() {
    this.dirX *= -1;
  }
  reverseDirY() {
    this.dirY *= -1;
  }
  isWallCollisionInX() {
    //if x = 0 or x > canvaswidth
    if (this.x <= 0 || this.x + this.diameter >= this.canvasWidth) {
      return true;
    } else {
      return false;
    }
  }
  isWallCollisionInY() {
    if (this.y <= 0 || this.y + this.diameter >= this.canvasWidth) {
      return true;
    } else {
      return false;
    }
  }
  //if collide then change box1.changeBall(box2)
  changeBallDir(collidingBall) {
    let dirXstore = this.dirX;
    this.dirX = collidingBall.dirX;
    collidingBall.dirX = dirXstore;

    let dirYstore = this.dirY;
    this.dirY = collidingBall.dirY;
    collidingBall.dirY = dirYstore;

    this.move();
    collidingBall.move();
  }
  createBall() {
    this.ballElement = document.createElement("div");
    this.ballElement.style.position = "absolute";
    this.ballElement.style.borderRadius = "50%";
    this.ballElement.style.width = this.diameter + "px";
    this.ballElement.style.height = this.diameter + "px";
    this.ballElement.style.border = "1px solid rgb(160,160,160)";
    this.ballElement.style.backgroundColor = this.backgroundColor;
    this.mainClass.appendChild(this.ballElement);
  }

  move() {
    this.x = this.x + this.dirX;
    this.y = this.y + this.dirY;
    this.illustrate();
  }
  illustrate() {
    this.ballElement.style.top = this.dirY + "px";
    this.ballElement.style.left = this.dirX + "px";
  }
}
