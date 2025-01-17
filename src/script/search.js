const API_KEY = "4ef363f9f9a3c5535149c90970fa2311";
const BASE_URL = "https://api.themoviedb.org/3";

async function fetchMovies(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  return response.json();
}

async function searchMovies(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  return response.json();
}
