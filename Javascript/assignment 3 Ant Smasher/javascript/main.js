class Ant {
  constructor(mainClass, canvasClass, diameter, canvasWidth, canvasHeight) {
    this.mainClass = mainClass;
    this.diameter = diameter;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.antElement;
    this.x = 0;
    this.y = 0;
    this.dirX = 0;
    this.dirY = 0;

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

  reverseDirX() {
    this.dirX *= -1;
  }
  reverseDirY() {
    this.dirY *= -1;
  }
  isWallCollisionInX() {
    //if x = 0 or x > canvaswidth
    if (this.x <= 4 || this.x + this.diameter * 1.1 >= this.canvasWidth) {
      return true;
    } else {
      return false;
    }
  }
  isWallCollisionInY() {
    if (this.y <= 4 || this.y + this.diameter * 1.1 >= this.canvasHeight) {
      return true;
    } else {
      return false;
    }
  }
  //if collide then change box1.changeAnt(box2)
  changeAntDir(collidingAnt) {
    let dirXstore = this.dirX;
    this.dirX = collidingAnt.dirX;
    collidingAnt.dirX = dirXstore;

    let dirYstore = this.dirY;
    this.dirY = collidingAnt.dirY;
    collidingAnt.dirY = dirYstore;

    this.move();
    collidingAnt.move();
  }
  createAnt() {
    this.antElement = document.createElement("img");
    this.antElement.style.position = "absolute";
    this.antElement.src = "./images/ants.gif";
    this.antElement.style.width = this.diameter + "px";
    this.antElement.style.height = this.diameter + "px";

    this.canvasElement.appendChild(this.antElement);

    //to smash
    this.antElement.onclick = (e) => {
      this.smashAnt();
    };
  }

  move() {
    this.x = this.x + this.dirX;
    this.y = this.y + this.dirY;
    this.illustrate();
  }
  illustrate() {
    this.antElement.style.top = this.y + "px";
    this.antElement.style.left = this.x + "px";
  }
  smashAnt() {
    this.antElement.style.display = "none";
  }
}

class Canvas {
  constructor(
    mainClassName,

    antCount,
    diameter,
    canvasWidth,
    canvasHeight,
    antSpeed
  ) {
    this.mainClassName = mainClassName;

    this.antCount = antCount;
    this.diameter = diameter;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.antSpeed = antSpeed;
    this.ants = [];
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
    this.canvasBox.backgroundColor = "#FBFBFB";

    this.mainClassElement.appendChild(this.canvasBox);

    this.createAnts();
    this.moveAnts();
  }
  generateRandom(min, max) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
  }
  createAnts() {
    for (let i = 0; i < this.antCount; i++) {
      let ant = new Ant(
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

      ant.setPosition(x, y);
      ant.setDirection(randomX, randomY);

      //to show ants
      ant.createAnt();
      ant.illustrate();
      // ant.smashAnt();

      this.ants[i] = ant;
    }
  }
  moveAnts() {
    var move = setInterval(() => {
      for (let i = 0; i < this.antCount; i++) {
        if (this.ants[i].isWallCollisionInX()) {
          this.ants[i].reverseDirX();
        }
        if (this.ants[i].isWallCollisionInY()) {
          this.ants[i].reverseDirY();
        }
        this.ants[i].move();
      }
      this.detectAllCollisionAndChangeDir();
    }, this.antSpeed);
  }
  isCollisionBetweenTwoAnts(ant1, ant2) {
    let radiusAnt1 = ant1.diameter / 2;
    let radiusAnt2 = ant2.diameter / 2;

    let radiusSumOfAnt = radiusAnt1 + radiusAnt2;
    //we have to offset the radius
    let x1 = ant1.x + radiusAnt1;
    let x2 = ant2.x + radiusAnt2;

    let y1 = ant1.y + radiusAnt1;
    let y2 = ant2.y + radiusAnt2;

    let distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    if (distance <= radiusSumOfAnt) {
      return true;
    } else {
      return false;
    }
  }
  detectAllCollisionAndChangeDir() {
    for (let i = 0; i < this.ants.length; i++) {
      for (let j = 0; j < this.ants.length; j++) {
        if (i != j) {
          if (this.isCollisionBetweenTwoAnts(this.ants[i], this.ants[j])) {
            this.ants[i].changeAntDir(this.ants[j]);
          }
        }
      }
    }
  }
  // smashAnts() {
  //   for (let i = 0; i < this.ants.length; i++) {
  //     this.ants[i].onclick = (e) => {
  //       this.ants[i].style.display = "none";
  //       console.log("clicked");
  //     };
  //   }
  // }
}
