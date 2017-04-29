const loadContent = (cineName) => {

  let message = "";
  if (schedules[cineName].length != 0) {
    message += `<h1>${cineName}</h1>\n`
    schedules[cineName].forEach((film) => {
      message += `<h2>${film.title}</h2>`;
      for (let jour in film.schedule) {
        message += ` \t\t${jour} : \n \t\t\t${film.schedule[jour]} \n`

      }
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
    clickableIcons: false
  });

  for (let dot in cinemas) {
    var marker = new google.maps.Marker({
      position: cinemas[dot],
      map: map,
      icon: new google.maps.MarkerImage(
        "./images/marker.png",
        null, /* size is determined at runtime */
        null, /* origin is 0,0 */
        null, /* anchor is bottom center of the scaled image */
        new google.maps.Size(28, 28)
      ),
    });

    marker.addListener('click', () => {
      $("#message").html(loadContent(cinemas[dot].name))
    });
  }

}
