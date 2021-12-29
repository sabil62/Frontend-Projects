class FlappyBird {
  constructor(gameClassName) {
    this.gameClassName = gameClassName;
    this.gameCanvas = document.getElementsByClassName(this.gameClassName)[0];
    this.birdUpMove = false;
    this.birdDownMove = false;
    this.isPlaying = false;
    this.gravity = 0.6;
    this.velocity = 0;
    this.score = 0;
    this.speed = 3;
    this.upward = -10;
    this.fallingBird = document.createElement("div");
    this.fallingBird.classList.add("falling-bird");
    //taking y value
    this.fallingBird.y = this.fallingBird.offsetTop;
    this.startGameContainer = document.getElementsByClassName(
      "start-game-container"
    )[0];
    this.endGameContainer =
      document.getElementsByClassName("end-game-container")[0];
    this.endGameContainer.style.display = "none";
    this.initialScore = this.score;
    this.scoreBoard = document.getElementsByClassName("score")[0];
    this.scoreBoard.style.display = "none";
    this.clickorSpace = document.getElementsByClassName("space-or-click")[0];
    this.scoreBoard.innerHTML = `<h1>Score: ${this.score}</h1>`;

    this.startGameContainer.onclick = this.clickAction.bind(this);
    this.loopId;
    this.gameCanvas.onclick = this.goUp.bind(this);
    window.addEventListener("keypress", this.goUp.bind(this));
  }
  getRandomHeight(mainClass) {
    return Math.floor((Math.random() * mainClass.offsetHeight) / 3 + 60);
  }
  createPipes(positionClass) {
    //make two pipes top and down
    for (let i = 0; i < 2; i++) {
      let greenPipe = document.createElement("div");
      greenPipe.classList.add("green-pipe");
      greenPipe.classList.add(positionClass);

      let pipeHeight = this.getRandomHeight(this.gameCanvas);
      greenPipe.style.height = pipeHeight + "px";

      if (i % 2 == 0) {
        greenPipe.y = 0;
        greenPipe.classList.add("cylinder");
      } else {
        greenPipe.y =
          this.gameCanvas.offsetHeight - parseInt(greenPipe.style.height);
        greenPipe.classList.add("cylinder-down");
      }
      greenPipe.style.top = greenPipe.y + "px";
      this.gameCanvas.appendChild(greenPipe);
    }
  }
  movePipe(moveClass) {
    let pipe = document.querySelectorAll(`.${moveClass}`);
    for (let i = 0; i < pipe.length; i++) {
      pipe[i].x = pipe[i].offsetLeft;

      if (this.isCollision(pipe[i], this.fallingBird)) {
        this.finishGame();
      }

      if (this.hasPassed(pipe[i])) {
        this.score++;
      }

      if (pipe[i].x < 0) {
        pipe[i].x += 1600;
        pipe[i].style.height = this.getRandomHeight(this.gameCanvas);
      }

      pipe[i].x -= this.speed;
      pipe[i].style.left = pipe[i].x + "px";
    }
  }
  isCollision(pipe, bird) {
    //get cordinates
    let positionPipe = pipe.getBoundingClientRect();
    let positionBird = bird.getBoundingClientRect();

    if (
      positionPipe.top > positionBird.bottom ||
      positionPipe.left > positionBird.right ||
      positionPipe.bottom < positionBird.top ||
      positionPipe.right < positionBird.left
    ) {
      return 0;
    } else {
      return 1;
    }
  }
  finishGame() {
    this.isPlaying = false;
    this.score = 0;
    this.endGameContainer.style.display = "block";
    this.endGameContainer.style.display = "flex";
    let tryBtn = document.getElementsByClassName("try")[0];
    tryBtn.onclick = (e) => {
      window.location.reload();
    };
    // window.location.reload();
  }

  hasPassed(pipe) {
    let passed = false;
    for (let i = 95; i < 105; i++) {
      if (pipe.offsetLeft == i) {
        return true;
      }
    }
    return passed;
  }
  gravityAction() {
    setTimeout(() => {
      this.birdUpMove = false;
      this.birdDownMove = true;
      //accelerating by gravity
      this.velocity += this.gravity;
      //falling action bird
      this.fallingBird.y += this.velocity;
      this.fallingBird.style.top = this.fallingBird.y + "px";

      //if bird has reached bottom
      if (this.fallingBird.y > this.gameCanvas.offsetHeight) {
        //stop this
        this.velocity = 0;
        this.fallingBird.y = parseInt(this.gameCanvas.offsetHeight);
        this.fallingBird.style.top =
          parseInt(this.gameCanvas.offsetHeight) -
          this.fallingBird.offsetHeight +
          "px";
        //move head down while falling
        this.fallingBird.style.transform = "rotate(80deg)";
        this.finishGame();
      }
      if (this.fallingBird.y < 0) {
        this.fallingBird.y = 0;
        this.fallingBird.velocity = 0;
      }
    }, 600);
  }

  clickAction() {
    clearInterval(this.loopId);
    this.startGameContainer.classList.add("display-none");

    this.clickorSpace.classList.add("display-none");
    this.speed = 4;
    this.isPlaying = true;
    this.score = 0;
    this.scoreBoard.style.display = "block";
    this.createPipes("pipe-first");
    this.createPipes("pipe-second");
    this.createPipes("pipe-third");
    this.createPipes("pipe-fourth");

    //start bird
    this.gameCanvas.appendChild(this.fallingBird);

    this.gameLoop();
  }
  goUp(event) {
    console.log("clicked");
    this.birdUpMove = true;
    this.birdDownMove = false;
    this.fallingBird.y = this.fallingBird.offsetTop;
    this.velocity += this.upward;
    this.fallingBird.y += this.velocity;
    this.fallingBird.style.top = this.fallingBird.y + "px";
  }
  gameLoop() {
    if (this.isPlaying) {
      this.loopId = setInterval(() => {
        //move pipe to give parallex moving effect
        this.movePipe("pipe-first");
        this.movePipe("pipe-second");
        this.movePipe("pipe-third");
        this.movePipe("pipe-fourth");
        this.gravityAction();
        //increase speed per 10 score
        if (this.score >= this.initialScore + 10) {
          this.speed++;
          this.initialScore = this.score;
        }
        this.scoreBoard.innerHTML = `<h1>Score: ${this.score}</h1>`;
      }, 30);
    } else {
      clearInterval(loopId);
    }
  }
}
