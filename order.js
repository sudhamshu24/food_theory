let restrodetails;
let cartIds;
let userInd;
let userIndex;
let cartPrice;
cartIds && (cartIds = cartIds.split(","));
cartIds = cartIds?.map((i) => parseInt(i));
console.log(cartIds);
let menuVeg = document.querySelector(".menu__veg");
let menuNonVeg = document.querySelector(".menu__non-veg");
let menuItemsVeg = document.querySelector(".menu__items__veg");
let menuItemsNonVeg = document.querySelector(".menu__items__non-veg");
let restaurantIndex = parseInt(
  sessionStorage.getItem("restaurantIndex") ??
    parseInt(sessionStorage.getItem("managerId")) - 1
);

let cartRestaurantIndex;
console.log(restaurantIndex);
let xhr = new XMLHttpRequest();
let xhr1 = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://usability1-83c27-default-rtdb.firebaseio.com/restaurants.json",
  true
);
xhr1.open(
  "GET",
  "https://usability1-83c27-default-rtdb.firebaseio.com/admin/userDetails.json",
  true
);
xhr.responseType = "text";
xhr.send();
xhr.onload = function () {
  console.log("sts" + xhr.status);
  if (xhr.status === 200) {
    restrodetails = JSON.parse(xhr.responseText);
    console.log(restrodetails);
  }

  xhr1.responseType = "text";
  xhr1.send();
  xhr1.onload = function () {
    console.log("sts" + xhr1.status);
    if (xhr1.status === 200) {
      userDetails = JSON.parse(xhr1.responseText);
      console.log(userDetails);
      let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));

      if (!sessionUser) {
        alert("Please Login First");
        window.location.href = "./login.html";
      }
      sessionUserName = sessionUser.username;
      for (let i of userDetails) {
        if (i.username.toLowerCase() === sessionUserName.toLowerCase()) {
          userInd = i;
          userIndex = userDetails.indexOf(i);
          break;
        }
      }

      console.log(userInd);
      cartIds = userInd.cartItems || [];
      cartPrice = userInd.cartPrice || [];
      if (cartIds.length) {
        cartRestaurantIndex = userInd.cartRestaurantIndex || restaurantIndex;
        console.log(cartRestaurantIndex);
        if (cartRestaurantIndex !== restaurantIndex) {
          cartIds = [];
          cartPrice = [];
        }
      }
      console.log(userInd.username);
      console.log(cartIds);
      displayVeg();
    }
  };
};
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALvlPVGC_a9CWIS094taKCXGg55ej2D20",
  authDomain: "usability1-83c27.firebaseapp.com",
  projectId: "usability1-83c27",
  storageBucket: "usability1-83c27.appspot.com",
  messagingSenderId: "180853460267",
  appId: "1:180853460267:web:e8040d5f6a05ba0380096e"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

