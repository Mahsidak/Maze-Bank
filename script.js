"use strict";
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
// Modal window
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((abcd) => abcd.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
const header = document.querySelector(".header");
document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
//smooth scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1Coords = section1.getBoundingClientRect();
  //modern way of scrolling
  section1.scrollIntoView({ behavior: "smooth" });
});

//scrolling navbar
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const hrefId = e.target.getAttribute("href");
    document.querySelector(hrefId).scrollIntoView({ behavior: "smooth" });
  }
});

//tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", (e) => {
  const tabClicked = e.target.closest(".operations__tab");
  if (!tabClicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabClicked.classList.add("operations__tab--active");

  tabsContent.forEach((t) => t.classList.remove("operations__content--active"));
  document
    .querySelector(`.operations__content--${tabClicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//fade Effect navbar
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav__links").querySelectorAll(".nav__link");
    siblings.forEach(function (s) {
      if (s !== link) {
        s.style.opacity = opacity;
      }
    });
  }
};
document
  .querySelector(".nav__links")
  .addEventListener("mouseover", function (e) {
    handleHover(e, 0.5);
  });
document
  .querySelector(".nav__links")
  .addEventListener("mouseout", function (e) {
    handleHover(e, 1);
  });

//navbar animation: intersection observer API
const headerRootMargin = document
  .querySelector(".nav")
  .getBoundingClientRect().height;
const headerLogic = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    document.querySelector(".nav").classList.add("sticky");
  } else {
    document.querySelector(".nav").classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(headerLogic, {
  root: null,
  threshold: 0.9,
});
headerObserver.observe(header);

//section animation:insection observer API
const sectionLogic = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  sectionObserver.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionLogic, {
  root: null,
  threshold: 0.15,
});
document.querySelectorAll(".section").forEach(function (sec) {
  sectionObserver.observe(sec);
  sec.classList.add("section--hidden");
});

//img animation:insection observer API
const imgLogic = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
    imgObserver.unobserve(entry.target);
  });
};
const imgObserver = new IntersectionObserver(imgLogic, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});
document.querySelectorAll("img[data-src]").forEach(function (img) {
  imgObserver.observe(img);
});

//slider function

const slider = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
let curSlide = 0;
const dots = document.querySelector(".dots");
const createDots = function () {
  slides.forEach(function (_, i) {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();
const activeDots = function (s) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((v) => v.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide='${s}']`)
    .classList.add("dots__dot--active");
};
activeDots(curSlide);
const slideTransform = function (curSlide) {
  slides.forEach(function (e, i) {
    e.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
};
slideTransform(curSlide);

btnRight.addEventListener("click", function (e) {
  if (curSlide === slides.length - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slideTransform(curSlide);
  activeDots(curSlide);
});
btnLeft.addEventListener("click", function (e) {
  if (curSlide === 0) {
    curSlide = slides.length - 1;
  } else {
    curSlide--;
  }
  slideTransform(curSlide);
  activeDots(curSlide);
});
document.querySelectorAll(".dots__dot").forEach(function (v, i) {
  v.addEventListener("click", function (e) {
    curSlide = Number(e.target.dataset.slide);
    slideTransform(curSlide);
    activeDots(curSlide);
  });
});
