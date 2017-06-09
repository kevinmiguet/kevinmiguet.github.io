var markers = [];

const joursSemaine = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const googleMapConfig = {
  zoom: 12,
  center: { "lat": 48.858949, "lng": 2.346373 },
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
  clickableIcons: false,
  gestureHandling: "greedy"
}

function hideMenu() {
  sideBar.removeClass("open").addClass("close");
  $(".menuInfo").hide();  
}

function showMenu(element) {
  $(".menuInfo").hide()    
  $(`#${element.dataName}`).show(); // use ID for that instead
  sideBar.removeClass("close").addClass("open");
}

function hideMarker(cineId) {
  markers[cineId].setVisible(false);
}
function showMarker(cineId) {
  markers[cineId].setVisible(true);
}
function toggleMarker(cineId) {
  markers[cineId].setVisible(!markers[cineId].visible);
}

function showCineMarkerWithMovie(movieId) {
  markers.forEach((marker,cineId)=>{
    hideMarker(cineId)
  })
  
  getCineIdsWithMovie(movieId).forEach((cineId)=>{
    toggleMarker(cineId)
  })
}

function normalize(string) {
  return string
  .replace(/(^ +| +$|[\.\-])/g, '')
  .replace(/(  +)/g, ' ')
  .toLowerCase()
}

function generateMarker(element, map) {
  var marker = new google.maps.Marker({
    position: element.position,
    map: map,
    icon: new google.maps.MarkerImage(
      "./images/marker.png",
      null, /* size is determined at runtime */
      null, /* origin is 0,0 */
      null, /* anchor is bottom center of the scaled image */
      new google.maps.Size(45, 45)),
  });
  // show the menu when clicking the marker
  marker.addListener('click', () => {
    showMenu(element);
  });
  markers.push(marker)
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), googleMapConfig);
  // hide the menu when clicking the map
  google.maps.event.addListener(map, "click", () => {
    hideMenu();
  })
  // generate markers
  cinemas.forEach((cinema) => {
    generateMarker(cinema, map);
    generateMenu(cinema);
  });
}