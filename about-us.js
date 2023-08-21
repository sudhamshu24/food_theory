let reviewsList = document.querySelector(".reviews__list");
let restrodetails;
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
    displayReviews();
  }
};
function displayReviews() {
  for (let i of restrodetails[restaurantIndex].reviews) {
    document
      .querySelector(".reviews__customer")
      .insertAdjacentHTML("afterbegin", ``);
    reviewsList.insertAdjacentHTML(
      "beforeend",
      `<div class = "reviews__item"><h3>${i.name}</h3><h4>Posted On: ${i.date}</h4><div class="reviews__desc"><div class="reviews__img"><img src = "assets/human-images-2.jpg" alt = "${i.name} photo"></div><p>${i.comments}</p></div></div>Rating given: `
    );
    //console.log(restrodetails[restaurantIndex].reviews[i]);
    for (
      let j = 0;
      j <
      restrodetails[restaurantIndex].reviews[
        restrodetails[restaurantIndex].reviews.indexOf(i)
      ].rating;
      j++
    ) {
      reviewsList.insertAdjacentHTML(
        "beforeend",
        `<span class = "closed-star"><i class="fa fa-star"></i></span>`
      );
    }
    for (
      let j = 0;
      j <
      5 -
        restrodetails[restaurantIndex].reviews[
          restrodetails[restaurantIndex].reviews.indexOf(i)
        ].rating;
      j++
    ) {
      reviewsList.insertAdjacentHTML(
        "beforeend",
        `<span class="open-star"><i class="fa fa-star"></i></span>`
      );
    }
  }
}
