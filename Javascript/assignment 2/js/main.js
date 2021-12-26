//                        carousel-container-1
let startCarousel = function (mainClassName, transitionTime, holdTime) {
  let mainClass = document.getElementsByClassName(mainClassName);
  console.log(mainClass[0]);
  for (let i = 0; i < mainClass.length; i++) {
    let carouselContainer = document.querySelector(
      `.${mainClassName} .carousel-container-img`
    );
    let images = document.querySelectorAll(
      `.${mainClassName} .carousel-container-img img`
    );
    var imageCarousel = new ImageCarousel(
      mainClass[i],
      carouselContainer,
      images,
      transitionTime,
      holdTime
    );
    imageCarousel.setCarousel();
  }
};

class ImageCarousel {
  constructor(mainClass, carouselContainer, images, transitionTime, holdTime) {
    this.mainClass = mainClass;
    this.carouselContainer = carouselContainer;
    this.images = images;
    this.transitionTime = transitionTime;
    this.holdTime = holdTime;

    //bind function
    this.setCarousel = this.setCarousel.bind(this);
    this.setImagesParallelly = this.setImagesParallelly.bind(this);
    this.setArrows = this.setArrows.bind(this);
    this.setIndicators = this.setIndicators.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.indicatorOn = this.indicatorOn.bind(this);
    this.indicatorOff = this.indicatorOff.bind(this);

    //variables
    this.imageWidth;
    this.imageHeight;
    this.indicatorBox;
    this.circleIndicator = [];
    this.currentImageIndex = 1;
    this.nextArrow;
    this.prevArrow;
    this.previousWidth;
    this.currentWidth;
  }
  setCarousel() {
    // let mainClassDoc = document.getElementsByClassName(this.mainClass);
    this.imageHeight = parseInt(getComputedStyle(this.mainClass).height);
    this.imageWidth = parseInt(getComputedStyle(this.mainClass).width);
    this.setImagesParallelly();
    this.setArrows();
    this.setIndicators();
    // this.circleIndicator = document.getElementsByClassName("indicator");
    this.indicatorOn(0);
    setInterval(() => {
      this.nextImage();
    }, 4500);
  }
  setImagesParallelly() {
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].style.position = "absolute";
      this.images[i].style.left = i * this.imageWidth + "px";
    }
  }
  setArrows() {
    let nextArrow = document.createElement("img");
    let prevArrow = document.createElement("img");

    nextArrow.style.height = "20px";
    nextArrow.style.width = "20px";
    nextArrow.src = "./images/right.png";
    nextArrow.style.position = "absolute";
    nextArrow.style.top = "50%";
    nextArrow.style.right = "2%";
    nextArrow.style.transform = "translate(-50%,-50%)";
    nextArrow.style.zIndex = "200";
    nextArrow.style.cursor = "pointer";
    nextArrow.className = "nextArrow";

    this.mainClass.appendChild(nextArrow);

    prevArrow.style.height = "20px";
    prevArrow.style.width = "20px";
    prevArrow.src = "./images/left.png";
    prevArrow.style.position = "absolute";
    prevArrow.style.top = "50%";
    prevArrow.style.left = "5%";
    prevArrow.style.transform = "translate(-50%,-50%)";
    prevArrow.style.zIndex = "200";
    prevArrow.style.cursor = "pointer";
    prevArrow.className = "prevArrow";
    this.mainClass.appendChild(prevArrow);

    //two different techniques to do same thing
    nextArrow.onclick = (e) => {
      this.nextImage();
    };
    prevArrow.onclick = this.prevImage.bind(this);
  }
  setIndicators() {
    this.indicatorBox = document.createElement("div");

    this.indicatorBox.style.width = (this.images.length * this.imageWidth) / 25;
    this.indicatorBox.style.position = "absolute";
    this.indicatorBox.style.bottom = "2%";
    this.indicatorBox.style.left = "50%";
    this.indicatorBox.style.transform = "translate(-50%,-50%)";
    this.indicatorBox.style.zIndex = "200";

    for (let i = 0; i < this.images.length; i++) {
      this.circleIndicator[i] = document.createElement("div");
      this.circleIndicator[i].style.height = this.imageWidth / 54 + "px";
      this.circleIndicator[i].style.width = this.imageWidth / 54 + "px";
      this.circleIndicator[i].style.border = "2px solid rgb(60,60,90)";
      this.circleIndicator[i].style.borderRadius = "50%";
      this.circleIndicator[i].style.display = "inline-block";
      this.circleIndicator[i].style.marginLeft = "8px";
      this.circleIndicator[i].className = "indicator";
      this.circleIndicator[i].style.cursor = "pointer";
      this.indicatorBox.appendChild(this.circleIndicator[i]);
    }

    this.mainClass.appendChild(this.indicatorBox);
  }
  nextImage() {
    if (this.currentImageIndex >= this.images.length) {
      this.currentImageIndex = 0;
    }
    this.previousWidth = (this.currentImageIndex - 1) * this.imageWidth;
    this.currentWidth = this.currentImageIndex * this.imageWidth;
    // this.carouselContainer.style.transform = `translateX(-${this.currentWidth}px)`;
    this.carouselAnimation(this.currentWidth, this.previousWidth);
    this.indicatorOn(this.currentImageIndex);
    this.currentImageIndex++;
  }
  prevImage() {
    if (this.currentImageIndex <= 1) {
      this.currentImageIndex = this.images.length + 1;
    }
    this.previousWidth = (this.currentImageIndex - 1) * this.imageWidth;
    //-2 because currentImageIndex++ issue
    this.currentWidth = (this.currentImageIndex - 2) * this.imageWidth;
    // this.carouselContainer.style.transform = `translateX(-${this.currentWidth}px)`;
    this.carouselAnimation(this.currentWidth, this.previousWidth);
    this.indicatorOn(this.currentImageIndex - 2);
    this.currentImageIndex--;
  }
  indicatorOn(index) {
    this.indicatorOff();
    this.circleIndicator[index].style.background = "rgb(60,60,90)";
  }
  indicatorOff() {
    for (let i = 0; i < this.circleIndicator.length; i++) {
      this.circleIndicator[i].style.background = "transparent";
    }
  }
  carouselAnimation(current, previous) {
    let timing = 10;
    if (Math.abs(current - previous) > this.imageWidth * 2) {
      timing = 1;
    } else {
      timing = 10;
    }
    let nextMove = setInterval(() => {
      if (current < previous) {
        previous -= 10;
        this.carouselContainer.style.transform = `translateX(-${previous}px)`;
      } else {
        previous += 10;
        this.carouselContainer.style.transform = `translateX(-${previous}px)`;
      }
      if (previous === current) {
        clearInterval(nextMove);
      }
    }, timing);
  }
}

