import { fabric } from "fabric";
let chair = new fabric.Rect({
  fill: "brown",
  width: 15,
  height: 15,
});
let rect = new fabric.Rect({
  left: 0,
  top: 0,
  fill: "red",
  width: 50,
  height: 50,
});

let canvas = new fabric.Canvas("canvas");
function run() {
  //   canvas.add(smallrect);
  //   canvas.add(mediumrect);
  //   canvas.add(largerect);
  //   canvas.add(chair);
  canvas.on("mouse:up", function (options) {
    if (!options.target) return;
    console.log(options.target.get("id"));
    console.log("Event mouse:up Triggered");
  });

  //canvas.setDimensions({ width: "100%", height: "30rem" }, { cssOnly: true });
}

run();

let admindetails;
let viewPreviousTables = document.querySelector(".view-previous-tables");
let viewPreviousOrders = document.querySelector(".view-previous-orders");
let pending = document.querySelector(".pending");
let activeList = document.querySelector(".active__list");
let active = document.querySelector(".active");
let ordersList = document.querySelector(".ordered__list");
let ready = document.querySelector(".ready");
let readyList = document.querySelector(".ready__list");
// console.log(parseInt(sessionStorage.getItem("restaurantIndex")));
console.log(sessionStorage.getItem("managerId"));
let restaurantIndex = parseInt(
  sessionStorage.getItem("restaurantIndex") ??
    parseInt(sessionStorage.getItem("managerId")) - 1
);

console.log(restaurantIndex);
let reservations;
let bookedTables;
let managerId = parseInt(sessionStorage.getItem("managerId"));
console.log(managerId);
let xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://usability1-83c27-default-rtdb.firebaseio.com/admin.json",
  true
);
xhr.responseType = "text";
xhr.send();
xhr.onload = function () {
  console.log("sts" + xhr.status);
  if (xhr.status === 200) {
    admindetails = JSON.parse(xhr.responseText);
    console.log(admindetails);

    canvas.loadFromJSON(admindetails.canvas[restaurantIndex]);
    reservations = admindetails.reservations[restaurantIndex] || [];
    bookedTables = admindetails.bookedTables[restaurantIndex] || [];
    viewOnlineOrders();
    viewFinishedOrders();
    viewPendingTables();
    viewActiveTables();
  }
  // document.querySelector(".tenor-gif-embed").classList.add("hidden");
};
window.addEventListener("DOMContentLoaded", function (e) {
  console.log(document.getElementsByClassName("canvas-container"));
  document.getElementsByClassName("canvas-container")[0].style.width = "100%";
  document.getElementsByClassName("canvas-container")[0].style.height = "21rem";
});
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
let activeOrders;
let activeUser;

viewPreviousTables.addEventListener("click", function (e) {
  e.preventDefault();
  // active.classList.contains("hidden") && active.classList.remove("hidden");
  // active.classList.contains("hidden") || active.classList.add("hidden");
  active.classList.toggle("hidden");
});
viewPreviousOrders.addEventListener("click", function (e) {
  e.preventDefault();
  ready.classList.toggle("hidden");
});
function viewFinishedOrders() {
  activeOrders = admindetails.ordersList || [];
  let count = 0;
  for (let i of activeOrders) {
    console.log(i.status);
    if (managerId === i.restaurantId && i.status === "ready") {
      readyList.insertAdjacentHTML(
        "afterbegin",
        `<div class="ordered__list__item"><div><h4>Ordered by: </h4><span>${i.name.toUpperCase()}</span><h4>Confirm ID: </h4><span>${
          i.confId
        }</span><h4>Order Status: </h4><span>${i.status.toUpperCase()}</span><h4>Bill Amount: </h4><span>${
          i.price
        }/-</span></div><div><h4>Items: </h4><span>${i.items?.join(
          ", "
        )}</span><h4>Order Type: </h4><span>${i.orderType.toUpperCase()}</span</div></div>`
      );
    } else {
      count++;
    }
  }
  if (count === activeOrders.length) {
    readyList.insertAdjacentHTML(
      "afterbegin",
      `<div class="no-pending-orders">You have no Pending Orders</div>`
    );
    return;
  }
}

