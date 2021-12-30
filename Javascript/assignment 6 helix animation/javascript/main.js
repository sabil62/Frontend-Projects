class Helix {
  //Helix(400,600)
  constructor(canvasId, height, width, color, totalStrands) {
    this.dnaRadius = Math.floor(height / 40);
    this.height = height;
    this.width = width;
    this.amplitude = this.dnaRadius;
    //draw canvas
    this.gameCanvas = document.getElementById(canvasId);
    this.gameCanvas.height = height;
    this.gameCanvas.width = width;
    this.ctx = this.gameCanvas.getContext("2d");
    this.color = color;
    this.totalStrands = totalStrands;
    this.rotateSpeed = 0;
    this.frameCount = 0;
    this.intervalId;
  }
  createSmallCircles(xCord, yCord, radius) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(xCord, yCord, radius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
  generateStrands(direction, xCord) {
    //make 10 dna sequence
    for (let i = 0; i < 10; i++) {
      //move helix
      let helixMoveDirection = direction + i * Math.PI;
      if (i === 0) {
        helixMoveDirection = direction;
      }
      this.rotateAllStrands(helixMoveDirection, xCord);
    }
  }
  rotateAllStrands(moveDirection, xCord) {
    let offset = 0;
    for (let i = 0; i < 10; i++) {
      offset = (i * 2 * Math.PI) / 10;
      xCord += 20;
      for (let j = 0; j < 10; j++) {
        let yCord = 150 + j + Math.sin(moveDirection + offset) * 42;

        this.createSmallCircles(xCord, yCord, this.dnaRadius);
      }
    }
  }
  drawHelix() {
    this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.ctx.fillStyle = "rgb(30,30,80)";
    this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.frameCount++;
    this.rotateSpeed = this.frameCount * 0.04;

    this.generateStrands(this.rotateSpeed, 0);
  }
  loopHelix() {
    this.intervalId = setInterval(() => {
      this.drawHelix();
    }, 10);
  }
}

let helix = new Helix("helix-1", 400, 600, "red", 12);
helix.loopHelix();
