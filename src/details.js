// Fetch the movie ID from the URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

if (movieId) {
  console.log("Movie ID:", movieId); // Debugging

  const MOVIE_DETAILS_URL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=4ef363f9f9a3c5535149c90970fa2311&language=en-US`;

  async function fetchMovieDetails() {
    try {
      const response = await fetch(MOVIE_DETAILS_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const movie = await response.json();
      console.log("Fetched Movie Data:", movie);

      document.getElementById("title").textContent =
        movie.title || "No Title Available";
      document.getElementById("overview").textContent =
        movie.overview || "No Overview Available";
      document.getElementById("poster").src = `https://image.tmdb.org/t/p/w500${
        movie.poster_path || ""
      }`;
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }

  fetchMovieDetails();
} else {
  console.error("No movie ID found in URL");
}

// Fetch and display similar movies
const SIMILAR_MOVIES_URL = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=4ef363f9f9a3c5535149c90970fa2311&language=en-US&page=1`;

async function fetchSimilarMovies() {
  try {
    const response = await fetch(SIMILAR_MOVIES_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch similar movies");
    }

    const data = await response.json();
    const similarSection = document.getElementById("similarMoviesContainer");
    similarSection.innerHTML = ""; // Clear previous content

    data.results.forEach((movie) => {
      const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image+Available";

      const slideContainer = document.createElement("div");
      slideContainer.classList.add("similar-films", "swiper-slide");

      const img = document.createElement("img");
      img.src = posterPath;
      img.alt = movie.title;
      img.className = "movie-poster-one";
      slideContainer.appendChild(img);

      const movieTitle = document.createElement("h4");
      movieTitle.className = "movie-title";
      movieTitle.textContent = movie.title;
      slideContainer.appendChild(movieTitle);

      similarSection.appendChild(slideContainer);
    });

    new Swiper("#similarMovies", {
      slidesPerView: 4,
      spaceBetween: 5,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  } catch (error) {
    console.error("Error fetching similar movies:", error);
  }
}

fetchSimilarMovies();
