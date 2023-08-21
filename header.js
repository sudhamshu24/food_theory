let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
let login = document.querySelectorAll(".login");
const modal = document.querySelector(".track-modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
let register = document.querySelectorAll(".register");
let navicon = document.querySelector(".mobile-nav");
//Displaying Menu icon for Responsive Header
let mobileNavbar = document.querySelector(".mobile");
navicon.addEventListener("click", function (e) {
  e.preventDefault();
  mobileNavbar.classList.toggle("hidden");
});
//Replacing Login with username
if (sessionUser) {
  login[0].innerHTML = `${sessionUser.username.toUpperCase()}`;
  login[1].innerHTML = `${sessionUser.username.toUpperCase()}`;
  if (sessionUser.designation === "manager") {
    document
      .querySelector(".screen")
      .insertAdjacentHTML(
        "beforeend",
        `<a class="dash-board" href="dashboard.html">Dashboard</a><a class="logout">Logout</a>`
      );
    document
      .querySelector(".mobile")
      .insertAdjacentHTML(
        "beforeend",
        `<a class="dash-board" href="dashboard.html">Dashboard</a><a class="logout">Logout</a>`
      );
    login[0].classList.add("hidden");
    login[1].classList.add("hidden");
    register[0].classList.add("hidden");
    register[1].classList.add("hidden");
  }
  if (sessionUser.designation === "user") {
    document
      .querySelector(".screen")
      .insertAdjacentHTML(
        "beforeend",
        `</a><a href="restaurants-list.html">Restaurant</a><a href="order.html">Menu</a><a href="booktable.html">BookTable</a><a href="about-us.html">AboutUs</a><a href="cart.html">Cart</a><a class="track">Track</a><a class="logout">Logout</a>`
      );
    document
      .querySelector(".mobile")
      .insertAdjacentHTML(
        "beforeend",
        `</a><a href="restaurants-list.html">Restaurant</a><a href="order.html">Menu</a><a href="booktable.html">BookTable</a><a href="about-us.html">AboutUs</a><a href="cart.html">Cart</a><a class="track">Track</a><a class="logout">Logout</a>`
      );
    login[0].classList.add("hidden");
    login[1].classList.add("hidden");
    register[0].classList.add("hidden");
    register[1].classList.add("hidden");
  }
}
let tracks = document.querySelectorAll(".track");
tracks[0]?.addEventListener("click", function (e) {
  e.preventDefault();
  openModal();
});
tracks[1]?.addEventListener("click", function (e) {
  e.preventDefault();
  openModal();
});
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
document.querySelector(".track__nav").addEventListener("click", function (e) {
  let confId = document.querySelector(".track__inp").value;
  if (String(confId).length != 6) {
    e.preventDefault();
    alert("Please Enter 6 digit Confirmation Number");
  } else {
    sessionStorage.setItem("currentOrderID", confId);
  }
});

let logoutbtns = document.querySelectorAll(".logout");
//Logout Functionality
logoutbtns[0]?.addEventListener("click", function (e) {
  e.preventDefault();
  userSession();
});
logoutbtns[1]?.addEventListener("click", function (e) {
  e.preventDefault();
  userSession();
});
function userSession() {
  let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
  login[0].innerHTML = "Login";
  login[1].innerHTML = "Login";
  console.log(sessionUser);
  if (sessionUser) {
    sessionStorage.clear();
    window.location.href = "./index.html";
  } else alert("You need to be logged  in first");
}
