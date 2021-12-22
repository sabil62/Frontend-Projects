// Render a scatter plot based on an array of coordinates. Create the container for the plot and
//create each point using javascript.
// var points = [  {x: 10, y: 20},   {x: 40, y, 40},   {x: 60, y, 20},  ...];
var points = [
  { x: 20, y: 30 },
  { x: 230, y: 420 },
  { x: 60, y: 60 },
  { x: 120, y: 130 },
  { x: 280, y: 330 },
  { x: 320, y: 300 },
  { x: 220, y: 200 },
  { x: 200, y: 120 },
  { x: 120, y: 400 },
  { x: 60, y: 360 },
  { x: 180, y: 320 },
  { x: 320, y: 40 },
  { x: 220, y: 60 },
  { x: 20, y: 300 },
];

//we have not selected getElbyID so getElbyCLASS gives array and choose the first array
let first = document.getElementsByClassName("first")[0];

points.forEach((c) => {
  let newElem = document.createElement("div");
  newElem.style.height = "22px";
  newElem.style.width = "22px";
  newElem.style.borderRadius = "50%";
  newElem.style.background = "#6f6fd8";
  newElem.style.position = "absolute";
  newElem.style.top = c.x + "px";
  newElem.style.left = c.y + "px";

  first.appendChild(newElem);
});
