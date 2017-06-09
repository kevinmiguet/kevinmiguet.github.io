function generatePoster(movieId){
 return `<img src=${getPosterSrc(movieId)} width="128" height="170">`
}

function generateMovieCard(movie) {
  $("#movieList").append(
    `<span class='movieCard'>${generatePoster(movie.id)}</span>`);
}
function generateMenu(cinema) {
  let message = "";
  message += `<div class="menuInfo" id="${cinema.dataName}" ><h1>${cinema.name}</h1>\n`
  
  // if there are movies scheduled for this cinema
  if (movieData.schedules[cinema.dataName] && movieData.schedules[cinema.dataName].length != 0) {
    movieData.schedules[cinema.dataName].forEach((movieSchedule) => {message += generateScheduleMovieCard(movieSchedule);});
  }

  message += `</div>`
  $("#movieList").append(message);
}

function generateScheduleMovieCard(movieSchedule){
    return `<li class="mdl-list__item mdl-list__item--two-line">
      ${generatePoster(movieSchedule.id)}
      <span class="mdl-list__item-primary-content">
        <div class="movieTitle">${getTitle(movieSchedule.id)}</div>
        <div class ="movieInfo">
          <span class="mdl-list__item-sub-title movieDirector">${generateDirector(movieSchedule.id)}</span>
          <div class="timeTable">${generateSchedule(movieSchedule)}</div>
        </div>
      </span>
      <span class="mdl-list__item-secondary-content"></span>
    </li>`
}

function generateDirector(movieId){
  return getDirector(movieId) ? "AEIOUaeiou".includes(getDirector(movieId)[0]) ? `d'${getDirector(movieId)}`: `de ${getDirector(movieId)}` : "" 
}

function generateSchedule(movie) {
    if (movie.schedule.tlj) {
        return `<span class="mdl-list__item-sub-title"> Tous les jours : ${movie.schedule.schedulePatterns[0]}</span>`
    } else {
        return movie.schedule.schedulePatterns.map((schedulePattern, id) => {
            return `<span class="mdl-list__item-sub-title"> ${getDaysWithSchedulePattern(id, movie.schedule.days)} : ${schedulePattern.join(", ")}</span>`
        }).join("") // turns the array into a string
    }
}