const API_KEY = "de8d95a8fd855c524e4704e6647ae343";
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
async function fetchMovies() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    displayMovies(data.results);
    console.log(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
function displayMovies(movies) {
  const movieContainer = document.querySelector(".watch-list");
  movieContainer.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    const movieTitle = document.createElement("h3");
    movieTitle.textContent = movie.title;
    const movieParagraph = document.createElement("p");
    movieParagraph.textContent = movie.paragraph;
    const moviePoster = document.createElement("img");
    moviePoster.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieParagraph);
    movieContainer.appendChild(movieCard);
  });
}
fetchMovies();