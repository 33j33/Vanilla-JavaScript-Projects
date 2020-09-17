const hamburger = document.querySelector(".hamburger");
const navbar = document.querySelector(".nav-bar");
const navbarItems = document.querySelectorAll(".nav-bar li");

hamburger.addEventListener("click", () => { navbar.classList.toggle("open") });
navbar.addEventListener("click", () => { alert("Hello World") })
