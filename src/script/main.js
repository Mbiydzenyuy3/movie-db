import "../styles/main.css";
import "../styles/style.css";
import "../script/carousel.js";
import "../script/api.js";
import "../script/counter.js";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("app").innerHTML = `
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
	  <div id='slider' class='swiper-wrapper hero container'>			
		</div>
	</section>
  <section id='brand-logos' class='mySwiper swiper'>
        <div class='container swiper-wrapper carousel-slide'>
          <div class='swiper-slide' id='slide-img-wrap'>
            <img src='/assets/img/disney.png' alt='' class='logos' />
          </div>
          <div class='swiper-slide' id='slide-img-wrap-1'><img src='/assets/img/netflix.png' alt='' class='logos' />
          </div>
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
  <section class='popular-release mySwiper' id='popular-release'>
      <div class='container swiper-wrapper' id='popular-swiper'>   
          <div class='new-popular-item'>
              <div class='number'>1</div>
              <div class='image-popular-release'>
                <img class='poster-img' src='/assets/img/badboys.jpg' alt='img'>
              </div>
              <div class='release-overwiew'>
                <div class='pg-age'>PG-13</div>
                <h4 class='new-release-title'>Bad Boys</h4>
                <span class='movie-genre'>
                  <p>SuperHero - Action</p>
                </span>
                <p class='movie-star'>⭐ 4.3 | <span>Movies</span></p>
              </div>
          </div>
          <div class='swiper-button-next'></div>
          <div class='swiper-button-prev'></div>
      </div>
  </section>
  <div class='new-movie-section'>
    <h3 class='heading'>Latest releases</h3>
    <section id='just-release' class='mySwiper swiper'>
      <div id='swiper-wrapper-1' class = 'container swiper-wrapper'>  
      </div>
      <div class='swiper-button-next'></div>
      <div class='swiper-button-prev'></div>
    </section>
  </div>
  <div class='watch-movie-section'>
    <h3 class='heading'> Watchlist </h3>
    <section id='watchlist' class='mySwiper swiper'>
      <div id= 'swiper-wrapper-2' class = 'container swiper-wrapper'> 
      </div>
      <div class='swiper-button-next'></div>
      <div class='swiper-button-prev'></div>
    </section>
  </div>
  <div class='likes-section'>
    <h3 class='heading'>Likes</h3>
    <section id='likes' class='mySwiper swiper'>
    <div id='swiper-wrapper-3' class ='container swiper-wrapper'> 
    </div>
    <div class='swiper-button-next'></div>
    <div class='swiper-button-prev'></div>
    </section>
  </div>
  <footer>
    <div class ='container'>
      <div class='footer'>
      <div class='footer-item-one'>
        <div class='footer-heading'>
          <h3 class='heading-three-footer'>Our platform is trusted by millions and features best updated movies all around the world.
          </h3>
        </div>
      </div>
      <div class='footer-item-two'>
        <ul class='unordered-list'>
          <div class='links'><a href=''>Home</a>/</div>
          <div class='links'><a href=''>Release</a>/</div>
          <div class='links'><a href=''>Discover</a>/</div>
        </ul>
        <div class='social-media'>
          <img class='social-media-icon' src='/assets/img/Facebook.png' alt='facebook-icon' />
          <img class='social-media-icon' src='/assets/img/Instagram.png' alt='instagram-icon' />
          <img class='social-media-icon' src='/assets/img/Twitter.png' alt='twitter-icon' />
          <img class='social-media-icon' src='/assets/img/Google.png' alt='google-icon' />
        </div>
      </div>
    </div>
    <div class='contact-footer'>
      <div class='contact-policy'>
        <span>Privacy Policy</span>
        <span>Terms of service</span>
        <span>Language</span>
      </div>
      <div class='copyright'>
        &copy 2024
      </div>
    </div>
    </div>
  </footer>
`;
});

const Api_Key = import.meta.env.VITE_BASE_API_KEY;
const Base_url = import.meta.env.VITE_BASE_URL;
const IMG_PATH = import.meta.env.VITE_IMG_PATH;

// setupCounter(document.querySelector('#counter'))

// API for just release movie section
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYmEwM2JhZjAwODc4YTBhNmE4MDYwN2U1ZGI5NzFmMCIsIm5iZiI6MTczMzc4Mzc4MC4yNTUsInN1YiI6IjY3NTc3MGU0MGFiN2U4MDc3Y2ZiZjFlYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XXDs4eNLPoVC8cYP4I4R_ZT48CSvQPpCMqUGOWCPlVk",
  },
};

fetch(
  `${Base_url}/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc`,
  options
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const firstSection = document.getElementById("swiper-wrapper-1");
    for (let index = 0; index < data.results.length; index++) {
      const movie = data.results[index];
      const posterPath = movie.poster_path
        ? `${IMG_PATH}${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image+Available";

      const slide = document.createElement("a");
      slide.href = "details.html?movie_id=" + movie.id;
      slide.className = "released-movies swiper-slide";
      firstSection.appendChild(slide);

      const img = document.createElement("img");
      img.src = posterPath;
      img.alt = movie.title;
      img.className = "movie-poster";
      slide.appendChild(img);

      const movieTitle = document.createElement("h4");
      movieTitle.className = "movie-title";
      movieTitle.textContent = movie.title;
      movieTitle.innerHTML = `${movie.original_name}`;
      slide.appendChild(movieTitle);

      const movieParagraph = document.createElement("p");
      movieParagraph.className = "movie-paragraph";
      movieParagraph.textContent = movie.paragraph;
      movieParagraph.innerHTML = `&#11088 ${movie.vote_average} | Action - Movies `;
      slide.appendChild(movieParagraph);
    }
  })
  .then(() => {
    const swiper = new Swiper("#just-release", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  })
  .catch((err) => console.error(err));

document.addEventListener("DOMContentLoaded", function () {
  const openButton = document.getElementById("open");
  const closeButton = document.getElementById("close");
  const searchBar = document.querySelector(".search-bar");

  // Show the search bar
  openButton.addEventListener("click", function () {
    searchBar.style.display = "block"; // Show the search bar
    openButton.style.display = "none"; // Hide the open button
    closeButton.style.display = "block"; // Show the close button
    document.getElementById("search-input").focus().value = ""; // Focus on input field
  });

  // Hide the search bar
  closeButton.addEventListener("click", function () {
    searchBar.style.display = "none"; // Hide the search bar
    closeButton.style.display = "none"; // Hide the close button
    openButton.style.display = "block"; // Show the open button again
  });
});

const searchInput = document.getElementById("search-input");
// const searchBtn = document.getElementById("search-btn");

// searchBtn.addEventListener("click", () => {
//   searchInput.classList.toggle("active");
// });

const suggestionsDiv = document.getElementById("suggestion");

searchInput.addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = searchInput.value.trim().toLowercase();

    if (query) {
      await fetchSuggestionDiv(query);
      suggestionsDiv.style.display = "block";
      suggestionsDiv.style.overflowY = "scroll";
    } else {
      searchResults.style.display = "none";
    }
  }
});

// fetch movie data from TMDB
async function fetchSuggestionDiv(query) {
  try {
    const response = await fetch(
      `${Base_url}/search/movie?ap_key=${Api_Key}&query=${query}`
    );
    console.log(response);
    const data = await response.json();
    displaySearchInput(data.result);
  } catch (error) {
    throw new error("Error fetching search results");
  }
}
