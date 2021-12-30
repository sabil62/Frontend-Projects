class Helix {
  //Helix(400,600)
  constructor(canvasId, height, width, color) {
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
  }
  createSmallCircles(xCord, yCord) {
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.arc(xCord, yCord, this.dnaRadius, 0, Math.PI * 2);
    this.ctx.closePath();
    this.ctx.fill();
  }
}
