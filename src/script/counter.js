const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo',
  },
};

const HERO_IMG_BASE = 'https://image.tmdb.org/t/p/original';
const TRENDING_URL =
  'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
const MAX_HERO_SLIDES = 6;

// Helper to preload an image and resolve when loaded (or reject)
function preloadImage(url) {
  return new Promise((resolve, reject) => {
    if (!url) return reject(new Error('No url'));
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(url);
    img.onerror = reject;
  });
}

async function buildHeroSlides() {
  try {
    const res = await fetch(TRENDING_URL, options);
    if (!res.ok) throw new Error(`Trending fetch failed (${res.status})`);
    const data = await res.json();
    const results = Array.isArray(data.results) ? data.results : [];
    if (results.length === 0) return;

    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    // Use fragment for better performance
    const frag = document.createDocumentFragment();
    const slidesToCreate = Math.min(MAX_HERO_SLIDES, results.length);

    // Preload images in series (or you can do Promise.all for parallel)
    for (let i = 0; i < slidesToCreate; i++) {
      const movie = results[i] || {};
      const imagePath = movie.backdrop_path || movie.poster_path || null;
      const bgUrl = imagePath
        ? `${HERO_IMG_BASE}${imagePath}`
        : '/assets/img/placeholder-hero.jpg';

      // create slide element with classes only (styling in CSS)
      const slide = document.createElement('div');
      slide.classList.add('hero-movies-bg', 'swiper-slide');

      // keep slide content concealed until image loads
      slide.setAttribute('aria-hidden', 'true');
      slide.dataset.movieId = movie.id ?? '';

      // content container (text/buttons)
      const content = document.createElement('div');
      content.classList.add('hero-content');
      content.innerHTML = `
        <h2 class="hero-movie-title">${escapeHtml(
          movie.title || movie.name || ''
        )}</h2>
        <p class="hero-movie-paragraph">${escapeHtml(
          (movie.overview || '').slice(0, 160).trim() || ''
        )}${movie.overview ? '...' : ''}</p>
        
         <div class='buttons'>
           <a href="details.html?movie_id=${movie.id || ''}">
              <button class='primary-cta'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'
                fill='rgba(255,255,255,1)'>
                <path
                d='M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z'>
                </path>
                </svg>
                <span>Watch trailer</span>
              </button>
            </a>
            <a href="details.html?movie_id=${movie.id || ''}">
              <button class='outline-cta' type='button' data-watchlist='${
                movie.id || ''
              }'>
                <i class='ri-bookmark-line'></i>
                <span>Add watchlist</span>
              </button>
            </a>
        </div>
      `;

      // append content now, background will be applied after preload
      slide.appendChild(content);
      frag.appendChild(slide);

      // preload then apply background (do not block building all slides)
      // handle each slide individually so successful slides appear even if one fails
      preloadImage(bgUrl)
        .then(() => {
          slide.style.backgroundImage = `url("${bgUrl}")`;
          slide.classList.add('hero-bg-loaded');
          slide.removeAttribute('aria-hidden');
        })
        .catch(() => {
          // fallback: add a class so CSS can display placeholder
          slide.classList.add('hero-bg-failed');
          slide.removeAttribute('aria-hidden');
        });
    }

    // append slides to DOM
    heroSection.appendChild(frag);

    // initialize Swiper AFTER slides are in DOM
    initHeroSwiper();
  } catch (err) {
    // graceful error handling
    // eslint-disable-next-line no-console
    console.error('Error building hero slides:', err);
  }
}

// Initialize Swiper with autoplay 6000ms
function initHeroSwiper() {
  if (typeof Swiper === 'undefined') {
    // Swiper not available globally — log and exit
    // eslint-disable-next-line no-console
    console.warn('Swiper is not available. Make sure swiper JS is loaded.');
    return;
  }

  // destroy existing instance on this selector to avoid duplicate in dev HMR
  // (assumes previous instance stored on element)
  const containerEl = document.querySelector('#swiper-item');
  if (!containerEl) return;
  if (containerEl.swiper) {
    try {
      containerEl.swiper.destroy(true, true);
    } catch (e) {
      // ignore
    }
  }

  new Swiper('#swiper-item', {
    loop: true,
    slidesPerView: 1,
    effect: 'fade',
    speed: 800,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    a11y: {
      enabled: true,
    },
  });
}

// tiny utility to escape text inserted into innerHTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

buildHeroSlides();
