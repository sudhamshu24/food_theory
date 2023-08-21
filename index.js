import "../scss/base.scss";
// import "../index.html";
// // import "../temp.html";
// // import "../restaurants.json";
// import "../placeOrder.html";
// import "../order.html";
// import "../assets/testimonial-bg.png";
// import "../login.html";
// import "../cart.html";
// import "../about-us.html";
// import "../nearby.html";
// import "../booktable.html";
// import "../dashboard.html";
// import "../assets/catering.webp";
// import "../assets/restaurant-15.svg";
// import "../assets/chicken biryani.jpg";
// import "../assets/chicken burger.jpg";
// import "../assets/chicken kebab.jpg";
// import "../assets/chicken noodles.jpg";
// import "../assets/chicken pizza.jpg";
// import "../assets/chicken nuggets.jpg";
// import "../assets/chicken pasta.jpg";
// import "../assets/chicken salad.jpg";
// import "../assets/fish fry.jpg";
// import "../assets/fries.jpg";
// import "../assets/home-bg.jpg";
// import "../assets/logo.png";
// import "../assets/menu.png";
// import "../assets/mutton biryani.jpg";
// import "../assets/pav bhaji.jpg";
// import "../assets/reserve-table.png";
// import "../assets/restaurant.png";
// import "../assets/veg biryani.jpg";
// import "../assets/veg burger.jpg";
// import "../assets/veg fried rice.jpg";
// import "../assets/veg garlic bread.jpg";
// import "../assets/veg manchuria.jpg";
// import "../assets/veg pasta.jpg";
// import "../assets/veg pizza.jpg";
// import "../assets/veg pulao.jpg";
// import "../assets/veg salad.jpg";
// import "../assets/veg thali.jpg";
// import "../assets/veg-noodles.jpg";
// import "../assets/aboutUs.jpg";

let restrodetails;
console.log(sessionStorage.getItem("restaurantIndex"));
let restaurantIndex = parseInt(
  sessionStorage.getItem("restaurantIndex") ??
    parseInt(sessionStorage.getItem("managerId")) - 1
);

console.log(restaurantIndex);
let xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://usability1-83c27-default-rtdb.firebaseio.com/restaurants.json",
  true
);
xhr.responseType = "text";
xhr.send();
xhr.onload = function () {
  console.log("sts" + xhr.status);
  if (xhr.status === 200) {
    restrodetails = JSON.parse(xhr.responseText);
    console.log(restrodetails[restaurantIndex]);
    document.querySelector(
      ".main__top"
    ).style.backgroundImage = `url(${restrodetails[restaurantIndex].photograph})`;
    document.querySelector(
      ".main__heading"
    ).innerHTML = `Welcome to ${restrodetails[restaurantIndex].name}`;
    document
      .querySelector(".rest-details__list__addr")
      .insertAdjacentHTML(
        "beforeend",
        `<address>${restrodetails[restaurantIndex].address}</address>`
      );
    document
      .querySelector(".rest-details__list__tim")
      .insertAdjacentHTML(
        "beforeend",
        `<span>${restrodetails[restaurantIndex].operatingHours.open} - ${restrodetails[restaurantIndex].operatingHours.close}</span>`
      );
    for (let i = 0; i < restrodetails[restaurantIndex].overallRating; i++) {
      document
        .querySelector(".rest-details__list__rate")
        .insertAdjacentHTML(
          "beforeend",
          `<span><i class="fa fa-star"></i></span>`
        );
    }
    for (let i = 0; i < 5 - restrodetails[restaurantIndex].overallRating; i++) {
      document
        .querySelector(".rest-details__list__rate")
        .insertAdjacentHTML(
          "beforeend",
          `<span class="open-star"><i class="fa fa-star"></i></span>`
        );
    }
  }
};

// let restaurantsList = document.querySelector(".restaurants__list");
// function displayRestaurants() {
//   for (let i of restaurants) {
//     restaurantsList.insertAdjacentHTML(
//       "afterbegin",
//       `<div class="restaurants__item" data-id="${i.id}"><h3>${i.name}</h3></div>`
//     );
//   }
//};
