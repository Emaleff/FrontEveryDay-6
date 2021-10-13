const items = document.querySelectorAll("[data-atr]");
const images = document.querySelectorAll(".menu__item-svg");
const text = document.querySelectorAll(".menu__item-text");

items.forEach((item) => {
  item.addEventListener("click", () => {
    images.forEach((imageItem) => {
      imageItem.classList.remove("menu__item-svg_active");
    });

    text.forEach((textItem) => {
      textItem.classList.remove("menu__item-text_active");
    });
    item
      .querySelector(".menu__item-text")
      .classList.add("menu__item-text_active");
    item
      .querySelector(".menu__item-svg")
      .classList.add("menu__item-svg_active");
  });
});
const sliderBtns = document.querySelectorAll("[data-slider]");
const sliders = document.querySelectorAll("[data-slider-content]");
sliderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.getAttribute("data-slider");
    sliders.forEach((slider) => {
      if (slider.getAttribute("data-slider-content") === item) {
        slider.classList.add("slider__content_active");
      } else {
        slider.classList.remove("slider__content_active");
      }
    });
    sliderBtns.forEach((btn) => {
      btn.classList.remove("slider__top-btn_active");
    });
    btn.classList.add("slider__top-btn_active");
  });
});

var swiper = new Swiper(".mySwiper", {
  slidesPerView: "auto",
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Registered",
        backgroundColor: "#F86549",
        data: [22, 15, 18, 8, 19, 12, 21],
        borderRadius: 8,
        borderRadius: Number.MAX_VALUE,
        borderSkipped: true,
      },
      {
        label: "Guests",
        backgroundColor: "#EDEFEF",
        data: [42, 28, 32, 25, 38, 35, 28],
        borderRadius: Number.MAX_VALUE,

        // borderRadius: 15,
        borderSkipped: true,
      },
    ],
  },
  options: {
    tooltips: {
      displayColors: true,
      callbacks: {
        mode: "x",
      },
    },
    barPercentage: 0.3,
    scales: {
      x: {
        stacked: true,
      },

      y: {
        // stacked: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: "bottom",
    },
  },
});

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 2.036, lng: 45.298 },
    zoom: 10,
  });
}

function initImagePopup(elem) {
  // check for mouse click, add event listener on document
  document.addEventListener("click", function (e) {
    // check if click target is img of the elem - elem is image container
    if (!e.target.matches(elem + " img")) return;
    else {
      var image = e.target; // get current clicked image

      // create new popup image with all attributes for clicked images and offsets of the clicked image
      var popupImage = document.createElement("img");
      popupImage.setAttribute("src", image.src);
      popupImage.style.width = image.width + "px";
      popupImage.style.height = image.height + "px";
      popupImage.style.left = image.offsetLeft + "px";
      popupImage.style.top = image.offsetTop + "px";
      popupImage.classList.add("popImage");

      // creating popup image container
      var popupContainer = document.createElement("div");
      popupContainer.classList.add("popupContainer");

      // creating popup image background
      var popUpBackground = document.createElement("div");
      popUpBackground.classList.add("popUpBackground");

      // append all created elements to the popupContainer then on the document.body
      popupContainer.appendChild(popUpBackground);
      popupContainer.appendChild(popupImage);
      document.body.appendChild(popupContainer);

      // call function popup image to create new dimensions for popup image and make the effect
      popupImageFunction();

      // resize function, so that popup image have responsive ability
      var wait;
      window.onresize = function () {
        clearTimeout(wait);
        wait = setTimeout(popupImageFunction, 100);
      };

      // close popup image clicking on it
      popupImage.addEventListener("click", function (e) {
        closePopUpImage();
      });
      // close popup image on clicking on the background
      popUpBackground.addEventListener("click", function (e) {
        closePopUpImage();
      });

      function popupImageFunction() {
        // wait few miliseconds (10) and change style of the popup image and make it popup
        // waiting is for animation to work, yulu can disable it and check what is happening when it's not there
        setTimeout(function () {
          // I created this part very simple, but you can do it much better by calculating height and width of the screen,
          // image dimensions.. so that popup image can be placed much better
          popUpBackground.classList.add("active");
          popupImage.style.left = "15%";
          popupImage.style.top = "50px";
          popupImage.style.width = window.innerWidth * 0.7 + "px";
          popupImage.style.height =
            (image.height / image.width) * (window.innerWidth * 0.7) + "px";
        }, 10);
      }

      // function for closing popup image, first it will be return to the place where
      // it started then it will be removed totaly (deleted) after animation is over, in our case 300ms
      function closePopUpImage() {
        popupImage.style.width = image.width + "px";
        popupImage.style.height = image.height + "px";
        popupImage.style.left = image.offsetLeft + "px";
        popupImage.style.top = image.offsetTop + "px";
        popUpBackground.classList.remove("active");
        setTimeout(function () {
          popupContainer.remove();
        }, 300);
      }
    }
  });
}

