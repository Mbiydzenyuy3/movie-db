const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo",
  },
};

fetch("https://api.themoviedb.org/3/trending/movie/day?language=en-US", options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const heroSection = document.getElementById("slider");
    for (let index = 0; index < 4; index++) {
      const movie = data.results[index];
      const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Image+Available";
      const slide = document.createElement("div");
      slide.className = "hero-movies-bg swiper-slide";
      slide.id = "hero-container";
      heroSection.appendChild(slide);

      const Image = document.createElement("img");
      Image.src = posterPath;
      Image.alt = movie.title;
      Image.className = "hero-movie-poster swiper-slide";
      slide.appendChild(Image);

      const slideItem = document.createElement("div");
      slideItem.id = "hero-container-item";
      slide.appendChild(slideItem);

      const movieTitle = document.createElement("h2");
      movieTitle.className = "hero-movie-title swiper-slide";
      movieTitle.id = "hero-title-id";
      movieTitle.textContent = movie.title;
      slideItem.appendChild(movieTitle);

      const movieParagraph = document.createElement("p");
      movieParagraph.className = "hero-movie-paragraph swiper-slide";
      movieParagraph.id = "hero-paragraph-id";
      movieParagraph.textContent = movie.overview;
      slideItem.appendChild(movieParagraph);
      const ButtonDiv = document.createElement("div");
      ButtonDiv.id = "button-items";
      slideItem.appendChild(ButtonDiv);
      ButtonDiv.innerHTML = `

        <div class="buttons">
                    <button class="primary-cta">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"
                      fill="rgba(255,255,255,1)">
                      <path
                        d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM10.6219 8.41459C10.5562 8.37078 10.479 8.34741 10.4 8.34741C10.1791 8.34741 10 8.52649 10 8.74741V15.2526C10 15.3316 10.0234 15.4088 10.0672 15.4745C10.1897 15.6583 10.4381 15.708 10.6219 15.5854L15.5008 12.3328C15.5447 12.3035 15.5824 12.2658 15.6117 12.2219C15.7343 12.0381 15.6846 11.7897 15.5008 11.6672L10.6219 8.41459Z">
                      </path>
                    </svg>
                    <span>Watch trailer</span>
                    </button>
                    <button class="outline-cta">
                       <i class="ri-bookmark-line"></i>
                     <span>Add watchlist</span>
                     </button>
                </div>

        `;
    }
  })
  .then(() => {
    const swiper = new Swiper("#swiper-item", {
      slidesPerView: 1, // Number of logos visible at a time
      spaceBetween: 5,
      autoplay: {
        delay: 6000, // 3 seconds delay
        disableOnInteraction: false,
      },
      // navigation: {
      //   nextEl: ".swiper-button-next",
      //   prevEl: ".swiper-button-prev",
      // },
    });
  })
  .catch((err) => console.error(err));
