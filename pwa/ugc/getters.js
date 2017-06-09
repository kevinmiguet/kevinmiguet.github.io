// Criteria can be [lang|director|title]
function getMoviesFilteredBy(criteria, value) {
  return movieData.movies
    
    .filter((movie)=>{
      return hasAttribute(movie, criteria)})
    
    .filter((movie) => { 
      return normalize(movie[criteria]) === normalize(value)
    })
}


function filterByYear(operator, year) {
  return movieData.movies
    .filter((movie) => {return hasData(movie) && hasYear();})

    .filter((movie) => {
      switch (operator) {
        case "equals":
          return movie.year.slice(0,4) === year;
        case "before":
          return movie.year.slice(0,4) < year;
        case "after":
          return movie.year.slice(0,4) > year;
        default:
          console.log(`ERROR: unknown operator '${operator}'. Filter won't be applied`)
          return null
      }
    })
}

function getOldMovies() {
  return movieData.filterByYear('before', db.currentYear);
}

function getPosterSrc(movieId) {
  return './images/defaultPoster.png'
  // return movieData.movies[movieId].poster ? `"https://image.tmdb.org/t/p/original${movieData.movies[movieId].poster}"` : './images/defaultPoster.png'
}
function getDirector(movieId) {
  return movieData.movies[movieId] ? movieData.movies[movieId].director : null
}
function getTitle(movieId) {
  return movieData.movies[movieId] ? movieData.movies[movieId].title : null
}

function getDaysWithSchedulePattern(schedulePatternId, days) {
  return Object.keys(days)
  .filter((day) => {return days[day] === schedulePatternId;})
  .map((day) => {return joursSemaine[day]})
  .join(", ")
}

function getCineIdsWithMovie(movieId){
  return Object.keys(movieData.schedules)
  .filter((cineId)=> { return movieData.schedules[cineId]
    .filter((movie)=>{ return movie.id === movieId
    }).length > 0
  })
}

function hasAttribute(movie, attribute) {
  return movie[attribute]!== undefined && movie[attribute]!== null ;
}

function hasYear(movie) {
  return movie.year !== undefined && movie.year !== null
}

