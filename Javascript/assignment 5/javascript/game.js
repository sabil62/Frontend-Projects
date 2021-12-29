class Game {
  constructor(canvasIdName, keyEvent) {
    this.gameCanvas = document.getElementById(canvasIdName);
    this.gameCanvas.height = 500;
    this.gameCanvas.width = 340;
    //to create context
    this.ctx = this.gameCanvas.getContext("2d");
  }
}
