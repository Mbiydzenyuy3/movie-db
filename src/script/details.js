import '../styles/style.css'

const API_KEY = import.meta.env.VITE_BASE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL

document.addEventListener('DOMContentLoaded', () => {
  // const apiKey = '4ef363f9f9a3c5535149c90970fa2311'
  // const urlParams = new URLSearchParams(window.location.search)
  // const movieId = urlParams.get('movie_id')

  if (!movieId) {
    document.querySelector('#details-page').innerHTML =
      '<h2>Movie ID is missing in the URL!</h2>'
    return
  }

  // Fetch the movie details
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${AbortController}&language=en-US`

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.status_code === 34) {
        document.querySelector('#details-page').innerHTML =
          '<h2>Movie not found!</h2>'
        return
      }

      // Placeholder for the poster while we load the backdrop
      const moviePoster = data.poster_path
        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
        : '/assets/img/placeholder-poster.jpg'

      // Set the movie poster for now
      document.querySelector('#details-page').innerHTML = `
         <header>
    <div class='header'>
      <a href = './index.html' class='logo'>
        <img class='main-logo' src='/assets/img/Logo.png' alt='logo' />
        <img class='logo-name' src='/assets/img/SaintStream.png' alt='logo' />
      </a>
      <nav class='navbar'>
        <ul>
          <li><a href='./index.html'>Home</a></li>
          <li><a href='./details.html'>About</a></li>
          <li><a href='./details.html'>Favorites</a></li>
        </ul>
      </nav>
      <div class='search-bar'>
        <form class='search-form'>
          <input type='search' id='search-input' placeholder='search by title...' />
         
        </form>
      </div>
   
    </div>
  </header>
        <section class='hero-banner'>
          <div class='hero-poster'>
            <img id='moviePoster' src='${moviePoster}' alt='Movie Poster' />
            <div class='banner-overlay'></div>
            <div class='details-hero-content container'>
              <h1>${data.title}</h1>
              <p>${data.overview}</p>
            </div>
          </div>
        </section>
        <section id='cast-container'>
          <div class='container'>
            <h2 class='heading'>Cast</h2>
            <div id='movieCast'></div>
          </div>
        </section> 
        <h2 class='heading'>Similar Movies</h2>
        <section id='similar-movies-section'>
          <div class='container mySwiper'>
            <div id='similar-movies-container' class='swiper-wrapper'></div>
          </div>
        </section>
      `

      // Fetch the backdrops and replace the movie poster if a backdrop exists
      loadBackdrop(movieId)

      // Fetch movie credits and similar movies
      loadMovieCredits(movieId)
      loadSimilarMovies(movieId)
    })
    .catch((error) => {
      console.error('Error fetching movie details:', error)
      document.querySelector('#details-page').innerHTML =
        '<h2>An error occurred while fetching movie details.</h2>'
    })

  // Fetch the movie backdrops
  function loadBackdrop (movieId) {
    const backdropUrl = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${API_KEY}`

    fetch(backdropUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.backdrops && data.backdrops.length > 0) {
          // Use the first backdrop as the movie poster
          const backdropPath = data.backdrops[0].file_path
          const backdropImage = `https://image.tmdb.org/t/p/original${backdropPath}`
          document.getElementById('moviePoster').src = backdropImage
        }
      })
      .catch((error) => {
        throw new Error('Error fetching movie backdrops:', error)
      })
  }

  // Fetch movie credits with cast pictures
  function loadMovieCredits (movieId) {
    const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`
    fetch(creditsUrl)
      .then((response) => response.json())
      .then((data) => {
        const castContainer = document.querySelector('#movieCast')
        castContainer.innerHTML = '' // Clear existing content

        // Limit to the top 6 cast members
        const topCast = data.cast.slice(0, 10)

        if (topCast.length > 0) {
          topCast.forEach((member) => {
            // Get the profile picture or a placeholder if not available
            const profilePicture = member.profile_path
              ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
              : '/assets/img/placeholder-profile.jpg'

            // Create the cast card HTML
            const castCard = `
              <div class='cast-card'>
                <img src='${profilePicture}' alt='${member.name}' />
                <div class='cast-info'>
						<p class='cast-name line-clamp-1'><strong>${member.name}</strong></p>
						<p  class='cast-role line-clamp-1'>${member.character}</p>
					 </div>
              </div>
            `

            // Append to the cast container
            castContainer.innerHTML += castCard
          })
        } else {
          castContainer.innerHTML = '<p>No cast information available.</p>'
        }
      })
      .catch((error) => {
        throw new Error('Error fetching credits:', error)
      })
  }

  function loadSimilarMovies (movieId) {
    const similarMoviesUrl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    fetch(similarMoviesUrl)
      .then((response) => response.json())
      .then((data) => {
        const container = document.getElementById('similar-movies-container')
        container.innerHTML = '' // Clear existing movies
        if (data.results.length > 0) {
          data.results.forEach((movie) => {
            const moviePoster = movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : '/assets/img/placeholder-poster.jpg'
            container.innerHTML += `
              <div class='similar-movie swiper-slide'>
                <img src='${moviePoster}' alt='${movie.title}' />
                <h3>${movie.title}</h3>
                <p> ${`&#11088 ${movie.vote_average} | Action - Movies `}</p>
              </div>
            `
          })
        } else {
          container.innerHTML = '<p>No similar movies found.</p>'
        }
      })
      .catch((error) => {
        throw new Error('Error fetching similar movies:', error)
    })
  }
})

const form = document.getElementById('search-form')

getMovies(BASE_URL)

export async function getMovies(url) {
  const response = await fetch(url)
  const data = await response.json()

  showMovies(data.results)
}

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value
  if (searchTerm && searchTerm !== '') {
    getMovies(SEARCH_API + searchTerm)

    search.value = ''
  } else {
    window.location.reload()
  }
})
