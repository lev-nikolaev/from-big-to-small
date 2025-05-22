import "./style.css";

import gsap from "gsap";

const ITEMS_COUNT = 20;

let speed = 0;
let position = 0;
let height = 0;
let isHover = false;
let rounded = 0;

const contentWrapper = document.querySelector(".wrapper");
const wrap = document.querySelector(".cards_wrap");
const card = [...document.querySelectorAll(".card")]
const hover = document.querySelector(".hover");

const clone = wrap.cloneNode(true);
contentWrapper.appendChild(clone);

window.addEventListener("wheel", (e) => {
  speed -= e.deltaY * 0.03;
});

hover.addEventListener("mouseenter", (e) => {
  isHover = true;

  gsap.to(".card", {
    width: "10vw",
    height: "15vh",
    duration: 1,
    ease: "power3.out",
  });
});
hover.addEventListener("mouseleave", (e) => {
  isHover = false;

  gsap.to(".card", {
    width: "30vw",
    height: "50vh",
    duration: 1,
    ease: "power3.out",
  });
});

function getCardsHeight() {
  const cards = document.querySelectorAll(".card");
  return {
    cardHeight: cards[0].offsetHeight,
    fullHeight: Array.from(cards).reduce((sum, card) => sum + card.offsetHeight, 0),
  }
}

const lerp = (start, end, amt) => (1 - amt) * start + amt * end;

function raf() {
  position += speed;
  speed *= 0.97;

  if (isHover) {
    height = getCardsHeight().fullHeight * 2;
  } else {
    height = getCardsHeight().fullHeight;

    rounded = Math.round(position / getCardsHeight().cardHeight) * getCardsHeight().cardHeight;
    position = lerp(position, rounded, 0.05);
  }

  if (position <= -height / 2) position += height / 2;
  if (position >= 0) position -= height / 2;

  contentWrapper.style.transform = `translateY(${
    isHover ? position / 2 : position
  }px)`;

  requestAnimationFrame(raf);
}

raf();
