let CARTYPES = ["blue-car", "yellow-car", "red-car", "white-car", "violet-car"];
let LANEHEIGHT = 600;
let LANEWIDTH = 360;
let CARHEIGHT = 116;
let CARWIDTH = 60;
let GAMEON = true;

function generateRandom(min, max) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

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
    this.intervalId;
    this.mainElement = document.getElementsByClassName(this.mainClassName)[0];
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
    //move enemy not player
    this.intervalId = setInterval(() => {
      if (GAMEON) {
        this.y += this.dirY;
        this.draw();
      } else {
        clearInterval(this.intervalId);
      }
    }, 80);
  }
  reverseDirection() {
    this.y -= this.dirY;
    this.draw();
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

class LaneGame {
  constructor(mainClassName, carTypeArray) {
    this.mainClassName = mainClassName;
    this.carTypeArray = carTypeArray;
    this.mainElement = document.getElementsByClassName(this.mainClassName)[0];
    this.roadElement = document.querySelector(`.${this.mainClassName} .road`);
    this.score = 0;
    this.highScore;

    //game elements
    // this.gameCanvas = document.createElement("div");
    this.scoreCountDisplay = document.createElement("div");
    this.roadLaneForAnim = document.createElement("div");
    this.firstLane = document.createElement("div");
    this.middleLane = document.createElement("div");
    this.lastLane = document.createElement("div");
    this.selectCarModal = document.createElement("div");
    this.selectCarWindow = document.createElement("div");

    //css classes for styling
    this.roadLaneForAnim.classList.add("road-lane-for-animation");
    this.firstLane.classList.add("first-lane");
    this.middleLane.classList.add("middle-lane");
    this.lastLane.classList.add("last-lane");
    this.scoreCountDisplay.classList.add("score-board");
    this.selectCarModal.classList.add("select-car-modal");
    this.selectCarWindow.classList.add("select-car-window");

    //appendChild to parent Element
    this.roadElement.appendChild(this.roadLaneForAnim);
    this.roadLaneForAnim.appendChild(this.firstLane);
    this.roadLaneForAnim.appendChild(this.middleLane);
    this.roadLaneForAnim.appendChild(this.lastLane);
    this.mainElement.appendChild(this.scoreCountDisplay);
    this.mainElement.appendChild(this.selectCarModal);
    this.selectCarModal.appendChild(this.selectCarWindow);

    this.selectCarBox();
    // this.hideModal();
  }
  scoreCard() {
    this.scoreCountDisplay.innerHTML = `<h1>Score: ${this.score}</h1>`;
  }
  showModal() {
    this.selectCarModal.style.display = "block";
  }
  hideModal() {
    this.selectCarModal.style.display = "none";
  }
  selectCarBox() {
    //title
    let Header = document.createElement("div");
    Header.innerHTML = `<h1 class="select-car-header"> Select The Car You Like</h1>`;
    this.selectCarWindow.appendChild(Header);

    //box containing car imaes
    let CarBoxFlex = document.createElement("div");
    CarBoxFlex.classList.add("car-box-flex");
    this.selectCarWindow.appendChild(CarBoxFlex);

    //include images
    for (let i = 0; i < this.carTypeArray.length; i++) {
      let imageDiv = document.createElement("div");
      let carImage = document.createElement("img");

      imageDiv.classList.add("car-image");
      carImage.src = `./images/${this.carTypeArray[i]}.png`;

      imageDiv.appendChild(carImage);
      CarBoxFlex.appendChild(imageDiv);
    }
  }
}

let pp = new LaneGame("game-container-1", CARTYPES);
