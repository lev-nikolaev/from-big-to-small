import "./style.css";

import gsap from "gsap";

let speed = 0;
let position = 0;
let height = 0;
let isHover = false;

const contentWrapper = document.querySelector(".wrapper");
const wrap = document.querySelector(".cards_wrap");
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

function raf() {
  position += speed;
  speed *= 0.97;

  if (isHover) {
    height = contentWrapper.scrollHeight * 2;
  } else {
    height = contentWrapper.scrollHeight;
  }

  if (position <= -height / 2) position += height / 2;
  if (position >= 0) position -= height / 2;

  contentWrapper.style.transform = `translateY(${
    isHover ? position / 2 : position
  }px)`;
  
  requestAnimationFrame(raf);
}

raf();
