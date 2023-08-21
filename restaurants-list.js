let restaurants;
let xhr = new XMLHttpRequest();
let autoCompArray = [];
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
    restaurants = JSON.parse(xhr.responseText);
    console.log(restaurants);
    displayRestaurants();
    restaurants.forEach((element) => {
      autoCompArray.push(element.name.toLowerCase());
    });
    console.log(autoCompArray);
  }
};
let restaurantsList = document.querySelector(".restaurants__list");
function displayRestaurants() {
  for (let i of restaurants) {
    restaurantsList.insertAdjacentHTML(
      "afterbegin",
      `<div class="restaurants__item" data-id="${i.id}"><img src = "${i.photograph}" alt = "${i.name} image"><h3>${i.name}</h3><p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos earum ducimus, vel ullam harum, quas nulla sequi numquam, unde voluptatibus eaque maiores debitis?</p></div>`
    );
  }
}
restaurantsList.addEventListener("click", function (e) {
  e.preventDefault();
  let restaurant = e.target.closest(".restaurants__item");
  if (!restaurant) return;
  selectRestaurant(parseInt(restaurant.dataset.id));
});
let restaurantIndex;
function selectRestaurant(id) {
  for (let i of restaurants) {
    if (i.id === id) {
      restaurantIndex = restaurants.indexOf(i);
      console.log(restaurantIndex);
      sessionStorage.setItem("restaurantIndex", restaurantIndex);
      sessionStorage.setItem("restaurantName", i.name);
      window.location.href = "./restaurants-list.html";
    }
  }
}
let searchBtn = document.querySelector(".main__top__form__submit");
let searchInp = document.querySelector(".main__top__form__search");
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  for (let i of restaurants) {
    if (i.name.toLowerCase() === searchInp.value.toLowerCase()) {
      restaurantIndex = restaurants.indexOf(i);
      sessionStorage.setItem("restaurantIndex", restaurantIndex);
      sessionStorage.setItem("restaurantName", i.name);
      window.location.href = "./restaurants-list.html";
    }
  }
});

function autoComplete(dataList, tempval, arr) {
  while (dataList.firstChild) dataList.removeChild(dataList.lastChild);
  tempval = tempval.toLowerCase();
  let regex = new RegExp(tempval, "g");
  for (let i of arr) {
    if (i.match(regex))
      dataList.insertAdjacentHTML("afterbegin", `<option value = "${i}">`);
  }
}
let dataList = document.getElementById("search-values");
searchInp.addEventListener("keyup", function (e) {
  e.preventDefault();
  let keyval = searchInp.value;
  autoComplete(dataList, keyval, autoCompArray);
});
