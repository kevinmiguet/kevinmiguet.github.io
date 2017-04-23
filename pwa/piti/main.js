function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: cinemas[0],
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: false,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false
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
   
      // {
      //   url: "./images/marker.png",
      //   size: new google.maps.Size(32, 32)
      // }
    marker.addListener('click', () => {
      let message = "";
      if (horaires[cinemas[dot].name] && horaires[cinemas[dot].name].length != 0){
        message += `<h1>${cinemas[dot].name}</h1>\n`
        horaires[cinemas[dot].name].forEach((element) =>{
          message += `${element}\n`
        });   
      }
      
      $( "#message" ).html(message)
    });
  }

}
