let lat, lng;
window.onload = function () {
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
function displayPosition(pos) {
  //   document.getElementById("timestamp").innerText = new Date(pos.timestamp);
  //   document.getElementById("lat").innerText = pos.coords.latitude;
  lat = pos.coords.latitude;
  //   document.getElementById("long").innerText = pos.coords.longitude;
  lng = pos.coords.longitude;
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
//Showing map
function showMap(lat, lng) {
  var map = new mapboxgl.Map(
    {
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location

      center: [lng, lat], // starting position [lng, lat]
      zoom: 10, // starting zoom
    },
    console.log(lat, lng)
  );
  var marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(
    new mapboxgl.GeolocateControl({
      fitBoundsOptions: {
        zoom: 13,
      },
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })
  );
  const nav = new mapboxgl.NavigationControl();
  // map.addControl(nav);

  // var directions = new MapboxDirections({
  //   accessToken: mapboxgl.accessToken,
  // });

  // map.addControl(directions, "top-left");
  map.on("load", function () {
    map.addSource("places", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.45733144930057, 17.442050194447535],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Mission Chinese Food</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.45426933535497, 17.40328990350676],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Mission Italian Food</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a <a href="http://tallulaeatbar.ticketleap.com/2012beachblanket/" target="_blank" title="Opens in a new window">Big Backyard Beach Bash and Wine Fest</a> on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.grill hot dogs.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.48734016596748, 17.409718058448902],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Mission Indian Food</strong><p>The <a href="http://ballstonarts-craftsmarket.blogspot.com/" target="_blank" title="Opens in a new window">Ballston Arts & Crafts Market</a> sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.49815963524196, 17.414782506107013],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Seersucker Bike Ride and Social</strong><p>Feeling dandy? Get fancy, grab your bike, and take part in this year\'s <a href="http://dandiesandquaintrelles.com/2012/04/the-seersucker-social-is-set-for-june-9th-save-the-date-and-start-planning-your-look/" target="_blank" title="Opens in a new window">Seersucker Social</a> bike ride from Dandies and Quaintrelles. After the ride enjoy a lawn party at Hillwood with jazz, cocktails, paper hat-making, and more. 11:00-7:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.46121012683538, 17.463082483340454],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Capital Pride Parade</strong><p>The annual <a href="http://www.capitalpride.org/parade" target="_blank" title="Opens in a new window">Capital Pride Parade</a> makes its way through Dupont this Saturday. 4:30 p.m. Free.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.43660883823017, 17.443881026572285],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Mission Italian Food</strong><p>Jazz-influenced hip hop artist <a href="http://www.muhsinah.com" target="_blank" title="Opens in a new window">Muhsinah</a> plays the <a href="http://www.blackcatdc.com">Black Cat</a> (1811 14th Street NW) tonight with <a href="http://www.exitclov.com" target="_blank" title="Opens in a new window">Exit Clov</a> and <a href="http://godsilla.bandcamp.com" target="_blank" title="Opens in a new window">Gods’illa</a>. 9:00 p.m. $12.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.44400894693206, 17.445195602520975],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>A Little Night Music</strong><p>The Arlington Players\' production of Stephen Sondheim\'s  <a href="http://www.thearlingtonplayers.org/drupal-6.20/node/4661/show" target="_blank" title="Opens in a new window"><em>A Little Night Music</em></a> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.44482551065089, 17.442274309764546],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Fast Food Hub</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.44176339670528, 17.437308004680467],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Le vantage Kitchen</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.4182515885584, 17.455182878244276],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Spicy Venue</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.35179091760921, 17.37536785763231],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Spring Leaf Cafe</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.44036818762372, 17.503764068102335],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>American Express</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.33531142551347, 17.49590567560214],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Mission Chinese Food</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Mission Chinese Food</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.43350173258382, 17.47101852515254],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Mission Indian Food</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.38200331978469, 17.47101852515254],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Big Bytes</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.44242812413567, 17.45660861930139],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Platform 95</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.39642287536846, 17.502454359619353],
            },
          },
          {
            type: "Feature",
            properties: {
              description:
                '<strong>Daily Bistro</strong><p><a href="http://www.truckeroodc.com/www/" target="_blank">Truckeroo</a> brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>',
              icon: "restaurant",
            },
            geometry: {
              type: "Point",
              coordinates: [78.4177088859921, 17.389784176767723],
            },
          },
        ],
      },
    });
    // Add a layer showing the places.
    map.addLayer({
      id: "places",
      type: "symbol",
      source: "places",
      layout: {
        "icon-image": "{icon}-15",
        "icon-allow-overlap": true,
      },
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on("click", "places", function (e) {
      var coordinates = e.features[0].geometry.coordinates.slice();
      var description = e.features[0].properties.description;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
    });
    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      }),
      "top-left"
    );
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", function () {
      map.getCanvas().style.cursor = "";
    });
  });
}
