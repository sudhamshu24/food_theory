import "./utilities";
let restrodetails;
let currentUser = {
  username: "",
  password: "",
  designation: "",
};
let userDetails;
let xhr = new XMLHttpRequest();
xhr.open(
  "GET",
  "https://usability1-83c27-default-rtdb.firebaseio.com/admin/userDetails.json",
  true
);
xhr.responseType = "text";
xhr.send();
xhr.onload = function () {
  console.log("sts" + xhr.status);
  if (xhr.status === 200) {
    userDetails = JSON.parse(xhr.responseText);
    //console.log(restrodetails);

    let uname = document.querySelector(".main__user-name");
    let pwd = document.querySelector(".main__password");
    let des = document.querySelector(".designation");
    let sessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
    //if already logged in
    if (sessionUser) {
      document.querySelector(".main__login").classList.add("hidden");
      //console.log(document.querySelector(".container"));
      console.log(sessionUser);
      currentUser = sessionUser;
      console.log(currentUser);
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      document.querySelector(".main__logged-in").classList.remove("hidden");
      userFunc();
    }
    //Submitting form
    document
      .querySelector(".main__user-submit")
      .addEventListener("click", function (e) {
        e.preventDefault();
        console.log(uname.value);
        let ind;
        userDetails.forEach((i) => {
          console.log(i);
          if (i.username === uname.value) {
            ind = userDetails.indexOf(i);
            return ind;
          }
        });
        console.log(ind);

        if (userDetails[ind].password === pwd.value) {
          document.querySelector(".main__login").classList.add("hidden");
          //console.log(document.querySelector(".container"));

          currentUser.username = uname.value;
          currentUser.password = pwd.value;
          currentUser.designation = des.value;
          if (currentUser.designation === "manager") {
            sessionStorage.setItem("managerId", userDetails[ind].managerId);
          }
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
          window.location.href = "./restaurants-list.html";
          userFunc();
          document.querySelector(".main__logged-in").classList.remove("hidden");
        } else {
          alert("Please Enter correct username and password");
          document.querySelector(".menu__password").classList.add("invalid");
        }
      });
  }
};
//Display UserName
function userFunc() {
  console.log(currentUser.username.toUpperCase());
  let login = new Login();
  let log = login.createLogin(currentUser.username);
  console.log(log);
  document.querySelector(
    ".main__logged-in__heading__name"
  ).innerHTML = log.toUpperCase();
}
