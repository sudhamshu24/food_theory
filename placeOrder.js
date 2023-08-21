let lat, lng;
let restrodetails;
let userOrders;
let managerOrders;
let sessionUser;
let sessionUserName;
let userInd;
let userIndex;
let userDetails;
let adminDetails;
let currentOrder;
let restaurantIndex = parseInt(
  sessionStorage.getItem("restaurantIndex") ??
    parseInt(sessionStorage.getItem("managerId")) - 1
);

console.log(restaurantIndex);
let xhr = new XMLHttpRequest();
let xhr1 = new XMLHttpRequest();
let confId = parseInt(sessionStorage.getItem("currentOrderID"));
console.log(confId);
// xhr.open(
//   "GET",
//   "https://restaurants-302910-default-rtdb.firebaseio.com/restaurants.json",
//   true
// );
// xhr.responseType = "text";
// xhr.send();
// xhr.onload = function () {
//   console.log("sts" + xhr.status);
//   if (xhr.status === 200) {
//     restrodetails = JSON.parse(xhr.responseText);
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

  userOrders = userInd.placedOrders || [];
  managerOrders = adminDetails.ordersList || [];
  console.log(userInd.username);
  console.log(userOrders);
  if (userOrders) {
    let count = 0;
    for (element of userOrders) {
      console.log(element);
      if (confId === element?.confId) {
        currentOrder = element;
        document.querySelector(
          ".confirm__orderedby"
        ).innerHTML = userInd.username.toUpperCase();
        document.querySelector(".confirm__amount").innerHTML =
          currentOrder.price;
        document.querySelector(
          ".confirm__status"
        ).innerHTML = currentOrder.status.toUpperCase();
        document.querySelector(
          ".confirm__type"
        ).innerHTML = currentOrder.orderType.toUpperCase();
        document.querySelector(".confirm__id").innerHTML = confId;
        document.querySelector(
          ".confirm__items"
        ).innerHTML = currentOrder.items?.join(", ");
        break;
      } else {
        count++;
      }
    }

    if (count === userOrders.length) {
      alert("Incorrect Confirmation ID");
      window.location.href = "./restaurants-list.html";
    }
  }
  console.log(confId);
  console.log(currentOrder);
  showMap();
};
//   }
// };

const location = function () {
  if (navigator.geolocation) {
    let options = {
      enableHighAccuracy: true, // Enable high accuracy, if available
      timeout: 10000, // 10 seconds
      maximumAge: 300000, // Only accept cached positions whose age is not greater than 5 minutes
    };

    navigator.geolocation.getCurrentPosition(displayPosition);
  } else {
    // displayError("Update your browser to use Geolocation.");
  }
};
//Get current location coordinates
function displayPosition(pos) {
  document.getElementById("timestamp").innerText = new Date(pos.timestamp);
  document.getElementById("lat").innerText = pos.coords.latitude;
  lat = pos.coords.latitude;
  document.getElementById("long").innerText = pos.coords.longitude;
  lng = pos.coords.longitude;
  console.log(lat, lng);
  showMap(lat, lng);
}

function locationError(error) {
  let msg = "";

  console.log("error.message = " + error.message);
  switch (error.code) {
    case error.PERMISSION_DENIED:
      msg = "User does not want to display their location.";
      break;
    case error.POSITION_UNAVAILABLE:
      msg = "Can't determine user's location.";
      break;
    case error.TIMEOUT:
      msg = "The request for geolocation information timed out.";
      break;
    case error.UNKNOWN_ERROR:
      msg = "An unknown error occurred.";
      break;
  }

  displayError(msg);
}

function displayError(msg) {
  let elem = document.getElementById("errorArea");
  elem.classList.remove("d-none");
  elem.innerHTML = msg;
}
mapboxgl.accessToken =
  "pk.eyJ1Ijoic3dhcG5pa2E5OCIsImEiOiJja2tmM3cybW0wcHg3MndxdDRwMHVsd3pvIn0.VmNY-6vcIA6sksGgLzBsbg";
