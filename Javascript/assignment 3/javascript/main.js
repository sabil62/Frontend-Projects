class Ball {
  constructor(mainClass, diameter, canvasWidth) {
    this.mainClass = mainClass;
    this.diameter = diameter;
    this.canvasWidth = canvasWidth;
    this.x = 0;
    this.y = 0;
    this.dirX = 0;
    this.dirY = 0;
    this.backgroundColor = null;
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
  changeBallDir() {}
}
