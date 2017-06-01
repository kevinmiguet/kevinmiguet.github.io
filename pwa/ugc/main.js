function hideMenu() {
  $("#sideBar").removeClass("open");
}

function showMenu(element) {
  $(".menuInfo").hide();
  $(`#${element.dataName}`).show();
  $("#sideBar").addClass("open");
}

const joursSemaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
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

const generateMenu = (cinema) => {
  let message = "";
  message += `<div class="menuInfo" id="${cinema.dataName}" ><h1>${cinema.name}</h1>\n`
  if (movieData.schedules[cinema.dataName] && movieData.schedules[cinema.dataName].length != 0) {
    movieData.schedules[cinema.dataName].forEach((film) => {
      message += `<li class="mdl-list__item mdl-list__item--two-line">
        <img src="https://image.tmdb.org/t/p/original${movieData.movies[film.id].data}" width="128" height="170">
        <span class="mdl-list__item-primary-content">
         <span>${movieData.movies[film.id].title}</span>`;
      joursSemaine.forEach((jour) => {
        if (film.schedule[jour]) {
          message += `<span class="mdl-list__item-sub-title">${jour} : ${film.schedule[jour]}</span>`;
        }
      })
      message += `</span><span class="mdl-list__item-secondary-content"></span></li>`
    });
  }
  message += `</div>`
  $("#movieList").append(message);
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

function generateMovieList() {
  let message = "";
  for (let movie in movieData.movies) {
    message += `<li class="mdl-list__item mdl-list__item--two-line">
        <img src="https://image.tmdb.org/t/p/original${movieData.movies[movie].data}" width="128" height="170">
        <span class="mdl-list__item-primary-content">
         <span>${movieData.movies[movie].title}</span>`;
    message += `<span class="mdl-list__item-sub-title">hohoh</span>`;
    message += `</span><span class="mdl-list__item-secondary-content"></span></li>`
  }
  $("#movieList2").append(message);
}

