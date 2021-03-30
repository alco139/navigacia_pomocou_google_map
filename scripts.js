function myMap() {
  initMap();
}
function initMap() {
  const directionsService = new google.maps.DirectionsService();
  const directionsRenderer = new google.maps.DirectionsRenderer();

  var location = { lat: 48.15201423027952, lng: 17.073312411763936 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 17,
    center: location,
  });
  directionsRenderer.setMap(map);
  const panorama = new google.maps.StreetViewPanorama(
    document.getElementById("pano"),
    {
      position: location,
      pov: {
        heading: 34,
        pitch: 10,
      },
    }
  );
  map.setStreetView(panorama);
  var marker = new MarkerWithLabel({
    position: location,
    map: map,
    labelContent: "FEI STU", // can also be HTMLElement
    labelAnchor: new google.maps.Point(20, -35),
    labelClass: "labels", // the CSS class for the label
    labelStyle: { opacity: 1.0 },
  });
  const infowindow = new google.maps.InfoWindow({
    content:
      "<p><b>GPS</b><br><b>lat: </b>" +
      location.lat +
      "<br><b>lng: </b>" +
      location.lng +
      "</p>",
  });

  marker.addListener("click", () => {
    infowindow.open(map, marker);
  });

  var markerStop1 = new MarkerWithLabel({
    position: { lat: 48.1546173, lng: 17.0757312 },
    map: map,
    labelContent: "Zastavka 1", // can also be HTMLElement
    labelAnchor: new google.maps.Point(20, -35),
    labelClass: "labels", // the CSS class for the label
    labelStyle: { opacity: 1.0 },
  });
  var markerStop2 = new MarkerWithLabel({
    position: { lat: 48.1541291, lng: 17.0768738 },
    map: map,
    labelContent: "Zastavka 2", // can also be HTMLElement
    labelAnchor: new google.maps.Point(20, -35),
    labelClass: "labels", // the CSS class for the label
    labelStyle: { opacity: 1.0 },
  });
  var markerStop3 = new MarkerWithLabel({
    position: { lat: 48.1541138, lng: 17.075098 },
    map: map,
    labelContent: "Zastavka 3", // can also be HTMLElement
    labelAnchor: new google.maps.Point(20, -35),
    labelClass: "labels", // the CSS class for the label
    labelStyle: { opacity: 1.0 },
  });
  var markerStop4 = new MarkerWithLabel({
    position: { lat: 48.1546478, lng: 17.074417 },
    map: map,
    labelContent: "Zastavka 4", // can also be HTMLElement
    labelAnchor: new google.maps.Point(20, -35),
    labelClass: "labels", // the CSS class for the label
    labelStyle: { opacity: 1.0 },
  });

  const onChangeHandler = function () {
    calculateAndDisplayRoute(directionsService, directionsRenderer);
    calculateDistance();
    document.getElementById("msg").style.display = "block";
  };
  document
    .getElementById("myButton")
    .addEventListener("click", onChangeHandler);
}
function calculateDistance() {
  var service2 = new google.maps.DistanceMatrixService();
  service2.getDistanceMatrix(
    {
      origins: [document.getElementById("startPoint").value],
      destinations: [{ lat: 48.15201423027952, lng: 17.073312411763936 }],
      travelMode: document.getElementById("mode").value,
    },
    callback
  );
}

function callback(response, status) {
  if (status == "OK") {
    document.getElementById("msg").innerText =
      "Vzdialenosť: " +
      response.rows[0].elements[0].distance.value / 1000 +
      " km";
  }
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
  const selectedMode = document.getElementById("mode").value;
  directionsService.route(
    {
      origin: {
        query: document.getElementById("startPoint").value,
      },
      destination: {
        query: "Fei stu",
      },
      travelMode: google.maps.TravelMode[selectedMode],
    },
    (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
      }
    }
  );
}
