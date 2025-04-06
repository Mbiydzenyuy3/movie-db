// watch list section
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo',
  }
}

// const API_KEY = import.meta.env.VITE_BASE_API_KEY
 const BASE_URL = import.meta.env.VITE_BASE_URL
const IMG_PATH = import.meta.env.VITE_IMG_PATH

fetch(`${BASE_URL}/movie/popular?language=en-US&page=1`, options)
  .then((res) => res.json())
  .then((data) => {
    const firstSection = document.getElementById('swiper-wrapper-2')
    for (let index = 0; index < data.results.length; index++) {
      const movie = data.results[index]
      const posterPath = movie.poster_path
        ? `${IMG_PATH}${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image+Available'

      const slideWrapper = document.createElement('a')

      slideWrapper.href = 'details.html?movie_id=' + movie.id
      slideWrapper.className = 'released-movies swiper-slide'
      firstSection.appendChild(slideWrapper)

      const img = document.createElement('img')
      img.src = posterPath
      img.alt = movie.title
      img.className = 'movie-poster-one'
      slideWrapper.appendChild(img)
      const movieTitle = document.createElement('h4')
      movieTitle.className = 'movie-title'
      movieTitle.textContent = movie.title
      slideWrapper.appendChild(movieTitle)

      const movieParagraph = document.createElement('p')
      movieParagraph.className = 'movie-paragraph'
      movieParagraph.textContent = movie.paragraph
      movieParagraph.innerHTML = `&#11088 ${movie.vote_average} | Mystery - Movies `
      slideWrapper.appendChild(movieParagraph)
    }
  })
  .then(() => {
    const swiper = new Swiper('#watchlist', {
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    })
  })
  .catch((err) => {throw new Error(err)})

document.addEventListener('DOMContentLoaded', () => {
  new Swiper('.logo-carousel', {
    slidesPerView: 8, // Number of logos visible at a time
    spaceBetween: 20, 
    loop: true, // Infinite scrolling
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      768: { slidesPerView: 3 },
      1024: { slidesPerView: 5 },
    }
  })
})
