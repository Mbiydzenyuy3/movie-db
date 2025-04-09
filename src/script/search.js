const API_KEY = import.meta.env.VITE_BASE_API_KEY
const BASE_URL = import.meta.env.VITE_BASE_URL
// const IMG_PATH = import.meta.env.VITE_IMG_PATH

// Function to setup search bar functionality
function SearchBar () {
  const openButton = document.getElementById('open')
  const closeButton = document.getElementById('close')
  const searchBar = document.querySelector('#search-bar')
  const searchInput = document.getElementById('search-input')
  const suggestionsDiv = document.createElement('div')
  suggestionsDiv.id = 'suggestions'
  document.querySelector('.search-bar').appendChild(suggestionsDiv)

  openButton.addEventListener('click', () => {
    searchBar.style.display = 'block'
    openButton.style.display = 'none'
    closeButton.style.display = 'block'
    searchInput.focus()
  })

  closeButton.addEventListener('click', () => {
    searchBar.style.display = 'none'
    closeButton.style.display = 'none'
    openButton.style.display = 'block'
  })

  searchInput.addEventListener('Enter', async () => {
    const query = searchInput.value.trim().toLowerCase()
    if (query.length > 0) {
      const searchResults = await fetchSuggestionDiv(query)
      displaySearchInput(searchResults)
    } else {
      suggestionsDiv.style.display = 'none'
    }
  })

  async function fetchSuggestionDiv (query) {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
      )
      const data = await response.json()
      console.log(data)
      return data.results
    } catch (error) {
      console.error('Error fetching search results:', error)
      return []
    }
  }

  function displaySearchInput (results) {
    suggestionsDiv.innerHTML = ''
    suggestionsDiv.style.display = 'block'
    results.forEach((movie) => {
      const movieElement = document.createElement('a')
      movieElement.href = `details.html?movie_id=${movie.id}`
      movieElement.textContent = movie.title
      suggestionsDiv.appendChild(movieElement)
    })
  }
}
