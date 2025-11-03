import '../styles/style.css'

const API_KEY = import.meta.env.VITE_BASE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL
const IMG_PATH =
  import.meta.env.VITE_IMG_PATH || 'https://image.tmdb.org/t/p/w500'

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search)
  const movieId = urlParams.get('movie_id')

  const detailsRoot = document.getElementById('details-page')
  if (!detailsRoot) return

  if (!movieId) {
    detailsRoot.innerHTML = '<h2>Movie ID is missing in the URL!</h2>'
    return
  }

  // insert a container for details above the footer
  const container = document.createElement('div')
  container.className = 'movie-details-container'
  container.style.padding = '24px'
  container.style.maxWidth = '1100px'
  container.style.margin = '0 auto'

  const footerEl = detailsRoot.querySelector('footer')
  detailsRoot.insertBefore(container, footerEl)

  // show loading
  container.innerHTML = '<p>Loading movie details…</p>'

  async function fetchJson(url) {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    return res.json()
  }

  async function fetchMovieDetails(id) {
    return fetchJson(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
  }

  async function fetchMovieCredits(id) {
    return fetchJson(
      `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
    )
  }

  async function fetchMovieImages(id) {
    return fetchJson(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`)
  }

  function createPoster(src, alt = 'poster') {
    const img = document.createElement('img')
    img.src = src
    img.alt = alt
    img.style.width = '280px'
    img.style.borderRadius = '8px'
    img.style.objectFit = 'cover'
    return img
  }

  function formatRuntime(mins) {
    if (!mins && mins !== 0) return ''
    const h = Math.floor(mins / 60)
    const m = mins % 60
    return h ? `${h}h ${m}m` : `${m}m`
  }

  function render(movie, credits, images) {
    container.innerHTML = ''

    const posterSrc = movie.poster_path
      ? `${IMG_PATH}${movie.poster_path}`
      : '/assets/img/placeholder-poster.jpg'
    // left poster column
    const left = document.createElement('div')
    left.style.flex = '0 0 300px'
    left.style.marginRight = '24px'
    left.appendChild(createPoster(posterSrc, movie.title))

    // right info column
    const right = document.createElement('div')
    right.style.flex = '1 1 auto'
    right.style.minWidth = '0'

    const title = document.createElement('h1')
    title.textContent = movie.title || movie.name
    title.style.margin = '0 0 8px 0'

    const meta = document.createElement('div')
    meta.style.color = '#666'
    meta.style.marginBottom = '12px'
    meta.textContent = `${
      movie.release_date ? movie.release_date.slice(0, 4) : ''
    } • ${formatRuntime(movie.runtime)} • ⭐ ${movie.vote_average}`

    const genres = document.createElement('div')
    genres.style.marginBottom = '12px'
    genres.textContent = (movie.genres || []).map((g) => g.name).join(', ')

    const overview = document.createElement('p')
    overview.textContent = movie.overview || 'No overview available.'
    overview.style.lineHeight = '1.5'
    overview.style.marginBottom = '14px'

    right.appendChild(title)
    right.appendChild(meta)
    right.appendChild(genres)
    right.appendChild(overview)

    // top cast
    if (credits && credits.cast && credits.cast.length) {
      const castContainer = document.createElement('div')
      castContainer.style.marginTop = '12px'

      const castTitle = document.createElement('h3')
      castTitle.textContent = 'Top cast'
      castTitle.style.margin = '0 0 8px 0'
      castContainer.appendChild(castTitle)

      const castList = document.createElement('div')
      castList.style.display = 'flex'
      castList.style.gap = '12px'
      castList.style.flexWrap = 'wrap'

      credits.cast.slice(0, 6).forEach((member) => {
        const item = document.createElement('a')
        item.href = `https://www.themoviedb.org/person/${member.id}`
        item.target = '_blank'
        item.style.textDecoration = 'none'
        item.style.color = 'inherit'
        item.style.width = '110px'
        item.style.display = 'flex'
        item.style.flexDirection = 'column'
        item.style.alignItems = 'center'
        item.style.gap = '6px'

        const p = document.createElement('img')
        p.src = member.profile_path
          ? `${IMG_PATH}${member.profile_path}`
          : '/assets/img/placeholder-profile.jpg'
        p.alt = member.name
        p.style.width = '88px'
        p.style.height = '132px'
        p.style.objectFit = 'cover'
        p.style.borderRadius = '6px'

        const name = document.createElement('div')
        name.style.fontSize = '13px'
        name.style.textAlign = 'center'
        name.style.overflow = 'hidden'
        name.style.textOverflow = 'ellipsis'
        name.style.whiteSpace = 'nowrap'
        name.textContent = member.name

        const char = document.createElement('div')
        char.style.fontSize = '12px'
        char.style.color = '#666'
        char.style.textAlign = 'center'
        char.textContent = member.character ? `as ${member.character}` : ''

        item.appendChild(p)
        item.appendChild(name)
        item.appendChild(char)
        castList.appendChild(item)
      })

      castContainer.appendChild(castList)
      right.appendChild(castContainer)
    }

    // similar movies
    const similarTitle = document.createElement('h2')
    similarTitle.textContent = 'Similar movies'
    similarTitle.style.marginTop = '18px'

    const similarWrapper = document.createElement('div')
    similarWrapper.style.display = 'flex'
    similarWrapper.style.gap = '12px'
    similarWrapper.style.flexWrap = 'wrap'

    // layout
    const row = document.createElement('div')
    row.style.display = 'flex'
    row.style.alignItems = 'flex-start'
    row.appendChild(left)
    row.appendChild(right)

    container.appendChild(row)
    container.appendChild(similarTitle)
    container.appendChild(similarWrapper)

    // if images provided, replace hero/backdrop
    if (images && images.backdrops && images.backdrops.length) {
      const backdrop = images.backdrops[0].file_path
      const backdropImage = `https://image.tmdb.org/t/p/original${backdrop}`
      // insert hero/banner above content
      const hero = document.createElement('section')
      hero.className = 'hero-banner'
      hero.style.marginBottom = '18px'
      hero.innerHTML = `
        <div class="hero-poster" style="position:relative;border-radius:8px;overflow:hidden">
          <img src="${backdropImage}" alt="backdrop" style="width:100%;height:320px;object-fit:cover;display:block" />
          <div style="position:absolute;left:16px;bottom:16px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,0.6);">
            <h1 style="margin:0">${movie.title}</h1>
            <p style="max-width:60ch">${movie.tagline || movie.overview}</p>
          </div>
        </div>
      `
      container.insertBefore(hero, container.firstChild)
    }

    // similar movies fetch
    container.similarWrapper = similarWrapper
  }

  async function loadSimilarMovies(id) {
    try {
      const data = await fetchJson(
        `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
      )
      const wrapper = container.similarWrapper
      if (!wrapper) return
      wrapper.innerHTML = ''
      if (data.results && data.results.length) {
        data.results.slice(0, 8).forEach((m) => {
          const poster = m.poster_path
            ? `${IMG_PATH}${m.poster_path}`
            : '/assets/img/placeholder-poster.jpg'
          const a = document.createElement('a')
          a.href = `details.html?movie_id=${m.id}`
          a.style.display = 'block'
          a.style.width = '140px'
          a.style.textDecoration = 'none'
          a.style.color = 'inherit'
          a.innerHTML = `
            <img src="${poster}" alt="${m.title}" style="width:140px;height:210px;object-fit:cover;border-radius:6px;display:block" />
            <div style="font-size:13px;margin-top:6px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${m.title}</div>
          `
          wrapper.appendChild(a)
        })
      } else {
        wrapper.innerHTML = '<p>No similar movies found.</p>'
      }
    } catch (err) {
      console.error('Error loading similar movies', err)
    }
  }

  // orchestrate fetches and render
  Promise.all([
    fetchMovieDetails(movieId),
    fetchMovieCredits(movieId),
    fetchMovieImages(movieId),
  ])
    .then(([movie, credits, images]) => {
      if (!movie || movie.status_code === 34) {
        container.innerHTML = '<h2>Movie not found.</h2>'
        return
      }
      render(movie, credits, images)
      loadSimilarMovies(movieId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
    .catch((err) => {
      console.error(err)
      container.innerHTML = '<h2>Error loading movie details.</h2>'
    })
})
