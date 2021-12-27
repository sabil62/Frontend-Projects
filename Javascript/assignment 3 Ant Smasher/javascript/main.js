class Ball {
  constructor(mainClass, canvasClass, diameter, canvasWidth, canvasHeight) {
    this.mainClass = mainClass;
    this.diameter = diameter;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ballElement;
    this.x = 0;
    this.y = 0;
    this.dirX = 0;
    this.dirY = 0;
    this.backgroundColor;
    this.canvasElement = document.querySelector(
      `.${mainClass} .${canvasClass}`
    );
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
    if (this.x <= 0 || this.x + this.diameter * 1.05 >= this.canvasWidth) {
      return true;
    } else {
      return false;
    }
  }
  isWallCollisionInY() {
    if (this.y <= 0 || this.y + this.diameter * 1.05 >= this.canvasHeight) {
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

    this.ballElement.style.backgroundColor = this.backgroundColor;
    this.canvasElement.appendChild(this.ballElement);
  }

  move() {
    this.x = this.x + this.dirX;
    this.y = this.y + this.dirY;
    this.illustrate();
  }
  illustrate() {
    this.ballElement.style.top = this.y + "px";
    this.ballElement.style.left = this.x + "px";
  }
}

class Canvas {
  constructor(
    mainClassName,
    boxColorArr,
    ballCount,
    diameter,
    canvasWidth,
    canvasHeight,
    ballSpeed
  ) {
    this.mainClassName = mainClassName;
    this.boxColorArr = boxColorArr;
    this.ballCount = ballCount;
    this.diameter = diameter;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ballSpeed = ballSpeed;
    this.balls = [];
    this.canvasBox;
    this.mainClassElement = document.getElementsByClassName(
      this.mainClassName
    )[0];
    this.canvasClassName = "canvasClass";

    this.setCanvas();
  }
  setCanvas() {
    this.canvasBox = document.createElement("div");

    this.canvasBox.style.width = this.canvasWidth + "px";
    this.canvasBox.style.height = this.canvasHeight + "px";
    this.canvasBox.style.border = "3px solid rgb(40,40,80)";
    this.canvasBox.style.borderRadius = "12px";
    this.canvasBox.style.margin = "80px auto";
    this.canvasBox.style.position = "relative";
    this.canvasBox.className = "canvasClass";

    this.mainClassElement.appendChild(this.canvasBox);

    this.createBalls();
    this.moveBalls();
    this.smashAnts();
  }
  generateRandom(min, max) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }
  createBalls() {
    for (let i = 0; i < this.ballCount; i++) {
      let ball = new Ball(
        this.mainClassName,
        this.canvasClassName,
        this.diameter,
        this.canvasWidth,
        this.canvasHeight
      );
      let x = this.generateRandom(0, this.canvasWidth - this.diameter * 1.05);
      let y = this.generateRandom(0, this.canvasHeight - this.diameter * 1.05);

      let randomX = this.generateRandom(1, 4);
      let randomY = this.generateRandom(1, 4);
      //   console.log(x + "x " + y + "randx" + randomX + " randY" + randomY);

      let colorIndex = this.generateRandom(0, this.boxColorArr.length);

      ball.setPosition(x, y);
      ball.setDirection(randomX, randomY);
      ball.setBackgroundColor(this.boxColorArr[colorIndex]);
      //to show balls
      ball.createBall();
      ball.illustrate();

      this.balls[i] = ball;
    }
  }
  moveBalls() {
    var move = setInterval(() => {
      for (let i = 0; i < this.ballCount; i++) {
        if (this.balls[i].isWallCollisionInX()) {
          this.balls[i].reverseDirX();
        }
        if (this.balls[i].isWallCollisionInY()) {
          this.balls[i].reverseDirY();
        }
        this.balls[i].move();
      }
      this.detectAllCollisionAndChangeDir();
    }, this.ballSpeed);
  }
  isCollisionBetweenTwoBalls(ball1, ball2) {
    let radiusBall1 = ball1.diameter / 2;
    let radiusBall2 = ball2.diameter / 2;

    let radiusSumOfBall = radiusBall1 + radiusBall2;
    //we have to offset the radius
    let x1 = ball1.x + radiusBall1;
    let x2 = ball2.x + radiusBall2;

    let y1 = ball1.y + radiusBall1;
    let y2 = ball2.y + radiusBall2;

    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    if (distance <= radiusSumOfBall) {
      return true;
    } else {
      return false;
    }
  }
  detectAllCollisionAndChangeDir() {
    for (let i = 0; i < this.balls.length; i++) {
      for (let j = 0; j < this.balls.length; j++) {
        if (i != j) {
          if (this.isCollisionBetweenTwoBalls(this.balls[i], this.balls[j])) {
            this.balls[i].changeBallDir(this.balls[j]);
          }
        }
      }
    }
  }
}
