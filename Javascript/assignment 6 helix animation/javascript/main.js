class Helix {
  //Helix(400,600)
  constructor(
    canvasId,
    height,
    width,
    color,
    smallCircleRadius,
    totalStrands,
    totalDnaInStrand
  ) {
    this.dnaRadius = smallCircleRadius;
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
    this.totalDnaInStrand = totalDnaInStrand;
    this.xDistCircle = Math.floor(Math.max(this.width / 24, this.dnaRadius));
    // console.log(this.width + "f " + this.xDistCircle);
    this.smallCircleOffset = this.height / 20;
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
    for (let i = 0; i < 20; i++) {
      //move helix
      let helixMoveDirection = direction + i * Math.PI;
      if (i === 0) {
        helixMoveDirection = direction;
      }
      this.rotateAllStrands(helixMoveDirection, xCord);
    }
  }
  rotateAllStrands(moveDirection, xCord) {
    let circleToHelixParam = 0;
    for (let i = 0; i < this.totalStrands; i++) {
      circleToHelixParam = (i * 2 * Math.PI) / 18;
      //   console.log(this.xDistCircle);
      xCord += this.xDistCircle;
      for (let j = 0; j < this.totalDnaInStrand; j++) {
        let yCord =
          100 +
          j * this.smallCircleOffset +
          Math.sin(moveDirection + circleToHelixParam) * 42;
        let dnaSizeChangeByRotation =
          (Math.cos(moveDirection - j * 0.1 + circleToHelixParam) + 1) * 0.5;

        let radius = dnaSizeChangeByRotation * this.dnaRadius;
        this.createSmallCircles(xCord, yCord, radius);
      }
    }
  }
  drawHelix() {
    this.ctx.clearRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.ctx.fillStyle = "rgb(70,30,90)";
    this.ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    this.frameCount++;
    this.rotateSpeed = this.frameCount * 0.04;

    this.generateStrands(this.rotateSpeed, 0);
  }
  loopHelix() {
    this.intervalId = setInterval(() => {
      this.drawHelix();
    }, 30);
  }
}

// helix(3,color, smallCircleRadius, totalStrands, totalDnaInStrand);
let helix = new Helix("helix-1", 400, 600, "rgb(240,100,60)", 10, 10, 10);
helix.loopHelix();
