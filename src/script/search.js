// // Search functionality
// const searchInput = document.getElementById('search-input');
// const suggestionsContainer = document.createElement('div');
// suggestionsContainer.className = 'suggestions-container';
// document.querySelector('.search-bar').appendChild(suggestionsContainer);

// function debounce(func, delay) {
//   let timeoutId;
//   return function(...args) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(this, args), delay);
//   };
// }

// async function searchMovies(query) {
//   try {
//     const response = await fetch(
//       `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
//       options
//     );
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error('Search error:', error);
//     return [];
//   }
// }

// function displaySuggestions(movies) {
//   suggestionsContainer.innerHTML = '';
//   if (movies.length === 0) {
//     suggestionsContainer.style.display = 'none';
//     return;
//   }

//   movies.slice(0, 5).forEach(movie => {
//     const suggestionItem = document.createElement('div');
//     suggestionItem.className = 'suggestion-item';
//     suggestionItem.textContent = movie.title;
//     suggestionItem.addEventListener('click', () => {
//       window.location.href = `details.html?movie_id=${movie.id}`;
//     });
//     suggestionsContainer.appendChild(suggestionItem);
//   });

//   suggestionsContainer.style.display = 'block';
// }

// const handleSearch = debounce(async (event) => {
//   const query = event.target.value.trim();
//   if (query.length >= 2) {
//     const results = await searchMovies(query);
//     displaySuggestions(results);
//   } else {
//     suggestionsContainer.style.display = 'none';
//   }
// }, 300);

// searchInput.addEventListener('input', handleSearch);

// // Close suggestions when clicking outside
// document.addEventListener('click', (event) => {
//   if (!event.target.closest('.search-bar')) {
//     suggestionsContainer.style.display = 'none';
//   }
// });