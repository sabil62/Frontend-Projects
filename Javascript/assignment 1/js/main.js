//--------------------indicators------------------
let carousleContainerMain =
  document.getElementsByClassName("carousel-container")[0];
//to get all image length
let totalImages = document.querySelectorAll(".carousel-container-img img");
for (let i = 0; i < totalImages.length; i++) {
  totalImages[i].style.position = "absolute";
  totalImages[i].style.top = "0px";
  totalImages[i].style.left = i * 600 + "px";
}

let indicatorsBox = document.createElement("div");

indicatorsBox.style.width = totalImages.length * 23 + "px";
// indicatorsBox.style.height = "50px";
indicatorsBox.style.position = "absolute";
indicatorsBox.style.bottom = "0";
indicatorsBox.style.left = "50%";
indicatorsBox.style.transform = "translate(-50%,-50%)";
// indicatorsBox.style.background = "red";
indicatorsBox.style.zIndex = "200";

for (let i = 0; i < totalImages.length; i++) {
  let circleIndicator = document.createElement("div");
  circleIndicator.style.height = "11px";
  circleIndicator.style.width = "11px";
  circleIndicator.style.border = "2px solid rgb(60,60,90)";
  circleIndicator.style.borderRadius = "50%";
  circleIndicator.style.display = "inline-block";
  circleIndicator.style.marginLeft = "8px";
  circleIndicator.className = "indicator";
  circleIndicator.style.cursor = "pointer";
  //   console.log(img.length);

  indicatorsBox.appendChild(circleIndicator);
}

carousleContainerMain.appendChild(indicatorsBox);
//-------------------previous

let carouselContainer = document.getElementsByClassName(
  "carousel-container-img"
)[0];
//buttons
let nextButton = document.getElementsByClassName("right-box")[0];
let prevButton = document.getElementsByClassName("left-box")[0];
//indicators
let indicator = document.getElementsByClassName("indicator");

// let totalImages = document.querySelectorAll(".carousel-container-img img");
//to determine image index
let indexOfImage = 1;
let moveXdirection = 0;

indicator[0].style.background = "rgb(70,70,90)";

//indicator on
function indicatorOn(indexOn) {
  for (let i = 0; i < indicator.length; i++) {
    indicator[i].style.background = "transparent";
  }
  indicator[indexOn].style.background = "rgb(70,70,90)";
}
//carousel move direction
function carouselMoveTo(moveDirection) {
  carouselContainer.style.transform = `translateX(${moveDirection}px)`;
}

//event next
nextButton.onclick = function () {
  moveXdirection -= 600;
  indexOfImage++;
  if (indexOfImage > totalImages.length) {
    moveXdirection = 0;
    indexOfImage = 1;
  }
  carouselMoveTo(moveXdirection);
  indicatorOn(indexOfImage - 1);
};

//event previous
prevButton.onclick = function () {
  moveXdirection += 600;
  indexOfImage--;
  if (indexOfImage < 1) {
    //this is exactly opposite because we take the first one to last
    moveXdirection = -(totalImages.length - 1) * 600;
    indexOfImage = totalImages.length;
  }
  carouselMoveTo(moveXdirection);
  indicatorOn(indexOfImage - 1);
};

for (let i = 0; i < indicator.length; i++) {
  indicator[i].onclick = function () {
    moveXdirection = i * -600;
    indexOfImage = i + 1;
    console.log(moveXdirection + "fd" + indexOfImage);
    carouselMoveTo(moveXdirection);
    indicatorOn(i);
  };
}