function viewOnlineOrders() {
  activeOrders = admindetails.ordersList || [];
  let count = 0;
  for (let i of activeOrders) {
    if (managerId === i.restaurantId && i.status === "ordered") {
      ordersList.insertAdjacentHTML(
        "afterbegin",
        `<div class="ordered__list__item"><div><h4>Ordered by: </h4><span>${i.name.toUpperCase()}</span><h4>Confirm ID: </h4><span>${
          i.confId
        }</span><h4>Order Status: </h4><span>${i.status.toUpperCase()}</span><h4>Bill Amount: </h4><span>${
          i.price
        }/-</span></div><div><h4>Items: </h4><span>${i.items?.join(
          ", "
        )}</span><h4>Order Type: </h4><span>${i.orderType.toUpperCase()}</span><button class="change-status" data-id="${
          i.confId
        }">READY</button></div></div>`
      );
    } else {
      count++;
    }
  }
  if (count === activeOrders.length) {
    ordersList.insertAdjacentHTML(
      "afterbegin",
      `<div class="no-pending-orders">You have no Pending Orders</div>`
    );
    return;
  }
}
ordersList.addEventListener("click", function (e) {
  e.preventDefault();
  let readybtn = e.target.closest(".change-status");
  if (!readybtn) return;
  changeOrderStatus(parseInt(readybtn.dataset.id));
});
function changeOrderStatus(confNumber) {
  let ind1, ind2, ind3, order1, order2;
  console.log(activeOrders);
  for (let i of activeOrders) {
    if (i.confId === confNumber) {
      order1 = i;
      i.status = "ready";
      activeUser = i.name;
      ind1 = activeOrders.indexOf(i);
      break;
    }
  }
  for (let i of admindetails.userDetails) {
    console.log(i.name, activeUser);
    if (i.username === activeUser) {
      ind2 = admindetails.userDetails.indexOf(i);

      for (let j of i.placedOrders) {
        if (j?.confId === confNumber) {
          order2 = j;
          j.status = "ready";
          ind3 = i.placedOrders.indexOf(j);
          break;
        }
      }
      break;
    }
  }
  console.log(ind2, ind1, ind3);
  console.log(order2, order1);
  firebase
    .database()
    .ref(`/admin/ordersList/${ind1}`)
    .set(order1)
    .then(() => {
      firebase
        .database()
        .ref(`/admin/userDetails/${ind2}/placedOrders/${ind3}`)
        .set(order2)
        .then(() => alert("Status Updated"));
    });
}
function viewPendingTables() {
  if (!bookedTables.length) {
    pending.insertAdjacentHTML(
      "afterbegin",
      `<div class="no-pending-orders">You have no Pending Orders</div>`
    );
    return;
  }
  let count = 0;
  for (let i of bookedTables) {
    console.log(i.date, i.time);
    let dt = i.date.split("-");
    let timestamp = new Date(
      parseInt(dt[0]),
      parseInt(dt[1]),
      parseInt(dt[2]),
      parseInt(i.time)
    );
    console.log(timestamp, timestamp.getTime() < Date.now());
    if (Date.now() > timestamp) {
      if (managerId === i.restaurantId && i.status === "pending") {
        pending.insertAdjacentHTML(
          "afterbegin",
          `<div class="prev-orders__list"><div class="prev-orders__item"><div class="prev-orders__left"><h3>Order Summary</h3><h4>Booking ID: <span>${
            i.bookingID
          }</span></h4><h4>Guest Count <span>${
            i.guests
          }</span></h4><h4>Booking Date <span>${
            i.date
          }</span></h4><h4>Booking Time <span>${
            i.time
          }</span></h4><h4>Booked By <span>${
            i.reservedBy
          }</span></h4><h4>Table Number <span>${
            i.id
          }</span></h4></div><div class="prev-orders__right"><h3>Guest Details</h3><h4>Booking Name: <span>${i.name.toUpperCase()}</span></h4><h4>Contact: <span>${
            i.contact
          }</span></h4><h4>Email address: <span>${
            i.email
          }</span></h4><h4>Booking Status: <span>${
            i.status
          }</span></h4><div class="prev-orders__btns"><button class="approve-reservation" data-id="${
            i.bookingID
          }">APPROVE</button><button>REJECT</button></div></div></div></div>`
          // <button class="approve-reservation" data-id="${
          //   i.bookingID
          // }">APPROVE</button><button>REJECT</button></div></div>
        );
      }
    } else {
      i.status = "rejected";
      count++;
    }
  }
  if (count === bookedTables.length) {
    pending.insertAdjacentHTML(
      "afterbegin",
      `<div class="no-pending-orders">You have no Pending Orders</div>`
    );
    return;
  }
  console.log("dtfykul");
  console.log(bookedTables);
  firebase
    .database()
    .ref(`/admin/bookedTables/${restaurantIndex}/`)
    .set(bookedTables)
    .then(() => {
      location.reload();
    });
}
pending.addEventListener("click", function (e) {
  let approvedbtn = e.target.closest(".approve-reservation");
  if (!approvedbtn) return;
  approveReservation(parseInt(approvedbtn.dataset.id));
});

