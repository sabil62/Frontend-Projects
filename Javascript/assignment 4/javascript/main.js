let CARTYPES = ["blue-car", "yellow-car", "red-car", "white-car", "violet-car"];
let LANEHEIGHT = 600;
let LANEWIDTH = 360;
let CARHEIGHT = 116;
let CARWIDTH = 60;
let GAMEON = true;
//45 (60) 45 (60) 45 (60) 45 = 360
let X_POSITION = [30, 150, 268];
let lanePosition = 1; //middlelane //0 is first lane 2 is last lane

function generateRandom(min, max) {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

class Car {
  constructor(mainClassName, isPlayer, carType) {
    this.mainClassName = mainClassName;
    this.isPlayer = isPlayer;
    this.carType = carType;
    //position variables
    this.car;
    this.x;
    this.y = null;
    this.dirY = 1;
    this.intervalId;
    this.mainElement = document.getElementsByClassName(this.mainClassName)[0];
    this.setCar();
    this.draw();
  }
  setCar() {
    this.car = document.createElement("img");
    this.car.src = "./images/" + this.carType + ".png";
    this.car.style.width = CARWIDTH + "px";
    this.car.style.height = CARHEIGHT + "px";
    this.car.style.objectFit = "cover";
    this.car.style.position = "absolute";
  }
  setPosition(x, y) {
    this.x = x;
    this.y = y;
    this.draw();
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
    if (this.y <= car2.y + CARHEIGHT && this.x === car2.x) {
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
    this.carElement = [];
    this.carElementImage = [];
    this.player = null;
    this.playerID;
    this.enemyCar = [];
    this.gameOverBox;
    this.laneBackgroundMove = 0;

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
    this.mainElement.appendChild(this.selectCarWindow);

    this.displayCarBoxModal();
    // this.hideModal();

    //bind
    this.loopGame.bind(this);
    this.selectCar.bind(this);
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
  showCarBox() {
    this.selectCarWindow.style.display = "block";
  }
  hideCarBox() {
    this.selectCarWindow.style.display = "none";
  }
  displayCarBoxModal() {
    //title
    let Header = document.createElement("div");
    Header.innerHTML = `<h1 class="select-car-header"> Select The Car You Like</h1>`;
    this.selectCarWindow.appendChild(Header);

    //box containing car images
    let CarBoxFlex = document.createElement("div");
    CarBoxFlex.classList.add("car-box-flex");
    this.selectCarWindow.appendChild(CarBoxFlex);

    //include images
    for (let i = 0; i < this.carTypeArray.length; i++) {
      this.carElement[i] = document.createElement("div");
      this.carElementImage[i] = document.createElement("img");

      this.carElement[i].classList.add("car-image");
      this.carElementImage[i].src = `./images/${this.carTypeArray[i]}.png`;

      this.carElement[i].appendChild(this.carElementImage[i]);
      CarBoxFlex.appendChild(this.carElement[i]);
    }
    this.selectCar();
  }

  selectCar() {
    for (let i = 0; i < this.carElement.length; i++) {
      this.carElement[i].onclick = (e) => {
        this.player = new Car("road", true, this.carTypeArray[i]);
        this.player.setPosition(X_POSITION[lanePosition], 0);
        this.hideModal();
        this.hideCarBox();
        this.startGame();
      };
    }
  }
  startGame() {
    this.onKeyPressedActions();
    this.createEnemyCars();
    this.loopGame();
    // this.createGameOverModal();
  }
  onKeyPressedActions() {
    //for whole webpage listening
    document.addEventListener("keydown", (event) => {
      let keyTyped = event.code;
      switch (keyTyped) {
        case "ArrowRight":
          if (lanePosition >= 2) {
            lanePosition = 2;
            this.player.setPosition(X_POSITION[lanePosition], 0);
          } else {
            lanePosition++;
            this.player.setPosition(X_POSITION[lanePosition], 0);
          }

          break;

        case "ArrowLeft":
          if (lanePosition <= 0) {
            lanePosition = 0;
            this.player.setPosition(X_POSITION[lanePosition], 0);
          } else {
            lanePosition--;
            this.player.setPosition(X_POSITION[lanePosition], 0);
          }

        default:
          break;
      }
    });
  }
  createEnemyCars() {
    let loopAnimation = setInterval(() => {
      let car = new Car("road", false, this.carTypeArray[generateRandom(0, 4)]);
      car.setPosition(X_POSITION[generateRandom(1, 4)], 60);
      //if more enemies (they can form at same place)
      if (this.enemyCar.length > 2) {
        for (let i = 0; i < this.enemyCar.length; i++) {
          let yDistBetnEnemy = car.y - this.enemyCar[i].y + 100;
          if (Math.abs(yDistBetnEnemy) <= CARHEIGHT) {
            car.y += yDistBetnEnemy;
          }
        }
      }
      this.enemyCar.push(car);
    }, 2000);
  }

  createGameOverModal() {
    this.showModal();
    this.gameOverBox = document.createElement("div");
    this.gameOverBox.classList.add("select-car-window");

    this.gameOverBox.style.display = "flex";
    this.gameOverBox.style.justifyContent = "center";
    this.gameOverBox.style.alignItems = "center";
    this.gameOverBox.style.flexDirection = "column";

    this.gameOverBox.innerHTML = `<h1 class="game-over">Game Over</h1>
    <button class="retry-button">Retry</button>`;

    this.mainElement.appendChild(this.gameOverBox);
    let btn = document.getElementsByClassName("retry-button")[0];
    btn.onclick = (event) => {
      this.hideGameOverModal();
    };
  }
  hideGameOverModal() {
    this.gameOverBox.style.display = "none";
    this.hideModal();
  }
  moveBackground() {
    this.laneBackgroundMove -= 9;
    this.roadLaneForAnim.style.bottom = this.laneBackgroundMove + "px";
  }
  removeEnemyCar(enemyCar, index) {
    let road = document.getElementsByClassName("road")[0];
    road.removeChild(enemyCar[index].car);
    enemyCar.splice(index, 1);
  }
  loopGame = () => {
    // this.startGame();

    let loopInterval = setInterval(() => {
      this.scoreCard();
      this.moveBackground();

      for (let i = 0; i < this.enemyCar.length; i++) {
        if (this.enemyCar[i].y - LANEHEIGHT >= 0) {
          this.score++;
          this.removeEnemyCar(this.enemyCar, i);
        } else {
          this.enemyCar[i].move();

          if (this.enemyCar[i].detectYCollision(this.player)) {
            clearInterval(loopInterval);
            console.log("y collision");
            GAMEON = false;
            this.enemyCar[i].reverseDirection();
            this.player.reverseDirection();
            this.createGameOverModal();
          } else if (this.enemyCar[i].detectXCollision(this.player)) {
            clearInterval(loopInterval);
            console.log("x collision");
            GAMEON = false;
            this.createGameOverModal();
          }
        }
      }
    }, 200);
  };
}

let pp = new LaneGame("game-container-1", CARTYPES);
// pp.loopGame();
