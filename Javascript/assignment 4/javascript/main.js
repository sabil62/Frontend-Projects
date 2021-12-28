let CARTYPES = ["blue-car", "red-car", "white-car", "violet-car", "red-car"];
let LANEHEIGHT = 600;
let LANEWIDTH = 360;
let CARHEIGHT = 116;
let CARWIDTH = 60;

class Car {
  constructor(mainClassName, x, y, isPlayer, carType) {
    this.mainClassName = mainClassName;
    this.isPlayer = isPlayer;
    this.carType = carType;
    //position variables
    this.car;
    this.x = x;
    this.y = y;
    this.dirY;
    this.mainElement = document.getElementsByClassName(this.mainClassName);
    this.setCar();
  }
  setCar() {
    this.car = document.createElement("img");
    this.car.src = "./images/" + this.carType + ".png";
    this.car.style.width = CARWIDTH + "px";
    this.car.style.height = CARHEIGHT + "px";
    this.car.style.objectFit = "cover";
    this.car.style.position = "absolute";
  }
  move() {
    this.y += this.dirY;
  }
  reverseDirection() {
    this.y -= this.dirY;
  }
  detectXCollision(car2) {
    //if both car same row && touch then gameover
    if (car2.y + CARHEIGHT >= this.y && this.x === car2.x) {
      return true;
    } else {
      return false;
    }
  }
  detectYCollision(car2) {
    //same lane && if head collision
    if (this.x === car2.x && this.y <= car2.y + CARHEIGHT) {
      return true;
    } else {
      return false;
    }
  }
  draw() {
    this.car.style.left = this.x + "px";
    if (this.isPlayer) {
      this.car.style.bottom = this.y + "px";
      //rotate but to not effect moving
      this.car.style.transform = "scaleY(-1)";
      //flip vertical
      this.car.style.filter = "FlipV";
    } else {
      //if enemy then
      this.car.style.top = this.y + "px";
    }
    this.mainElement.appendChild(this.car);
  }
}
