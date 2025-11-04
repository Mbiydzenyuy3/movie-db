import '../styles/main.css'
import '../styles/style.css'
import '../script/carousel.js'
import { fetchPopularMovies } from '../script/api.js'
import '../script/counter.js'

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('app').innerHTML = `
  <header>
          <div class='container header'>
            <a href = './index.html' class='logo'>
                <img class='main-logo' src=' /assets/img/Logo.png' alt='logo'/>
                <img class='logo-name' src=' /assets/img/SaintStream.png' alt='logo'/> 
            </a>
            <nav class='navbar'>
              <ul>
                <li><a href='./index.html'>Home</a></li>
                <li><a href='./details.html'>About</a></li>
                <li><a href='./details.html'>Favorites</a></li>
              </ul>
              <div class='circle-container'>
              <div class='circle'>
                <button id='open'>
                  <i class='fas fa-bars'></i>
                </button>
                <button id='close'>
                  <i class='fas fa-times'></i>
                </button>
              </div>
              </div>
            </nav>
            <div id='search-bar'>
              <form id='search-form'>
                <input type='search' id ='search-input' placeholder='search by title...' />
              </form>
            </div>
          </div>
  </header>
  <section class='mySwiper' id='swiper-item'>
    <div id='slider' class='swiper-wrapper hero container'></div>
    <div class="swiper-pagination"></div>
  </section>

  <section id='brand-logos' class='mySwiper swiper'>
    <div class='container swiper-wrapper carousel-slide'>
      <div class='swiper-slide' id='slide-img-wrap'><img src='/assets/img/disney.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-1'><img src='/assets/img/netflix.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-2'><img src='/assets/img/hbo-max.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-3'><img src='/assets/img/pixar.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-4'><img src='/assets/img/marvel.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-5'><img src='/assets/img/starwars.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-6'><img src='/assets/img/national geographic.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-7'><img src='/assets/img/youTube.png' alt='' class='logos' /></div>
      <div class='swiper-slide' id='slide-img-wrap-8'><img src='/assets/img/webseries.png' alt='' class='logos' /></div>
    </div>
    <div class='swiper-button-next' id='btn-next'></div>
    <div class='swiper-button-prev' id='btn-prev'></div>
  </section>

  <h3 class='heading'>Popular of the week</h3>
  <section class='popular-release mySwiper swiper' id='popular-release'>
    <div class='container swiper-wrapper' id='popular-swiper'>
      
    </div>
    <div class='swiper-button-next'></div>
    <div class='swiper-button-prev'></div>
  </section>

  <div class='new-movie-section'>
    <h3 class='heading'>Latest releases</h3>
    <section id='just-release' class='mySwiper swiper'>
      <div id='swiper-wrapper-1' class='container swiper-wrapper'></div>
      <div class='swiper-button-next'></div>
      <div class='swiper-button-prev'></div>
    </section>
  </div>

  <div class='watch-movie-section'>
    <h3 class='heading'> Watchlist </h3>
    <section id='watchlist' class='mySwiper swiper'>
      <div id='swiper-wrapper-2' class='container swiper-wrapper'></div>
      <div class='swiper-button-next'></div>
      <div class='swiper-button-prev'></div>
    </section>
  </div>

  <div class='likes-section'>
    <h3 class='heading'>Likes</h3>
    <section id='likes' class='mySwiper swiper'>
      <div id='swiper-wrapper-3' class='container swiper-wrapper'></div>
      <div class='swiper-button-next'></div>
      <div class='swiper-button-prev'></div>
    </section>
  </div>

  <footer> ... </footer>
  `

  // Populate popular movies then init Swiper on the section (not the inner wrapper)
  ;(async () => {
    try {
      await fetchPopularMovies() // populates #popular-swiper
      // initialize after DOM painted so Swiper can read slides
      requestAnimationFrame(() => {
        // initialize Swiper on the popular section (container with class 'swiper')
        const popularSwiper = new Swiper('#popular-release', {
          slidesPerView: 1,
          spaceBetween: 12,
          loop: true,
          navigation: {
            nextEl: '#popular-release .swiper-button-next',
            prevEl: '#popular-release .swiper-button-prev'
          },
          breakpoints: {
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }
        })
        void popularSwiper
      })
    } catch (e) {
      console.warn('fetchPopularMovies error', e)
    }
  })()
})

// Shared API options and constants used elsewhere in this file
const BASE_URL = import.meta.env.VITE_BASE_URL
const IMG_PATH =
  import.meta.env.VITE_IMG_PATH || 'https://image.tmdb.org/t/p/w500'

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmEwM2JhZjAwODc4YTBhNmE4MDYwN2U1ZGI5NzFmMCIsIm5iZiI6MTczMzc4Mzc4MC4yNTUsInN1YiI6IjY3NTc3MGU0MGFiN2U4MDc3Y2ZiZjFlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XXDs4eNLPoVC8cYP4I4R_ZT48CSvQPpCMqUGOWCPlVk'
  }
}

