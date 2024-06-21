let overlay;

// Main routine: initialize map with timeslider

function init() {

  // Set up map

  let mapBounds = new L.LatLngBounds(
    new L.LatLng(-85.051129, -180),
    new L.LatLng(85.051129, 180)
  );
  let mapMinZoom = 1;
  let mapMaxZoom = 11;
  let map = L.map("map", { minZoom: mapMinZoom, maxZoom: mapMaxZoom }).setView(
    [43.869281, -103.5264874],
    6
  );
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  overlay = L.tileLayer("https://cawm.lib.uiowa.edu/tiles/{z}/{x}/{y}.png", {
    minZoom: mapMinZoom,
    maxZoom: mapMaxZoom,
    bounds: mapBounds,
    opacity: 0.95,
  }).addTo(map);

  // Load sites geoJSON

  let sites = "geojson/sites.geojson";

  fetch(sites)
    .then((res) => res.json())
    .then((data) => {
      console.log("Here is the GeoJSON sites data object: ", L.geoJSON(data));
      L.geoJSON(data).addTo(map);
    })
    .catch(function (error) {
      console.log(`Error loading sites geoJSON: ${error}`);
    });

  // Load expo geoJSON

  let expo = "geojson/expo.geojson";

  fetch(expo)
    .then((res) => res.json())
    .then((data) => {
      console.log("Here is the GeoJSON expo data object: ", L.geoJSON(data));
      L.geoJSON(data).addTo(map);
    })
    .catch(function (error) {
      console.log(`Error loading expo geoJSON: ${error}`);
    });

  const changeMapFunction = function () {}; // placeholder

  //need js code to connect geojson data with timeslider//

  L.control
    .timeslider({
      timelineItems: [
        "Long Ago",
        "1851",
        "1868",
        "1874",
        "1877",
        "1889",
        "Today",
      ],
      changeMap: changeMapFunction,
    })
    .addTo(mymap);
}
