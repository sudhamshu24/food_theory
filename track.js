document.querySelector(".track__nav").addEventListener("click", function (e) {
  let confId = document.querySelector(".track__inp").value;
  if (String(confId).length != 6) {
    e.preventDefault();
    alert("Please Enter 6 digit Confirmation Number");
  } else {
    sessionStorage.setItem("currentOrderID", confId);
  }
});
