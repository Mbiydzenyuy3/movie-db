// search

const SEARCH_URL =
  "https://api.themoviedb.org/3/search/movie?api_key=4ef363f9f9a3c5535149c90970fa2311&language=en-US&query=";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo",
  },
};

fetch(
  "https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1",
  options
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    function search(movie_id) {
      browser.search.query({
        query: "",
        tabId: movie_id,
      });
    }

    browser.browserAction.onClicked.addListener(search);
  })
  .catch((err) => console.error(err));
