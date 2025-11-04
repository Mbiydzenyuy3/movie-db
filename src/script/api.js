const API_KEY = import.meta.env.VITE_BASE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL
const IMG_PATH = import.meta.env.VITE_IMG_PATH
const SEARCH_API = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=`

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo'
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
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
        ? `${IMG_PATH}${movie.poster_path}`
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
      movieParagraph.innerHTML = `&#11088 ${movie.vote_average} | Mystery - Movies `
      slide.appendChild(movieParagraph)
    }
  })
  .then(() => {})
  .catch((err) => {
    throw new Error(err)
  })

const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`

async function fetchPopularMovies() {
  try {
    const response = await fetch(POPULAR_MOVIES_URL, options)
    if (!response.ok) {
      throw new Error(`Failed to fetch popular movies: ${response.status}`)
    }

    const data = await response.json()
    const movies = data.results || []
    populatePopularMovies(movies)
    // return movies so caller can await if needed
    return movies
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    throw error
  }
}

function populatePopularMovies(movies) {
  const popularWrapper = document.getElementById('popular-swiper')
  if (!popularWrapper) return
  popularWrapper.innerHTML = '' // Clear placeholder content

  // Use fragment to minimize reflows
  const frag = document.createDocumentFragment()

  movies.forEach((movie, index) => {
    const posterUrl = movie.poster_path
      ? `${IMG_PATH}${movie.poster_path}`
      : '/assets/img/placeholder-poster.jpg'

    // Slide anchor (Swiper slide)
    const slide = document.createElement('a')
    slide.href = 'details.html?movie_id=' + (movie.id || '')
    slide.className = 'released-movies swiper-slide new-popular-item'

    // build safe DOM nodes (avoid innerHTML with unescaped content)
    const inner = document.createElement('div')
    inner.className = 'popular-slide-inner'

    const thumb = document.createElement('div')
    thumb.className = 'popular-thumb'
    const img = document.createElement('img')
    img.src = posterUrl
    img.alt = escapeHtml(movie.title || movie.name || 'Poster')
    thumb.appendChild(img)

    const info = document.createElement('div')
    info.className = 'popular-info'

    const rank = document.createElement('div')
    rank.className = 'popular-rank'
    rank.textContent = String(index + 1)

    const title = document.createElement('h4')
    title.className = 'popular-title'
    title.textContent = movie.title || movie.name || 'Untitled'

    const meta = document.createElement('div')
    meta.className = 'popular-meta'
    meta.textContent = `⭐ ${Number(movie.vote_average || 0).toFixed(1)}`

    const genres = document.createElement('p')
    genres.className = 'popular-genres'
    genres.textContent = (movie.genre_ids || []).slice(0, 2).join(', ')

    info.appendChild(rank)
    info.appendChild(title)
    info.appendChild(meta)
    info.appendChild(genres)

    inner.appendChild(thumb)
    inner.appendChild(info)
    slide.appendChild(inner)
    frag.appendChild(slide)
  })

  popularWrapper.appendChild(frag)
}

export { fetchPopularMovies }

function debounce(fn, delay = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), delay)
  }
}

function initSearch() {
  // use the ID from main.js: '#search-bar' and '#search-input'
  const searchBarWrapper = document.getElementById('search-bar')
  const searchInput = document.getElementById('search-input')
  const openButton = document.getElementById('open')
  const closeButton = document.getElementById('close')

  if (!searchInput || !searchBarWrapper) return

  // create suggestions container once
  let suggestionsDiv = document.getElementById('suggestions')
  if (!suggestionsDiv) {
    suggestionsDiv = document.createElement('div')
    suggestionsDiv.id = 'suggestions'
    suggestionsDiv.style.position = 'absolute'
    suggestionsDiv.style.zIndex = '999'
    suggestionsDiv.style.display = 'none'
    suggestionsDiv.className = 'search-suggestions'
    searchBarWrapper.appendChild(suggestionsDiv)
  }

  // open/close handlers (optional UX)
  if (openButton && closeButton) {
    openButton.addEventListener('click', () => {
      searchBarWrapper.style.display = 'block'
      openButton.style.display = 'none'
      closeButton.style.display = 'block'
      searchInput.focus()
    })

    closeButton.addEventListener('click', () => {
      searchBarWrapper.style.display = 'none'
      closeButton.style.display = 'none'
      openButton.style.display = 'block'
      suggestionsDiv.style.display = 'none'
    })
  }
  // fetch suggestions
  async function fetchSuggestions(query) {
    if (!query) return []
    try {
      const resp = await fetch(`${SEARCH_API}${encodeURIComponent(query)}`)
      const json = await resp.json()
      return json.results || []
    } catch (err) {
      console.error('Search error', err)
      return []
    }
  }

  function renderSuggestions(results) {
    suggestionsDiv.innerHTML = ''
    if (!results || results.length === 0) {
      suggestionsDiv.style.display = 'none'
      return
    }
    suggestionsDiv.style.display = 'block'

    results.slice(0, 8).forEach((movie) => {
      const a = document.createElement('a')
      a.href = `details.html?movie_id=${movie.id}`
      a.className = 'suggestion-item'
      // inline minimal layout for immediate effect
      a.style.display = 'flex'
      a.style.alignItems = 'center'
      a.style.gap = '10px'
      a.style.padding = '6px 8px'
      a.style.textDecoration = 'none'
      a.style.color = 'inherit'

      const thumb = document.createElement('img')
      thumb.src = movie.poster_path
        ? `${IMG_PATH}${movie.poster_path}`
        : '/assets/img/placeholder-poster.jpg'
      thumb.alt = movie.title || 'Poster'
      thumb.style.width = '48px'
      thumb.style.height = '72px'
      thumb.style.objectFit = 'cover'
      thumb.style.borderRadius = '4px'
      thumb.style.flex = '0 0 auto'

      const meta = document.createElement('div')
      meta.style.display = 'flex'
      meta.style.flexDirection = 'column'
      meta.style.justifyContent = 'center'
      meta.style.minWidth = '0' // allow ellipsis if added later

      const title = document.createElement('div')
      title.textContent = movie.title || movie.name || 'Untitled'
      title.style.fontSize = '14px'
      title.style.fontWeight = '600'
      title.style.whiteSpace = 'nowrap'
      title.style.overflow = 'hidden'
      title.style.textOverflow = 'ellipsis'
      title.style.maxWidth = '220px'

      const sub = document.createElement('div')
      sub.style.fontSize = '12px'
      sub.style.color = '#666'
      sub.textContent = movie.release_date ? movie.release_date.slice(0, 4) : ''

      meta.appendChild(title)
      meta.appendChild(sub)

      a.appendChild(thumb)
      a.appendChild(meta)
      suggestionsDiv.appendChild(a)
    })
  }

  const debouncedFetch = debounce(async (value) => {
    const q = value.trim()
    if (q.length === 0) {
      suggestionsDiv.style.display = 'none'
      return
    }
    const results = await fetchSuggestions(q)
    renderSuggestions(results)
  }, 300)

  // update on typing
  searchInput.addEventListener('input', (e) => {
    debouncedFetch(e.target.value.toLowerCase())
  })

  // submit on Enter (if search form exists)
  const searchForm = document.getElementById('search-form')
  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const q = searchInput.value.trim()
      if (q) {
        // navigate to details or show full search results page
        window.location.href = `details.html?search=${encodeURIComponent(q)}`
      }
    })
  }

  // hide suggestions on outside click
  document.addEventListener('click', (ev) => {
    if (!searchBarWrapper.contains(ev.target)) {
      suggestionsDiv.style.display = 'none'
    }
  })
}

// initialize after DOM ready
document.addEventListener('DOMContentLoaded', initSearch)

// ...existing code...
function waitForElement(selector, timeout = 7000) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector)
    if (el) return resolve(el)

    const observer = new MutationObserver(() => {
      const found = document.querySelector(selector)
      if (found) {
        observer.disconnect()
        resolve(found)
      }
    })

    observer.observe(document.documentElement || document.body, {
      childList: true,
      subtree: true
    })

    if (timeout) {
      setTimeout(() => {
        observer.disconnect()
        reject(new Error('Timeout waiting for element: ' + selector))
      }, timeout)
    }
  })
}

// If search elements already exist, init immediately; otherwise wait for them.
if (
  document.getElementById('search-bar') &&
  document.getElementById('search-input')
) {
  initSearch()
} else {
  waitForElement('#search-bar')
    .then(() => {
      // small next-tick delay to let main.js finish rendering children
      setTimeout(initSearch, 0)
    })
    .catch((err) => {
      // fail silently in dev; log for debugging
      console.warn('Search init skipped:', err.message)
    })
}
