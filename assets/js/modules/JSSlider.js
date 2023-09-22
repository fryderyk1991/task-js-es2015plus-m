export default class JSSlider {
  constructor(imagesSelector) {
    this.imagesList = document.querySelectorAll(imagesSelector);
    this.sliderRootElement = document.querySelector(".js-slider");
    this.navNext = this.sliderRootElement.querySelector(
      ".js-slider__nav--next"
    );
    this.navPrev = this.sliderRootElement.querySelector(
      ".js-slider__nav--prev"
    );
    this.zoom = this.sliderRootElement.querySelector(".js-slider__zoom");
    this.sliderProto = document.querySelector(
      ".js-slider__thumbs-item.js-slider__thumbs-item--prototype"
    );
    this.sliderFooter = document.querySelector(".js-slider__thumbs");
    this.interval;
  }
  run() {
    this.initEvents();
    this.initCustomEvents();
  }
  initEvents() {
    this.imagesList.forEach((image) => {
      image.addEventListener("click", (e) => {
        this.fireCustomEvent(e.currentTarget, "js-slider-img-click");
      });
    });
    if (this.navNext) {
      this.navNext.addEventListener("click", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-img-next");
      });
      this.navNext.addEventListener("mouseenter", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-stop");
      });

      this.navNext.addEventListener("mouseleave", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-start");
      });
    }
    if (this.navPrev) {
      this.navPrev.addEventListener("click", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-img-prev");
      });
      this.navPrev.addEventListener("mouseenter", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-stop");
      });
      this.navPrev.addEventListener("mouseleave", (e) => {
        this.fireCustomEvent(this.sliderRootElement, "js-slider-start");
      });
    }
    if (this.zoom) {
      this.zoom.addEventListener("click", (e) => {
        if (e.target === e.currentTarget)
          this.fireCustomEvent(this.sliderRootElement, "js-slider-close");
      });
    }
  }

  fireCustomEvent(element, name) {
    console.log(element.className, "=>", name);

    const event = new CustomEvent(name, {
      bubbles: true,
    });

    element.dispatchEvent(event);
  }
  initCustomEvents() {
    this.imagesList.forEach((img) => {
      img.addEventListener("js-slider-img-click", (e) => {
        this.onImageClick(e);
      });
    });
    this.sliderRootElement.addEventListener("js-slider-img-next", (e) =>
      this.onImageNext(e)
    );
    this.sliderRootElement.addEventListener("js-slider-img-prev", (e) =>
      this.onImagePrev(e)
    );
    this.sliderRootElement.addEventListener("js-slider-close", (e) =>
      this.onClose(e)
    );
    this.sliderRootElement.addEventListener("js-slider-start", (e) =>
      this.sliderStart(e)
    );
    this.sliderRootElement.addEventListener("js-slider-stop", (e) =>
      this.sliderStop(e)
    );
  }
  onImageClick(e) {
    this.sliderRootElement.classList.add("js-slider--active");
    this.createThumb(e)
    this.sliderStart();
  }
  
  createThumb (e) {
    const thumbImages = this.getCurrentImages(e);
     thumbImages.forEach((el) => {
      const images = el.querySelector("img");
      const newSliderThumbsProto = this.sliderProto.cloneNode(true);
      const atr = images.getAttribute("src");
      const newImages = newSliderThumbsProto.firstChild.nextElementSibling;
      newImages.setAttribute("src", atr);
      newSliderThumbsProto.classList.remove(
        "js-slider__thumbs-item--prototype"
      );
      this.sliderFooter.appendChild(newSliderThumbsProto);
      const currentImageSrc = this.getCurrentImageAtr(e);
      if (atr === currentImageSrc) {
        newImages.classList.add("js-slider__thumbs-image--current");
      }
    });
  }

  getCurrentImageAtr(e) {
    const currentImage = e.target.querySelector("img");
    const currentImageSrc = currentImage.getAttribute("src");
    const currentSliderImage =
    this.sliderRootElement.querySelector(".js-slider__image");
    currentSliderImage.setAttribute("src", currentImageSrc);
    return currentImageSrc;
  }

  getCurrentImages(e) {
    const eventGroupName = e.target.dataset.sliderGroupName;
    const getImages = [...document.querySelectorAll(".gallery__item")];
    const selectedGroupOfImages = getImages.filter(
      (image) => image.dataset.sliderGroupName === eventGroupName
    );
    return selectedGroupOfImages;
  }

   changeSlide(currentImage, figure, siblingEl) {
    currentImage.classList.remove("js-slider__thumbs-image--current");
    if (figure && !figure.classList.contains("js-slider__thumbs-item--prototype")) {
     this.changeCurrentSlide(currentImage, figure)
    } 
    else {
      this.setCarouselSlide(currentImage, siblingEl)
    }
  }

  changeCurrentSlide(currentImage, figure) {
    const image = figure.querySelector("img");
    currentImage.classList.remove("js-slider__thumbs-image--current");
    image.classList.add("js-slider__thumbs-image--current");
    const getAtr = image.getAttribute("src");
    const sliderImage = document.querySelector(".js-slider__image");
    sliderImage.setAttribute("src", getAtr);
  }
  setCarouselSlide(currentImage, siblingEl) {
      currentImage.classList.remove("js-slider__thumbs-image--current");
      const carouselImage = siblingEl.querySelector("img");
      carouselImage.classList.add("js-slider__thumbs-image--current");
      const getAtr = carouselImage.getAttribute("src");
      const sliderImage = document.querySelector(".js-slider__image");
      sliderImage.setAttribute("src", getAtr);
  }

  onImageNext() {
    const currentImage = document.querySelector(
      ".js-slider__thumbs-image--current"
    );
    const figureProto = document.querySelector(
      ".js-slider__thumbs-item--prototype"
    );
    const nextFigure = currentImage.parentElement.nextElementSibling;
    const secondFigure = figureProto.nextElementSibling;
    const nextSlide = this.changeSlide(currentImage, nextFigure, secondFigure);
  }
  onImagePrev() {
    const currentImage = document.querySelector(
      ".js-slider__thumbs-image--current"
    );
    const figureProto = document.querySelector(
      ".js-slider__thumbs-item--prototype"
    );
    const prevFigure = currentImage.parentElement.previousElementSibling;
    const lastFigure = figureProto.parentElement.lastElementChild;
    const prevSlide = this.changeSlide(currentImage, prevFigure, lastFigure);
  }

  onClose(e) {
    e.currentTarget.classList.remove("js-slider--active");
    const thumbsList = this.sliderFooter.querySelectorAll(
      ".js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)"
    );
    thumbsList.forEach((item) => item.parentElement.removeChild(item));
  }
  sliderStart() {
    this.interval = setInterval(() => {
      this.onImageNext();
    }, 1500);
  }
  sliderStop() {
    clearInterval(this.interval);
  }
}
