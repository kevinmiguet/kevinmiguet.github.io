function normalize(string) {
  return string
    .toLowerCase()
    .replace()
}

// Criteria can be [Director|Country|Actor|Genre]
function filterBy(criteria, value) {
  return movieData.movies
    .filter((movie) => {
      movie[criteria] === normalize(value);
    })
}

function hasData(movie) {
  return movie.data !== undefined && movie.data !== null
}
// function that returns a list of movies 
function filterByYear(operator, year) {
  return movieData.movies
    .filter((movie) => {
      return hasData(movie);
    })
    .filter((movie) => {
      switch (operator) {
        case "equals":
          return movie.data.year.slice(0,4) === year;
        case "before":
          return movie.data.year.slice(0,4) < year;
        case "after":
          return movie.data.year.slice(0,4) > year;
        default:
          console.log("ERROR: unknown operator. Filter won't be applied")
          return true
      }
    })
}

function getOldMovies() {
  return movieData.filterByYear('before', db.currentYear);
}