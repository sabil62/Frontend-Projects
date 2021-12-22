let second = document.getElementById("second");

let newBall = document.createElement("div");
newBall.style.height = "80px";
newBall.style.width = "80px";
newBall.style.background = "#3774e2";
newBall.style.borderRadius = "50%";

newBall.style.position = "absolute";
newBall.style.top = "0px";
newBall.style.left = "180px";

let direction = "up";
let up = 0;
let down = 280;

setInterval(() => {
  switch (direction) {
    case "up":
      up += 10;
      newBall.style.top = up + "px";
      if (up >= 280) {
        direction = "down";
        up = 0;
      }
      break;

    default:
      down -= 10;
      newBall.style.top = down + "px";
      if (down <= 0) {
        direction = "up";
        down = 280;
      }
      break;
  }
}, 60);

second.appendChild(newBall);