// //carousel move direction
// function carouselMoveTo(moveDirection, prevDirection) {
//   let timing = 10;
//   if (Math.abs(moveDirection - prevDirection) > containerWidth * 2) {
//     timing = 1;
//   } else {
//     timing = 10;
//   }
//   let nextMove = setInterval(() => {
//     //next
//     if (moveDirection < prevDirection) {
//       //(-600<0)
//       prevDirection -= 10;
//       carouselContainer.style.transform = `translateX(${prevDirection}px)`;
//     } else {
//       //prev
//       prevDirection += 10;
//       carouselContainer.style.transform = `translateX(${prevDirection}px)`;
//     }

//     if (prevDirection === moveDirection) {
//       clearInterval(nextMove);
//     }
//   }, timing);
// }
// //--------------------indicators------------------
// let carousleContainerMain =
//   document.getElementsByClassName("carousel-container")[0];
// //to get all image length
// let totalImages = document.querySelectorAll(".carousel-container-img img");
// //to get responsive value
// let containerWidth = parseInt(getComputedStyle(carousleContainerMain).width);

// for (let i = 0; i < totalImages.length; i++) {
//   totalImages[i].style.position = "absolute";
//   totalImages[i].style.top = "0px";
//   totalImages[i].style.left = i * containerWidth + "px";
// }

// let indicatorsBox = document.createElement("div");

