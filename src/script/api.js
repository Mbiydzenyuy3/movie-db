// popular release
const likedMovies = []
const favoriteMovies = []
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo'
  }
}
fetch(
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
  options
)
  .then((res) => res.json())
  .then((data) => {
    const movieList = document.getElementById('swiper-wrapper-3')

    for (let index = 0; index < data.results.length; index++) {
      const movie = data.results[index]
      const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image+Available'

      const slide = document.createElement('a')
      slide.href = 'details.html?movie_id=' + movie.id
      slide.className = 'released-movies swiper-slide'
      movieList.appendChild(slide)

      const img = document.createElement('img')
      img.src = posterPath
      img.alt = movie.title
      img.className = 'movie-poster-one'
      slide.appendChild(img)

      const movieTitle = document.createElement('h4')
      movieTitle.className = 'movie-title'
      movieTitle.textContent = movie.title
      slide.appendChild(movieTitle)

      const movieParagraph = document.createElement('p')
      movieParagraph.className = 'movie-paragraph'
      movieParagraph.textContent = movie.paragraph
      movieParagraph.innerHTML = `&#11088; ${movie.vote_average} | Mystery - Movies `
      slide.appendChild(movieParagraph)
    }
  })
  .then(() => {
    const swiper = new Swiper('#likes', {
      slidesPerView: 4,
      spaceBetween: 5,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    })
  })
  .catch((err) => console.error(err))

const POPULAR_MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=4ef363f9f9a3c5535149c90970fa2311&language=en-US&page=1'

async function fetchPopularMovies () {
  try {
    const response = await fetch(POPULAR_MOVIES_URL)
    if (!response.ok) {
      throw new Error(`Failed to fetch popular movies: ${response.status}`)
    }

    const data = await response.json()
    const movies = data.results || []
    populatePopularMovies(movies)
  } catch (error) {
    console.error('Error fetching popular movies:', error)
  }
}

function populatePopularMovies (movies) {
  const popularWrapper = document.querySelector('.new-popular-item')
  popularWrapper.innerHTML = '' // Clear existing content

  movies.forEach((movie, index) => {
    const movieItem = document.createElement('a')
    movieItem.className = 'new-popular-item'

    movieItem.innerHTML = `
      <div class="number">${index + 1}</div>
      <div class="image-popular-release">
        <img class="poster-img" src="https://image.tmdb.org/t/p/w500${
          movie.poster_path
        }" alt="${movie.title}">
      </div>
      <div class="release-overwiew">
        <div class="pg-age">${movie.adult ? 'R' : 'PG-13'}</div>
        <h4 class="new-release-title">${movie.title}</h4>
        <span class="movie-genre">
          <p>${movie.genre_ids.slice(0, 2).join(', ') || 'Unknown Genre'}</p>
        </span>
        <p class="movie-star">⭐ ${movie.vote_average.toFixed(
          1
        )} | <span>Movies</span></p>
      </div>
    `

    popularWrapper.appendChild(movieItem)
  })

  addNavigation(popularWrapper)
}

function addNavigation (wrapper) {
  const items = wrapper.querySelectorAll('.new-popular-item')
  let currentIndex = 0

  function showItem (index) {
    items.forEach((item, i) => {
      item.style.display = i === index ? 'block' : 'none'
    })
  }

  wrapper.querySelector('.prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length
    showItem(currentIndex)
  })

  wrapper.querySelector('.next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length
    showItem(currentIndex)
  })

  // Initialize the first item
  showItem(currentIndex)
}

// Fetch and populate popular movies
fetchPopularMovies()