function viewActiveTables() {
  if (!reservations.length) {
    activeList.insertAdjacentHTML(
      "afterbegin",
      `<div class="no-pending-orders">You have no Pending Orders</div>`
    );
    return;
  }
  for (let i of reservations) {
    //console.log(admindetails.reservations);
    if (managerId === i.restaurantId && i.status !== "pending") {
      activeList.insertAdjacentHTML(
        "afterbegin",
        `<div class="prev-orders__list"><div class="prev-orders__item"><div class="prev-orders__left"><h3>Order Summary</h3><h4>Booking ID: <span>${
          i.bookingID
        }</span></h4><h4>Guest Count <span>${
          i.guests
        }</span></h4><h4>Booking Date <span>${
          i.date
        }</span></h4><h4>Booking Time <span>${
          i.time
        }</span></h4><h4>Booked By <span>${
          i.reservedBy
        }</span></h4><h4>Table Number <span>${
          i.id
        }</span></h4></div><div class="prev-orders__right"><h3>Guest Details</h3><h4>Booking Name: <span>${i.name.toUpperCase()}</span></h4><h4>Contact: <span>${
          i.contact
        }</span></h4><h4>Email address: <span>${
          i.email
        }</span></h4><h4>Booking Status: <span>${
          i.status
        }</span></h4><div class="prev-orders__btns"></div></div></div></div>`
      );
    }
  }
}
function approveReservation(num) {
  let index, index2;
  for (let i of bookedTables) {
    console.log(i.bookingID);
    if (num === i.bookingID) {
      index = bookedTables.indexOf(i);
    }
  }
  for (let i of reservations) {
    if (num === i.bookingID) index2 = reservations.indexOf(i);
  }

  bookedTables[index].status = "Confirmed";
  reservations[index2].status = "Confirmed";
  firebase
    .database()
    .ref(`/admin/bookedTables/${restaurantIndex}/${index}/`)
    .set(bookedTables[index])
    .then(() => {
      firebase
        .database()
        .ref(`/admin/reservations/${restaurantIndex}/${index2}/`)
        .set(reservations[index2])
        .then(() => alert("Status Updated"));
    });
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let tableslist;
let newTable;
document
  .querySelector(".dine-in__submit")
  .addEventListener("click", function (e) {
    e.preventDefault();
    tableslist = admindetails.tables[restaurantIndex] || [];
    newTable = {
      id: tableslist.length,
      capacity: parseInt(document.querySelector(".dine-in__capacity").value),
      uniq: getRandomInt(100000, 900000),
    };
    let uniqIds = [];
    for (let i of tableslist) {
      uniqIds.push(i.uniq);
    }
    while (uniqIds.includes(newTable.uniq)) {
      newTable.uniq = getRandomInt(100000, 900000);
    }
    let capacity = document.querySelector(".dine-in__capacity").value;
    //canvas.add(rect);
    let text = new fabric.IText(String(capacity), {
      fill: "black",
      top: 25,
      left: 25,
      fontSize: 16,
      fontFamily: "Poppins",
      textAlign: "center",
      originX: "center",
      originY: "center",
    });
    text.id = tableslist.length;
    // Render the Text on Canvas

    //canvas.add(text);
    rect.id = newTable.uniq;
    let objs = [rect, text];
    var alltogetherObj = new fabric.Group(objs, {
      // top: 200,
      // left: 250,
      selectable: true,
      snapAngle: 45,
      centeredRotation: true,
      id: newTable.uniq,
    });
    canvas.add(alltogetherObj);
    console.log(alltogetherObj);
    while (capacity--) {
      chair.id = newTable.uniq + "-chair-" + capacity;
      let chair1 = new fabric.Rect(chair);
      canvas.add(chair1);
    }
    console.log(chair.get("id"));
    firebase
      .database()
      .ref(`/admin/tables/${restaurantIndex}/${tableslist.length}/`)
      .set(newTable)
      .then(() => alert("added"));
  });
document.querySelector(".canvas__save").addEventListener("click", function (e) {
  e.preventDefault();
  let canvasjson = canvas.toJSON(["id"]);
  firebase
    .database()
    .ref(`/admin/tables/${restaurantIndex}/${tableslist.length}`)
    .set(newTable)
    .then(() =>
      firebase
        .database()
        .ref(`/admin/canvas/${restaurantIndex}`)
        .set(canvasjson)
        .then(() => {
          alert("saved");
          location.reload();
        })
    );
});
document.querySelector(".canvas__del").addEventListener("click", function (e) {
  e.preventDefault();
  tableslist = admindetails.tables[restaurantIndex] || [];
  console.log(canvas.getActiveObject().id);
  let currId = canvas.getActiveObject().id;

  for (let i of canvas.getObjects()) {
    console.log(i.id);
    if (parseInt(i.id) === currId) {
      console.log(i);
      canvas.remove(i);
    }
  }
  let index;
  for (let i of tableslist) {
    if (i.uniq === currId) {
      index = tableslist.indexOf(i);
    }
  }
  tableslist.splice(index, 1);
  canvas.remove(canvas.getActiveObject());
  let canvasjson = canvas.toJSON();
  firebase
    .database()
    .ref(`/admin/tables/${restaurantIndex}/${tableslist}`)
    .set(tableslist)
    .then(() =>
      firebase
        .database()
        .ref(`/admin/canvas/${restaurantIndex}`)
        .set(canvasjson)
        .then(() => alert("added"))
    );
});