// indicatorsBox.style.width = totalImages.length * 23 + "px";
// // indicatorsBox.style.height = "50px";
// indicatorsBox.style.position = "absolute";
// indicatorsBox.style.bottom = "0";
// indicatorsBox.style.left = "50%";
// indicatorsBox.style.transform = "translate(-50%,-50%)";
// // indicatorsBox.style.background = "red";
// indicatorsBox.style.zIndex = "200";

// for (let i = 0; i < totalImages.length; i++) {
//   let circleIndicator = document.createElement("div");
//   circleIndicator.style.height = "11px";
//   circleIndicator.style.width = "11px";
//   circleIndicator.style.border = "2px solid rgb(60,60,90)";
//   circleIndicator.style.borderRadius = "50%";
//   circleIndicator.style.display = "inline-block";
//   circleIndicator.style.marginLeft = "8px";
//   circleIndicator.className = "indicator";
//   circleIndicator.style.cursor = "pointer";
//   //   console.log(img.length);

//   indicatorsBox.appendChild(circleIndicator);
// }

// carousleContainerMain.appendChild(indicatorsBox);
// //-------------------previous

// let carouselContainer = document.getElementsByClassName(
//   "carousel-container-img"
// )[0];
// //buttons
// let nextButton = document.getElementsByClassName("right-box")[0];
// let prevButton = document.getElementsByClassName("left-box")[0];
// //indicators
// let indicator = document.getElementsByClassName("indicator");

// // let totalImages = document.querySelectorAll(".carousel-container-img img");
// //to determine image index
// let indexOfImage = 1;
// let moveXdirection = 0;

// indicator[0].style.background = "rgb(70,70,90)";

// //indicator on
// function indicatorOn(indexOn) {
//   for (let i = 0; i < indicator.length; i++) {
//     indicator[i].style.background = "transparent";
//   }
//   indicator[indexOn].style.background = "rgb(70,70,90)";
// }
// //carousel move direction
// // function carouselMoveTo(moveDirection) {
// //   carouselContainer.style.transform = `translateX(${moveDirection}px)`;
// // }
// //carousel move direction
// function carouselMoveTo(moveDirection, prevDirection) {
//   let timing = 10;
//   if (Math.abs(moveDirection - prevDirection) > containerWidth * 2) {
//     timing = 1;
//   } else {
//     timing = 10;
//   }
//   let nextMove = setInterval(() => {
//     //next
//     if (moveDirection < prevDirection) {
//       //(-600<0)
//       prevDirection -= 10;
//       carouselContainer.style.transform = `translateX(${prevDirection}px)`;
//     } else {
//       //prev
//       prevDirection += 10;
//       carouselContainer.style.transform = `translateX(${prevDirection}px)`;
//     }

//     if (prevDirection === moveDirection) {
//       clearInterval(nextMove);
//     }
//   }, timing);
// }

// //event next
// nextButton.onclick = nextSlide;

// //event previous
// prevButton.onclick = previousSlide;

// for (let i = 0; i < indicator.length; i++) {
//   indicator[i].onclick = function () {
//     let prevDirection = moveXdirection;
//     moveXdirection = i * -containerWidth;
//     indexOfImage = i + 1;
//     carouselMoveTo(moveXdirection, prevDirection);
//     indicatorOn(i);
//   };
// }

// function nextSlide() {
//   let prevDirection = moveXdirection;
//   moveXdirection -= containerWidth;
//   indexOfImage++;
//   if (indexOfImage > totalImages.length) {
//     moveXdirection = 0;
//     indexOfImage = 1;
//   }
//   carouselMoveTo(moveXdirection, prevDirection);
//   indicatorOn(indexOfImage - 1);
// }

// function previousSlide() {
//   let prevDirection = moveXdirection;
//   moveXdirection += containerWidth;
//   indexOfImage--;
//   if (indexOfImage < 1) {
//     moveXdirection = -(totalImages.length - 1) * containerWidth;
//     indexOfImage = totalImages.length;
//   }
//   carouselMoveTo(moveXdirection, prevDirection);
//   indicatorOn(indexOfImage - 1);
// }

// setInterval(() => {
//   nextSlide();
// }, 4200);
