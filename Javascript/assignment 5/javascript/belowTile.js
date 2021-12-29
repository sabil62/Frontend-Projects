class BelowTile {
  //ctx is context
  constructor(canvas, context, tileImage) {
    this.canvas = canvas;
    this.context = context;
    this.tileImage = tileImage;
    this.width = 235;
    this.height = 152;
    this.x = 0;
    //place below
    this.y = this.canvas.height - 152;
    this.dirX = 2;
  }
  draw() {
    //tile Images
    //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
    //context.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    this.context.drawImage(
      this.tileImage,
      290,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
    //similar image distance apart
    this.context.drawImage(
      this.tileImage,
      290,
      0,
      this.width,
      this.height,
      //1 width apart
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
  update(state) {
    if (state == 1) {
      this.x = (this.x - this.dirX) % (this.width / 2);
    }
  }
}
