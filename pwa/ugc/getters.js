function normalize (string){
  return string
  .toLowerCase()
  .replace()
}

// Criteria can be [Director|Country|Actor|Genre]
function filterBy(criteria, value) {
  return this.movies
    .filter((movie) => {
      movie[criteria] === normalize(value);
    })
}

// function that returns a list of movies 
function filterByYear(operator, year) {
  return this.movies
    .filter((movie) => {
      switch (operator) {
        case "equals":
          return movie.year === year;
        case "before":
          return movie.year < year;
        case "after": 
          return movie.year > year;
        default:
          console.log ("ERROR: unknown operator. Filter won't be applied")
          return true
      }
    })
}

function getOldMovies() {
  return this.filterByYear('before', db.currentYear);
}