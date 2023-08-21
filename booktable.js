import { fabric } from "fabric";
let admindetails;
let reservations;
let bookedTables;
let bookedSlotTime;
let canvas = new fabric.Canvas("canvas");
//let bookedTables = [];
let restaurantIndex = parseInt(
  sessionStorage.getItem("restaurantIndex") ??
    parseInt(sessionStorage.getItem("managerId")) - 1
);

console.log(restaurantIndex);
let restaurantname = sessionStorage.getItem("restaurantName");
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
    reservations = admindetails.reservations[restaurantIndex] || [];
    bookedTables = admindetails.bookedTables[restaurantIndex] || [];
    displayPreviousOrders();
    displayImgMap();
  }
};
window.addEventListener("DOMContentLoaded", function (e) {
  console.log(document.getElementsByClassName("canvas-container"));
  document.getElementsByClassName("canvas-container")[0].style.width = "100%";
  document.getElementsByClassName("canvas-container")[0].style.height = "20rem";
  // document
  //   .getElementsByClassName("canvas-container")[0]
  //   .classList.add("hidden");
});
function displayImgMap() {
  canvas.loadFromJSON(admindetails.canvas[restaurantIndex]);
  canvas.getObjects().map((o) => {
    o.hasControls = false;
    o.lockMovementX = true;
    o.lockMovementY = true;
    if (o.type === "chair") {
      o.selectable = false;
    }
    o.borderColor = "#38A62E";
    o.borderScaleFactor = 2.5;
  });
}
document.querySelector("canvas").addEventListener("click", function (o) {
  // o.hasControls = false;
  // o.lockMovementX = true;
  // o.lockMovementY = true;
  // o.selectable = false;
});
let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (!sessionUser) {
  alert("Please Login First");
  window.location.href = "./login.html";
}
console.log(sessionUser.username);
let formdate = document.querySelector(".reserve__form__date");
let formselect = document.querySelector(".reserve__form__select");
let formguests = document.querySelector(".reserve__form__guests");
let formname = document.querySelector(".reserve__form__name");
let formcontact = document.querySelector(".reserve__form__contact");
let formemail = document.querySelector(".reserve__form__email");
var today = new Date();
formdate.min =
  today.getFullYear() +
  "-" +
  String(today.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(today.getDate()).padStart(2, "0");
formdate.addEventListener("input", function (e) {
  e.preventDefault();
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + "-" + mm + "-" + dd;

  console.log(today);
  console.log(formdate.value);
  if (today === formdate.value) {
    let hrs = new Date();
    hrs = hrs.getHours();
    let i = parseInt(hrs) + 1;
    if (i > 12) {
      while (formselect.firstChild)
        formselect.removeChild(formselect.lastChild);
      console.log(i);
      while (i < 22) {
        console.log(i);
        formselect.insertAdjacentHTML(
          "beforeend",
          `<option value="${i - 12}pm">${i - 12}PM</option>`
        );

        i++;
        console.log(i);
      }
    }
  }
});
document
  .querySelector(".reserve__form__submit")
  .addEventListener("click", function (e) {
    e.preventDefault();
    // document.querySelector(".canvas-colors").classList.remove("hidden");
    // document.querySelector(".canvas-container").classList.remove("hidden");
    // document.querySelector("#canvas").classList.remove("hidden");
    let table = {
      date: formdate.value,
      time: formselect.value,
      guests: formguests.value,
      name: formname.value,
      contact: formcontact.value,
      email: formemail.value,
      bookingID: Date.now() % 1000000,
      timestamp: Date.now(),
      restaurantName: restaurantname,
      restaurantId: restaurantIndex + 1,
    };
    console.log(table);
    bookTable(table);
  });

// Your web app's Firebase configuration
//var firebaseConfig = {
//  apiKey: "AIzaSyAYausF-BUkQe_ahtMrPH_1VoM6CFdwPw0",
//  authDomain: "restaurants-302910.firebaseapp.com",
// databaseURL: "https://restaurants-302910-default-rtdb.firebaseio.com",
 // projectId: "restaurants-302910",
//  storageBucket: "restaurants-302910.appspot.com",
//  messagingSenderId: "997056030630",
//  appId: "1:997056030630:web:66ff5353185967e7435167",
//};

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
let tablenumbers = [];
let tables;
let tableids;
let result,
  flag = false;
let tbfound = false;
//booking table functionality
function bookTable(table) {
  console.log(table);
  tables = admindetails.tables[restaurantIndex] || [];
  console.log(tables);
  result = [];
  tableids = [];
  //getting all table IDs
  tables.forEach((i) => {
    if (i.capacity === parseInt(table.guests)) tableids.push(i.uniq);
  });
  console.log(tableids);
  //tablenumbers has only those ids with matched date and time
  if (reservations.length > 0) {
    for (let j of reservations) {
      if (table.date === j.date && table.time === j.time) {
        tablenumbers.push(j.id);
      }
    }
    console.log(tablenumbers);
    for (let j of reservations) {
      if (table.date === j.date && table.time === j.time) {
        for (let i of tableids) {
          if (tablenumbers.includes(i)) {
            if (!result.length) {
              console.log(tableids.indexOf(i));
              flag = true;
            }
          } else {
            // table.id = i;
            //Firebase
            tbfound = false;
            flag = false;
            console.log(tableids.indexOf(i));
            result.push(i);
            // break;
          }
          //if (!flag) break;
        }
        // }
      } else {
        //result = tableids;
        tbfound = true;
      }
    }
  } else {
    result = tableids;
  }
  if (tbfound && !result.length) {
    result = tableids;
  }

  console.log(flag);
  console.log(result);
  if (flag || result.length === 0) {
    alert("No slots are available for that particular date and slot");
    // document.querySelector(".canvas-colors").classList.add("hidden");
    // document.querySelector(".canvas-container").classList.add("hidden");
    // document.querySelector("#canvas").classList.add("hidden");
  } else {
    table.id = result[0];
    // console.log(table.id);
    table.reservedBy = sessionUser.username;

    console.log(result);
    for (let i of canvas.getObjects()) {
      if (i.type === "group" && result.includes(i.id)) {
        console.log(i.id);
        i._objects[0].set("fill", "blue");
      }
    }
    canvas.renderAll();
    //bookedSlotTime = bookedSlotTime.getTime();
    //console.log(bookedSlotTime, bookedDate, bookedTime);
    table.status = "pending";
    reservations.push(table);
    bookedTables.push(table);

    canvas.on("mouse:up", function (e) {
      console.log(e.target);
      table.id = e.target.id;
    });
  }
}
document.querySelector(".select-table").addEventListener("click", function (e) {
  firebase
    .database()
    .ref(`/admin/bookedTables/${restaurantIndex}`)
    .set(bookedTables)
    .then(() => {
      firebase
        .database()
        .ref(`/admin/reservations/${restaurantIndex}`)
        .set(reservations)
        .then(() => {
          alert("Table Reserved Successfully");
        });
    });
});
//displaying previous orders
function displayPreviousOrders() {
  for (let i of bookedTables) {
    if (
      sessionUser.username === i.reservedBy &&
      i.restaurantId === restaurantIndex + 1
    ) {
      insertOrders(i);
    }
  }
}
//inserting orders
function insertOrders(i) {
  document
    .querySelector(".prev-orders")
    .insertAdjacentHTML(
      "afterbegin",
      `<div class="prev-orders__list"><h2>${restaurantname}</h2><div class="prev-orders__item"><div class="prev-orders__left"><h3>Order Summary</h3><h4>Booking ID: <span>${
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
      }</span></h4><div class="prev-orders__btns"><button class="cancel-reservation" data-id="${
        i.bookingID
      }">Cancel Reservation</button><button class="modify-reservation">Modify Reservation</button></div></div></div></div>`
    );
  if (i.status === "Cancelled") {
    document.querySelector(".modify-reservation").classList.add("disabled-btn");
    document.querySelector(".cancel-reservation").classList.add("disabled-btn");
  }
}
// event delegation for orders
document.querySelector(".prev-orders").addEventListener("click", function (e) {
  let cancelbtn = e.target.closest(".cancel-reservation");
  if (!cancelbtn) return;
  cancelReservation(parseInt(cancelbtn.dataset.id));
});
//cancel reservation
function cancelReservation(number) {
  let now = Date.now();
  let index, index2;
  console.log(bookedSlotTime);
  for (let i of bookedTables) {
    console.log(i.bookingID);
    if (number === i.bookingID) {
      index = bookedTables.indexOf(i);
    }
  }
  for (let i of reservations) {
    if (number === i.bookingID) index2 = reservations.indexOf(i);
  }
  let bookedDate = bookedTables[index].date.split("-");
  let bookedTime = parseInt(bookedTables[index].time);
  bookedSlotTime = new Date(
    parseInt(bookedDate[0]),
    parseInt(bookedDate[1]) + 1,
    parseInt(bookedDate[2]),
    bookedTime
  );
  if (bookedSlotTime - now >= 600000) {
    console.log(number);

    console.log(index2);
    reservations.splice(index2, 1);
    console.log(reservations);
    console.log(index);
    bookedTables[index].status = "Cancelled";
    firebase
      .database()
      .ref(`/admin/bookedTables/${restaurantIndex}/${index}/`)
      .set(bookedTables[index])
      .then(() => {
        firebase
          .database()
          .ref(`/admin/reservations/${restaurantIndex}`)
          .set(reservations)
          .then(() => alert("Your order has been cancelled"));
      });
  } else {
    alert("Cannot cancel this reservation");
  }
}
