const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '4b17c8220205f4ea5b673c20a3e1f458';

const modalModule = (function () {
  const movieModal = document.getElementById('movieModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalContent = document.getElementById('modalContent');
  const loaderContainer = document.getElementById('loaderContainer');
  const contentEl = document.getElementById('content');

  contentEl.addEventListener('click', openModal);
  function openModal(event) {
    event.preventDefault();

    if (event.target.nodeName === 'IMG') {
      contentEl.innerHTML = 'Rendering';
    }
  }

  async function fetchMovieDataFromAPI(movieId) {
    const apiEndpoint = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;

    try {
      const response = await fetch(apiEndpoint);

      if (!response.ok) {
        throw new Error(`Failed to fetch movie data for ID ${movieId}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Error fetching movie data: ${error.message}`);
    }
  }

  function showLoader() {
    loaderContainer.style.display = 'flex';
  }

  function hideLoader() {
    loaderContainer.style.display = 'none';
  }

  

document.addEventListener('DOMContentLoaded', function () {
  contentEl.addEventListener('click', async function (event) {
    const targetMovieLink = event.target.closest('.link');
    console.log(targetMovieLink);
    if (targetMovieLink) {
      const movieId = targetMovieLink.dataset.movieId;

      modalModule.showLoader();

      try {
        const movieData = await fetchMovieDataFromAPI(movieId);
        const content = document.createElement('div');
        content.innerHTML = `
          <h2>${movieData.title}</h2>
          <p>${movieData.overview}</p>
          <p>Release Year: ${movieData.release_date}</p>
        `;
        modalModule.showModal(content);
      } catch (error) {
        console.error('Error fetching movie information:', error);
      } finally {
        modalModule.hideLoader();
      }
    }
  });
});