//------------------------------------------------------------------------
function showMap(lat, lng) {
  let start, end;
  let map = new mapboxgl.Map(
    {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location

      center: currentOrder.address, // starting position [lng, lat]
      zoom: 10, // starting zoom
    },
    console.log(lat, lng)
  );
  //   let marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  //   map.addControl(new mapboxgl.NavigationControl());
  //   map.addControl(
  //     new mapboxgl.GeolocateControl({
  //       positionOptions: {
  //         enableHighAccuracy: true,
  //       },
  //       trackUserLocation: true,
  //     })
  //   );
  //}
  //---------------------------------------------------------------------------------
  // let bounds = [
  //   [-123.069003, 45.395273],
  //   [-122.303707, 45.612333],
  // ];
  // map.setMaxBounds(bounds);

  // // initialize the map canvas to interact with later
  // let canvas = map.getCanvasContainer();

  // an arbitrary start will always be the same
  // only the end or destination will change
  if (currentOrder.orderType === "pickup") {
    start = currentOrder.address;
    end = currentOrder.restaurantAddress;
  } else if (currentOrder.orderType === "deliver") {
    end = currentOrder.address;
    start = currentOrder.restaurantAddress;
  }
  // create a function to make a directions request
  // create a function to make a directions request
  function getRoute(en) {
    // make a directions request using driving profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    //let start = [-122.662323, 45.523751];
    let url =
      "https://api.mapbox.com/directions/v5/mapbox/driving/" +
      start[0] +
      "," +
      start[1] +
      ";" +
      en[0] +
      "," +
      en[1] +
      "?steps=true&geometries=geojson&access_token=" +
      mapboxgl.accessToken;

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    let req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.onload = function () {
      let json = JSON.parse(req.response);
      let data = json.routes[0];
      let route = data.geometry.coordinates;
      let geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      // if the route already exists on the map, reset it using setData
      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      } else {
        // otherwise, make a new request
        map.addLayer({
          id: "route",
          type: "line",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: {
                type: "LineString",
                coordinates: geojson,
              },
            },
          },
          layout: {
            "line-join": "round",
            "line-cap": "round",
          },
          paint: {
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
      var coordinates = geojson.geometry.coordinates;

      // Pass the first coordinates in the LineString to `lngLatBounds` &
      // wrap each coordinate pair in `extend` to include them in the bounds
      // result. A variation of this technique could be applied to zooming
      // to the bounds of multiple Points or Polygon geomteries - it just
      // requires wrapping all the coordinates with the extend method.
      var bounds = coordinates.reduce(function (bounds, coord) {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      map.fitBounds(bounds, {
        padding: 20,
      });
      //turn instructions
      console.log(end, arguments[0]);
      if (end === en) {
        let instructions = document.getElementById("instructions");
        let duration = document.querySelector(".duration");
        let steps = data.legs[0].steps;
        if (currentOrder.orderType === "pickup") {
          let tripInstructions = [];
          for (let i = 0; i < steps.length; i++) {
            tripInstructions.push("<br><li>" + steps[i].maneuver.instruction) +
              "</li>";
            instructions.innerHTML = "<h3>DIRECTIONS</h3>" + tripInstructions;
          }
        } else if (currentOrder.orderType === "deliver") {
          instructions.style.display = "none";
        }
        duration.innerHTML =
          "TRIP DURATION: " + Math.floor(data.duration / 60) + " min </span>";
      }
    };
    req.send();
  }

  map.on("load", function () {
    // make an initial directions request that
    // starts and ends at the same location
    getRoute(start);

    // Add starting point to the map
    map.addLayer({
      id: "point",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: start,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#3887be",
      },
    });
    map.addLayer({
      id: "end",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: end,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "#f30000",
      },
    });
    // this is where the code from the next step will go
    getRoute(end);
  });
}
