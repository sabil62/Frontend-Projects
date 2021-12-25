let carouselContainer = document.getElementsByClassName(
  "carousel-container-img"
)[0];
//buttons
let nextButton = document.getElementsByClassName("right-box")[0];
let prevButton = document.getElementsByClassName("left-box")[0];
//to get all image length
let totalImages = document.querySelectorAll(".carousel-container-img img");

//to determine image index
let indexOfImage = 1;
let moveXdirection = 0;

//event next
nextButton.onclick = function () {
  moveXdirection -= 600;
  indexOfImage++;
  if (indexOfImage > totalImages.length) {
    moveXdirection = 0;
    indexOfImage = 1;
  }
  carouselContainer.style.transform = `translateX(${moveXdirection}px)`;
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
  //   console.log(moveXdirection);
  carouselContainer.style.transform = `translateX(${moveXdirection}px)`;
};
