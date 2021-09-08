const menuOpen = document.querySelector(".menu");
const menuClose = document.querySelector(".close");
const overlay = document.querySelector(".overlay");

const buttons = document.getElementsByClassName("cta");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].style.width = "auto + 50px";
}

menuOpen.addEventListener("click", () => {
  overlay.classList.add("overlay--active");
});

menuClose.addEventListener("click", () => {
  overlay.classList.remove("overlay--active");
});