function buildSlidesFragment (
  results,
  {
    imgClass = 'movie-poster',
    slideClass = 'released-movies swiper-slide',
    titleKeys = ['title', 'name', 'original_name'],
    paragraphTemplate = (m) => `&#11088 ${m.vote_average} | Movies`,
    posterFallback = '/assets/img/placeholder-poster.jpg'
  } = {}
) {
  const frag = document.createDocumentFragment()
  if (!Array.isArray(results)) return frag

  results.forEach((movie) => {
    const posterPath = movie.poster_path
      ? `${IMG_PATH}${movie.poster_path}`
      : posterFallback

    const slide = document.createElement('a')
    slide.href = 'details.html?movie_id=' + (movie.id || '')
    slide.className = slideClass

    const img = document.createElement('img')
    img.src = posterPath
    img.alt = titleKeys.map((k) => movie[k]).find(Boolean) || ''
    img.className = imgClass
    slide.appendChild(img)

    const movieTitle = document.createElement('h4')
    movieTitle.className = 'movie-title'
    movieTitle.textContent = titleKeys.map((k) => movie[k]).find(Boolean) || ''
    slide.appendChild(movieTitle)

    const movieParagraph = document.createElement('p')
    movieParagraph.className = 'movie-paragraph'
    movieParagraph.innerHTML = paragraphTemplate(movie)
    slide.appendChild(movieParagraph)

    frag.appendChild(slide)
  })

  return frag
}

// Just release (discover/tv) fetch + init its swiper after DOM insert
fetch(
  `${BASE_URL}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
  options
)
  .then((res) => res.json())
  .then((data) => {
    const firstSection = document.getElementById('swiper-wrapper-1')
    if (!firstSection || !Array.isArray(data.results)) return

    const frag = buildSlidesFragment(data.results, {
      imgClass: 'movie-poster',
      slideClass: 'released-movies swiper-slide',
      titleKeys: ['name', 'original_name', 'title'],
      paragraphTemplate: (m) => `&#11088 ${m.vote_average} | Action - Movies `
    })

    firstSection.appendChild(frag)
  })
  .then(() => {
    // init swiper for just-release
    const justReleaseSwiper = new Swiper('#just-release', {
      navigation: {
        nextEl: '#just-release .swiper-button-next',
        prevEl: '#just-release .swiper-button-prev'
      },
      slidesPerView: 1,
      spaceBetween: 12,
      breakpoints: {
        640: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      }
    })
    void justReleaseSwiper
  })
  .catch((err) => {
    console.error(err)
  })

// top-rated -> likes section
fetch(`${BASE_URL}/movie/top_rated?language=en-US&page=1`, options)
  .then((res) => res.json())
  .then((data) => {
    const movieList = document.getElementById('swiper-wrapper-3')
    if (!movieList || !Array.isArray(data.results)) return

    const frag = buildSlidesFragment(data.results, {
      imgClass: 'movie-poster-one poster-size',
      slideClass: 'released-movies swiper-slide',
      titleKeys: ['title', 'name'],
      paragraphTemplate: (m) => `&#11088 ${m.vote_average} | Mystery - Movies `
    })

    movieList.appendChild(frag)
  })
  .then(() => {
    const likesSwiper = new Swiper('#likes', {
      navigation: {
        nextEl: '#likes .swiper-button-next',
        prevEl: '#likes .swiper-button-prev'
      },
      slidesPerView: 1,
      spaceBetween: 12,
      breakpoints: {
        640: { slidesPerView: 1.5 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 4 }
      }
    })
    void likesSwiper
  })
  .catch((err) => {
    console.error(err)
  })

// basic search bar open/close UX (keeps behavior consistent)
document.addEventListener('click', (e) => {
  const openButton = document.getElementById('open')
  const closeButton = document.getElementById('close')
  const searchBar = document.getElementById('search-bar')
  if (!openButton || !closeButton || !searchBar) return
  // local handlers: rely on search.js for full functionality
  openButton.addEventListener('click', () => {
    searchBar.style.display = 'block'
    openButton.style.display = 'none'
    closeButton.style.display = 'block'
    const si = document.getElementById('search-input')
    if (si) si.focus()
  })
  closeButton.addEventListener('click', () => {
    searchBar.style.display = 'none'
    closeButton.style.display = 'none'
    openButton.style.display = 'block'
  })
})