// Start popup image function
initImagePopup(".img-container"); // elem = image container

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");
const closeCur = document.querySelector(".close");

// modal
const modalContent = document.querySelector(".modal-content");
const slides = Array.from(document.querySelectorAll(".my-slides"));
const columns = document.querySelectorAll(".column");
const demos = Array.from(document.querySelectorAll(".demo"));

// text
const numberText = document.querySelectorAll(".my-slides--number");
const captionText = document.getElementById("caption");

// img on page
const hoverShadows = Array.from(document.querySelectorAll(".hover-shadow"));

let slideIndex;
let translate = 0;
let columnWidth;

// if window resize reset all values
window.addEventListener("resize", () => {
  columnWidth = columns[0].offsetWidth;
  columns.forEach((el) => {
    el.style.transform = `translateX(0)`;
  });
  slideIndex = 1;
  translate = 0;
  showSlides(slideIndex);
});

// buttons action

prev.addEventListener("click", () => {
  if (slideIndex === 1) return false;
  plusSlides(-1);
  if (translate === 0) return null;
  translate += columnWidth + 4;
  columns.forEach((el) => {
    el.style.transform = `translateX(${translate}px)`;
  });
});

next.addEventListener("click", () => {
  if (demos.length + 1 === 1) return false;
  plusSlides(1);
  if (translate === -(columns.length - 3) * (columnWidth + 4)) return null;
  translate -= columnWidth + 4;
  columns.forEach((el) => {
    el.style.transform = `translateX(${translate}px)`;
  });
});
closeCur.addEventListener("click", () => closeModal());

// add click to main img to trigger open carousel

hoverShadows.forEach((el, i) => {
  el.addEventListener("click", () => {
    openModal();
    currentSlide(i + 1);
  });
});

// add click thumbnails to show curent slide

demos.forEach((el, i) => {
  el.addEventListener("click", () => currentSlide(i + 1));
});

// Open modal

function openModal() {
  document.getElementById("myModal").style.display = "block";
  columnWidth = columns[0].offsetWidth;
  showAndClose();
  numberText.forEach((el, id) => {
    el.innerHTML = `${id + 1} / ${numberText.length}`;
  });
}

// Close the Modal
function closeModal() {
  document.getElementById("myModal").style.display = "none";
}

slideIndex = 1;

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
  let x = n - 3 < 0 ? 0 : n - 3;
  translate = -(columnWidth + 4) * x;
  columns.forEach((el) => {
    el.style.transform = `translateX(${translate}px)`;
  });
}

// control showing slides

function showSlides(n) {
  let i;
  showAndClose();
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < demos.length; i++) {
    demos[i].classList.remove("active");
  }
  slides[slideIndex - 1].style.display = "block";
  demos[slideIndex - 1].classList.add("active");
  captionText.innerHTML = demos[slideIndex - 1].alt;
}

// control buttons if reach to limit left or right

function showAndClose() {
  if (slideIndex === 1) {
    prev.style.display = "none";
  } else {
    prev.style.display = "block";
  }

  if (slideIndex === demos.length) {
    next.style.display = "none";
  } else {
    next.style.display = "block";
  }
}

const burger = document.getElementById("burger");
const menu = document.querySelector(".menu__items");

burger.addEventListener("click", () => {
  menu.classList.toggle("open");
});

menu.addEventListener("click", () => {
  menu.classList.remove("open");
});