menuVeg.addEventListener("click", function (e) {
  e.preventDefault();
  displayVeg();
});
menuNonVeg.addEventListener("click", function (e) {
  e.preventDefault();
  displayNonVeg();
});
function cleardivs() {
  while (menuItemsVeg.firstChild)
    menuItemsVeg.removeChild(menuItemsVeg.lastChild);
  while (menuItemsNonVeg.firstChild)
    menuItemsNonVeg.removeChild(menuItemsNonVeg.lastChild);
}
//Display veg menu
function displayVeg() {
  cleardivs();
  menuVeg.classList.add("menu--active");
  menuNonVeg.classList.contains("menu--active") &&
    menuNonVeg.classList.remove("menu--active");
  for (let i of restrodetails[restaurantIndex].menuItems) {
    console.log(i);
    if (i.category === "Veg")
      menuItemsVeg.insertAdjacentHTML(
        "afterbegin",
        `<div class="menu__lists"><div class="menu__details"><img class="menu__details__img" src="${
          i.image
        }" alt="${
          i.name
        } Image"/><div class="menu__text"><h3 class="menu__text__h3">${i.name.toUpperCase()}</h3><div class="menu__text__categoryv">${
          i.category
        }</div><h4 class="menu__text__h4">Price: <i class="fa fa-rupee"></i>${
          i.price
        }/-</h4><h5 class="menu__text__rate"><i class="fa fa-star">${
          i.rating
        } </i></h5><p class="menu__text__p">${
          i.description
        }</p><h4>Cuisine: <span>${
          i.cuisine_name
        }</span></h4><h4>Consumable for: <span>${
          i.consumableFor
        }</span></h4><div class="menu__buttons"><a data-id="${
          i.id
        }" class="menu__ordernow" href="placeOrder.html">Order Now</a><a data-id="${
          i.id
        }" data-cost="${
          i.price
        }" class="menu__addtocart">Add to Cart</a></div></div></div></div>`
      );
  }
  let addtocartbtn;
  let cartbtns = document.querySelectorAll(".menu__addtocart");
  let savedCart = cartIds;
  console.log(cartIds);
  //savedCart = savedCart?.split(",");
  menuItemsVeg.addEventListener("click", function (e) {
    addtocartbtn = e.target.closest(".menu__addtocart");
    if (!addtocartbtn) return;
    addToCart(
      parseInt(addtocartbtn.dataset.id),
      parseInt(addtocartbtn.dataset.cost)
    );
  });
  savedCart = savedCart?.map((j) => parseInt(j));
  let images = document.querySelectorAll(".menu__details__img");
  console.log(savedCart);
  for (let i of restrodetails[restaurantIndex].menuItems) {
    console.log(i, i.id);
    if (savedCart?.includes(i.id)) {
      images[cartbtns.length - i.id].insertAdjacentHTML(
        "afterend",
        `<i class="fa fa-shopping-cart"></i>`
      );
      cartbtns[cartbtns.length - i.id].innerHTML = "Remove from Cart";
    }
    //addtocartbtn.innerHTML = "Add to Cart";
  }
}
//Display non veg menu
function displayNonVeg() {
  cleardivs();
  menuNonVeg.classList.add("menu--active");
  menuVeg.classList.contains("menu--active") &&
    menuVeg.classList.remove("menu--active");
  for (let i of restrodetails[restaurantIndex].menuItems) {
    if (i.category === "Non Veg") {
      console.log("in if");
      menuItemsNonVeg.insertAdjacentHTML(
        "afterbegin",
        `<div class="menu__lists"><div class="menu__details"><img class="menu__details__img" src="${
          i.image
        }" alt="${
          i.name
        } Image"/><div class="menu__text"><h3 class="menu__text__h3">${i.name.toUpperCase()}</h3><h4 class="menu__text__h4">Price: <i class="fa fa-rupee"></i>${
          i.price
        }/-</h4><p class="menu__text__p">${
          i.description
        }</p><h4>Cuisine: <span>${
          i.cuisine_name
        }</span></h4><h4>Ingredients: <span>${i.consistsOf.join(
          ", "
        )}</span></h4><h4>Consumable for: <span>${
          i.consumableFor
        }</span></h4><h5>Rated ${
          i.rating
        } out of 5</h5><div class="menu__buttons"><a data-id="${
          i.id
        }" class="menu__ordernow" href="placeOrder.html">Order Now</a><a data-id="${
          i.id
        }" data-cost="${
          i.price
        }" class="menu__addtocart">Add to Cart</a></div></div></div></div>`
      );
    }
  }
  let addtocartbtn;
  let cartbtns = document.querySelectorAll(".menu__addtocart");
  let savedCart = cartIds;
  console.log(cartIds);
  //savedCart = savedCart?.split(",");
  menuItemsVeg.addEventListener("click", function (e) {
    addtocartbtn = e.target.closest(".menu__addtocart");
    if (!addtocartbtn) return;
    addToCart(
      parseInt(addtocartbtn.dataset.id),
      parseInt(addtocartbtn.dataset.cost)
    );
  });
  savedCart = savedCart?.map((j) => parseInt(j));
  console.log(savedCart);
  for (let i of restrodetails[restaurantIndex].menuItems) {
    if (savedCart?.includes(i.id)) {
      cartbtns[cartbtns.length - i.id].innerHTML = "Remove from Cart";
    }
    //addtocartbtn.innerHTML = "Add to Cart";
  }
}
// adding items to cart
function addToCart(id, price) {
  console.log(id);
  let cartbtns = document.querySelectorAll(".menu__addtocart");
  let images = document.querySelectorAll(".menu__details__img");
  console.log(cartbtns);
  console.log(cartIds);
  if (cartIds.includes(id)) {
    cartbtns[cartbtns.length - id].textContent = "Add to cart";
    images[cartbtns.length - id].nextSibling.remove();
    console.log(cartbtns);
    cartIds.splice(cartIds.indexOf(id), 1);
    cartPrice.splice(cartIds.indexOf(id), 1);
    console.log(cartIds);
    firebase
      .database()
      .ref(`/admin/userDetails/${userIndex}/cartItems/`)
      .set(cartIds)
      .then(() => alert("Item Removed from Cart"));
  } else {
    cartIds.push(id);

    cartPrice.push(price);
    console.log(cartPrice);
    images[cartbtns.length - id].insertAdjacentHTML(
      "afterend",
      `<i class="fa fa-shopping-cart"></i>`
    );
    cartbtns[cartbtns.length - id].textContent = "Remove from Cart";
    firebase
      .database()
      .ref(`/admin/userDetails/${userIndex}/cartItems/`)
      .set(cartIds)
      .then(() => {
        firebase
          .database()
          .ref(`/admin/userDetails/${userIndex}/cartPrice/`)
          .set(cartPrice)
          .then(() => {
            firebase
              .database()
              .ref(`/admin/userDetails/${userIndex}/cartRestaurantIndex/`)
              .set(cartRestaurantIndex)
              .then(() => alert("Item Added to Cart"));
          });
      });
    console.log(cartbtns);
    console.log(cartIds);
  }
}
