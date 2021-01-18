const API_KEY = process.env.REACT_APP_OMDB_SECRET;
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&s=`;

export function fetchMovieList(movieTitle) {
  return fetch(API_URL + encodeURI(movieTitle)).then(res => res.json());
}
