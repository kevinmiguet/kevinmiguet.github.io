const joursSemaine = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const loadContent = (cineName) => {

  let message = "";
  if (schedules.results[cineName].length != 0) {
    message += `<h1>${cineName}</h1>\n`
    schedules.results[cineName].forEach((film) => {
      message += `<li class="mdl-list__item mdl-list__item--two-line">
        <img src="https://image.tmdb.org/t/p/original${schedules.posters[film.title]}" width="128" height="170">

        <span class="mdl-list__item-primary-content">
         <span>${film.title}</span>`;

      joursSemaine.forEach((jour) => {
        if (film.schedule[jour]) {
          message += `<span class="mdl-list__item-sub-title">${jour} : ${film.schedule[jour]}</span>`;
        }
      })


      message += `</span><span class="mdl-list__item-secondary-content"></span></li>`
    });
  }

  return message;
}


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: { "lat": 48.858949, "lng": 2.346373 },
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
    clickableIcons: false,
    gestureHandling: "greedy",
  });
  google.maps.event.addListener(map, "click", () => {
    $('#message').hide();
  })
  // generate markers
  for (let dot in cinemas) {
    var marker = new google.maps.Marker({
      position: cinemas[dot],
      map: map,
      icon: new google.maps.MarkerImage(
        "./images/marker.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(45, 45)
      ),
    });

    marker.addListener('click', () => {
      $("#movieList").html(loadContent(cinemas[dot].name));
      $("#message").show();
    });
  }

}
