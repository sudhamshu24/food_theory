let restrodetails;
let prices = [];
let subtotalAmount = document.querySelector(".carttotal__price__subtotal");
let totalAmount = document.querySelector(".carttotal__amount__price");
subtotalAmount.innerHTML = parseInt(0);
totalAmount.innerHTML = parseInt(0);
let cartItemsList = document.querySelector(".cartitems__list");
let savedCart;
let savedCartPrices;
let amount;
let userOrders;
let managerOrders;
console.log(savedCart);
let restaurantIndex = parseInt(
  sessionStorage.getItem("restaurantIndex") ??
    parseInt(sessionStorage.getItem("managerId")) - 1
);

console.log(restaurantIndex);
let cartRestaurantIndex;
// savedCart && (savedCart = savedCart.split(","));
// savedCart = savedCart.map((i) => parseInt(i));
let xhr = new XMLHttpRequest();
let xhr1 = new XMLHttpRequest();
let sessionUser;
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
    console.log(restrodetails);
  }
  xhr1.open(
    "GET",
    "https://usability1-83c27-default-rtdb.firebaseio.com/admin.json",
    true
  );
  xhr1.responseType = "text";
  xhr1.send();
  xhr1.onload = function () {
    console.log("sts" + xhr1.status);
    if (xhr1.status === 200) {
      adminDetails = JSON.parse(xhr1.responseText);
      console.log(adminDetails);
    }
    sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
    sessionUserName = sessionUser.username;
    for (let i of adminDetails.userDetails) {
      if (i.username.toLowerCase() === sessionUserName.toLowerCase()) {
        userInd = i;
        userIndex = adminDetails.userDetails.indexOf(i);
        break;
      }
    }
    console.log(userInd);
    savedCart = userInd.cartItems || [];
    savedCartPrices = userInd.cartPrice || [];
    userOrders = userInd.placedOrders || [];
    managerOrders = adminDetails.ordersList || [];
    if (savedCart.length) {
      cartRestaurantIndex = userInd.cartRestaurantIndex;
    }
    console.log(userInd.username);
    console.log(savedCart);
    displayCart();
    amount = (accumulator, currentValue) => accumulator + currentValue;
    if (savedCart.length) {
      subtotalAmount.innerHTML = savedCartPrices?.reduce(amount);
      totalAmount.innerHTML = savedCartPrices?.reduce(amount) + 120;
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
// Display Cart functionality
function displayCart() {
  if (!savedCart) {
    alert("Your Cart is Empty");
    window.location.href = "./order.html";
  } else {
    console.log(savedCart);
    //savedCart = savedCart.split(",");
    savedCart = savedCart.map((j) => parseInt(j));
    for (let i of savedCart) {
      {
        cartItemsList.insertAdjacentHTML(
          "afterbegin",
          `<div class="cartitems__list__details"><img src="${
            restrodetails[restaurantIndex].menuItems[i - 1].image
          }" alt="${
            restrodetails[restaurantIndex].menuItems[i - 1].name
          } image"/><div class="cartitems__list__desc"><h3 class="cartitems__list__desc__h3">${restrodetails[
            restaurantIndex
          ].menuItems[
            i - 1
          ].name.toUpperCase()}</h3><h4 class="cartitems__list__desc__h4">Price: <i class="fa fa-rupee"></i>${
            restrodetails[restaurantIndex].menuItems[i - 1].price
          }/-</h4><p class="cartitems__list__desc__p">${
            restrodetails[restaurantIndex].menuItems[i - 1].description
          }</p><h4>Cuisine: <span>${
            restrodetails[restaurantIndex].menuItems[i - 1].cuisine_name
          }</span></h4><h4>Consumable for: <span>${
            restrodetails[restaurantIndex].menuItems[i - 1].consumableFor
          }</span></h4><h5>Rated ${
            restrodetails[restaurantIndex].menuItems[i - 1].rating
          } out of 5</h5><div>Quantity: <button class="minus" data-cost="${
            restrodetails[restaurantIndex].menuItems[i - 1].price
          }" data-id="${
            restrodetails[restaurantIndex].menuItems[i - 1].id
          }">-</button><span class="quantity" data-id="${
            restrodetails[restaurantIndex].menuItems[i - 1].id
          }">1</span><button class="plus" data-cost="${
            restrodetails[restaurantIndex].menuItems[i - 1].price
          }" data-id="${
            restrodetails[restaurantIndex].menuItems[i - 1].id
          }">+</button></div><div class="cartitems__list__desc__buttons"><button class="remove-btn" data-id="${
            restrodetails[restaurantIndex].menuItems[i - 1].id
          }"><i class="fa fa-trash"></i></button></div></div></div>`
        );
      }
    }
  }
  // Event deligation for buttons
  cartItemsList.addEventListener("click", function (e) {
    // let buynowbtn = e.target.closest(".buy-now-btn");
    let removebtn = e.target.closest(".remove-btn");
    let plus = e.target.closest(".plus");
    let minus = e.target.closest(".minus");
    if (!removebtn && !plus && !minus) return;
    // if (buynowbtn)
    //   buyNow(
    //     buynowbtn.dataset.cost,
    //     buynowbtn,
    //     restrodetails[restaurantIndex].menuItems[parseInt(buynowbtn.dataset.id) - 1]
    //   );
    if (removebtn) removedBtn(parseInt(removebtn.dataset.id));
    if (plus)
      plusQuant(parseInt(plus.dataset.id), plus, parseInt(plus.dataset.cost));
    if (minus)
      minusQuant(
        parseInt(minus.dataset.id),
        minus,
        parseInt(minus.dataset.cost)
      );
  });
}
//Buy now Functionality
// function buyNow(amt, btn, menuItem) {
//   console.log(menuItem);
//   let quantity = parseInt(
//     btn.parentNode.parentNode.querySelector(".quantity").textContent
//   );
//   amt *= quantity;
//   let prevbtn = btn.previousSibling;
//   prevbtn.classList.remove("disabled-btn");

//   prices.push(parseInt(amt));
//   amount = (accumulator, currentValue) => accumulator + currentValue;
//   subtotalAmount.innerHTML = prices.reduce(amount);
//   totalAmount.innerHTML = prices.reduce(amount) + 120;
// }
//Removing Items from cart
function removedBtn(id) {
  console.log(savedCartPrices, savedCart);
  let ind = savedCart.indexOf(id);
  console.log(ind);
  //savedCartPrices.splice(ind, 1);
  savedCart.splice(ind, 1);
  let newsavedCartPrices = [];
  for (let i = 0; i < savedCartPrices.length; i++) {
    if (i !== ind) newsavedCartPrices.push(savedCartPrices[i]);
  }
  console.log(newsavedCartPrices);
  //console.log(savedCart.indexOf(id));

  //sessionStorage.setItem("CartItems", savedCart);
  console.log(savedCartPrices, savedCart);
  firebase
    .database()
    .ref(`/admin/userDetails/${userIndex}/cartItems/`)
    .set(savedCart)
    .then(() => {
      firebase
        .database()
        .ref(`/admin/userDetails/${userIndex}/cartPrice/`)
        .set(newsavedCartPrices)
        .then(() => location.reload());
    });
}
//Increasing Quantity
function plusQuant(id, plus, price) {
  let inc = parseInt(plus.previousSibling.textContent) + 1;
  plus.previousSibling.textContent = inc;
  calculateTotal(id, inc, price);
}
//Decreasing Quantity
function minusQuant(id, minus, price) {
  console.log(id);
  let dec = parseInt(minus.nextSibling.textContent) - 1;
  minus.nextSibling.textContent = dec;
  if (dec === 0) removedBtn(id);
  calculateTotal(id, dec, price);
}
function calculateTotal(id, value, price) {
  let index = savedCart.indexOf(id);
  savedCartPrices[index] = value * price;
  amount = (accumulator, currentValue) => accumulator + currentValue;
  subtotalAmount.innerHTML = savedCartPrices.reduce(amount);
  totalAmount.innerHTML = savedCartPrices.reduce(amount) + 120;
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let lat, lng;
document.querySelector(".order-type").addEventListener("input", function (e) {
  e.preventDefault();
  let options = {
    enableHighAccuracy: true, // Enable high accuracy, if available
    timeout: 5000, // 10 seconds
    maximumAge: 300000, // Only accept cached positions whose age is not greater than 5 minutes
  };
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      displayPosition,
      undefined,
      options
    );
  }
});
function displayPosition(pos) {
  lat = pos.coords.latitude;
  lng = pos.coords.longitude;
}

//Checking login before proceeding next
document
  .querySelector(".carttotal__checkout")
  .addEventListener("click", function (e) {
    e.preventDefault();
    //loc();
    //if (loc()) {
    // let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
    // if (sessionUser) {
    //   window.location.href = "./placeOrder.html";
    // } else {
    //   alert("You need to be logged in first");
    let placeYourOrder = document.querySelector(
      'input[name="pickup-deliver"]:checked'
    );
    if (!placeYourOrder) {
      alert("Please Select Order Type");
      return;
    }
    let specialRequest = document.querySelector(".special-request").value;
    console.log(specialRequest);
    //if ((placeYourOrder.id = "pickup")) {
    let foodNames = [];
    savedCart.forEach((element) => {
      foodNames.push(
        restrodetails[restaurantIndex].menuItems[element - 1].name
      );
    });
    console.log(totalAmount.innerHTML);
    let orderobj = {
      name: sessionUserName,
      price: totalAmount.innerHTML,
      time: new Date().toISOString(),
      confId: getRandomInt(100000, 900000),
      orderType: placeYourOrder.id,
      status: "ordered",
      address: [lng, lat],
      timestamp: Date.now(),
      restaurantName: restrodetails[restaurantIndex].name,
      restaurantAddress: restrodetails[restaurantIndex].location,
      restaurantId: restrodetails[restaurantIndex].id,
      items: foodNames,
    };

    let uniqIds = [];
    for (let i of managerOrders) {
      uniqIds.push(i.confId);
    }
    while (uniqIds.includes(orderobj.confId)) {
      newTable.uniq = getRandomInt(100000, 900000);
    }
    managerOrders.push(orderobj);
    userOrders.push(orderobj);
    sessionStorage.setItem("currentOrderID", orderobj.confId);
    sessionUser.placedOrders = userOrders;
    console.log(sessionUser);
    firebase
      .database()
      .ref(`/admin/userDetails/${userIndex}/`)
      .set(sessionUser)
      .then(() => {
        firebase
          .database()
          .ref(`/admin/ordersList/`)
          .set(managerOrders)
          .then(() => {
            window.location.href = "./placeOrder.html";
          });
      });
    //}
  });
