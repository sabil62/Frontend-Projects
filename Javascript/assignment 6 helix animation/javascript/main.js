class Helix {
  //Helix(400,600)
  constructor(
    canvasId,
    height,
    width,
    smallCircleRadius,
    totalStrands,
    totalDnaInStrand,
    animationTime,
    xDistCircle,
    curveToHit
  ) {
    this.dnaRadius = smallCircleRadius;
    this.height = height;
    this.width = width;
    this.amplitude = 52;
    if (curveToHit) {
      this.amplitude = curveToHit;
    }
    this.animationTime = animationTime;
    //draw canvas
    this.gameCanvas = document.getElementById(canvasId);
    this.gameCanvas.height = height;
    this.gameCanvas.width = width;
    this.ctx = this.gameCanvas.getContext("2d");

    this.totalStrands = totalStrands;
    this.rotateSpeed = 0;
    this.frameCount = 0;
    this.intervalId;
    this.totalDnaInStrand = totalDnaInStrand;
    if (xDistCircle) {
      this.xDistCircle = xDistCircle;
    } else {
      this.xDistCircle = Math.floor(Math.max(this.width / 18, this.dnaRadius));
    }
    // console.log(this.width + "f " + this.xDistCircle);
    this.smallCircleOffset = this.height / 20;
    this.colorArray = [
      "#FDBC87",
      "#FDBE9A",
      "#F8AB53",
      "#F8AB53",
      "#F8AB53",
      "#F38229",
      "#F38229",
      "#E36F27",
    ];
  }
  createSmallCircles(xCord, yCord, radius, colorIndex) {
    this.ctx.beginPath();
    // this.ctx.fillStyle = this.color;
    this.ctx.fillStyle = this.colorArray[colorIndex];
    if (this.totalDnaInStrand === 1) {
      this.ctx.fillStyle = "#F8AB53";
    }
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
      circleToHelixParam = (i * 2 * Math.PI) / 28;
      //   console.log(this.xDistCircle);
      xCord += this.xDistCircle;
      for (let j = 0; j < this.totalDnaInStrand; j++) {
        let yCord =
          100 +
          j * this.smallCircleOffset +
          Math.sin(moveDirection + circleToHelixParam) * this.amplitude;
        let dnaSizeChangeByRotation =
          (Math.cos(moveDirection - j * 0.2 + circleToHelixParam) + 1) * 0.45;

        let radius = dnaSizeChangeByRotation * this.dnaRadius;
        this.createSmallCircles(xCord, yCord, radius, j);
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
    }, this.animationTime);
  }
}

// helix(3,color, smallCircleRadius, totalStrands, totalDnaInStrand);
let helix = new Helix("helix-1", 400, 400, 10, 15, 10, 40);
helix.loopHelix();
