// similar movies
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo'
  }
}

fetch('https://api.themoviedb.org/3/trending/all/day?language=en-US', options)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)

    const similarMovies = document.getElementById('similar')

    for (let index = 0; index < data.results.length; index++) {
      const movie = data.results[index]
      const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Image+Available'
      const slide = document.createElement('div')
      slide.className = 'similar-movies slide'
      similarMovies.appendChild(slide)

      const img = document.createElement('img')
      img.src = posterPath
      img.alt = movie.title
      img.className = 'movie-poster-similar'
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
  .catch((err) => console.error(err))
